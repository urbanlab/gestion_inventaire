import { env } from "$env/dynamic/private"
import { Client } from "@notionhq/client"
import type { PageProperties, Page, Feedback } from "../models/index"

// Initializing a client
const notion = new Client({
  auth: env.PRIVATE_NOTION_TOKEN,
})



// get the database with the given id 4eb609cebbd0405e893a90d4f72333b4
export async function getDatabaseItems() {
    // get every page in the database using the start_cursor until there are no more pages
    // filter to only get descriptif I_projet
    const databaseId = env.PRIVATE_NOTION_DB_ID
    let pages: any[] = []
    let start_cursor: string | undefined = undefined
    while (true) {
        const response = await notion.databases.query({
          database_id: databaseId,
          start_cursor,
        })
        pages = pages.concat(response.results)
        if (!response.has_more) {
          break
        }
        start_cursor = response.next_cursor || undefined
    }
    // count the number of pages in the database
    const count = pages.length
    console.log(count)
    return pages
}

// get the page with the given id
export async function getPage(pageId: string) {
  const response = await notion.pages.retrieve({
    page_id: pageId,
  })
  return response
}

// update the page with the given id
export async function updatePage(pageId :string, properties : PageProperties) {
  const response = await notion.pages.update({
    page_id: pageId,
    properties,
  })
  return response
}

export async function addFeedback(feedback : Feedback) {
  let feedbackDatabaseId = env.PRIVATE_NOTION_FEEDBACK_DB_ID
  // add a new page to the database
  const response = await notion.pages.create({
    parent: { database_id: feedbackDatabaseId },
    properties: {
      title: {
        title: [
          {
            text: {
              content: feedback.title,
            },
          },
        ],
      },
      url: {
        url: feedback.url,
      },
      message: {
        rich_text: [
          {
            text: {
              content: feedback.message,
            },
          },
        ],
      },
    },
  })

  return response
}
