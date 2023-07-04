import { env } from "$env/dynamic/private"
import { Client } from "@notionhq/client"
import type { PageProperties } from "../models/notion"

// Initializing a client
const notion = new Client({
  auth: env.PRIVATE_NOTION_TOKEN,
})

const databaseId = env.PRIVATE_NOTION_DB_ID


// get the database with the given id 4eb609cebbd0405e893a90d4f72333b4
export async function getDatabaseItems() {
    // get every page in the database using the start_cursor until there are no more pages
    // filter to only get descriptif I_projet
    
    let pages = []
    let start_cursor = undefined
    while (true) {
        const response = await notion.databases.query({
          database_id: databaseId,
          start_cursor,
        })
        pages = pages.concat(response.results)
        if (!response.has_more) {
          break
        }
        start_cursor = response.next_cursor
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