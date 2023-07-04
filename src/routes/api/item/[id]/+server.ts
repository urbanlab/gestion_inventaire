import { json } from '@sveltejs/kit';
import {getPage, updatePage} from '$lib/notion';
import type { PageProperties } from '../../../../models/notion';

export const GET = (async ({ url }) => {
    // from path name, get the id of the page
    const pageId = url.pathname.split("/")[3]
    console.log(pageId)

    // get the page with the given id
    const page = await getPage(pageId)
    
    return json(page);
});
export const PUT = async ({ request }) => {
    try {
      const data = await request.json();
      console.log(data);
  
      const pageId = data.id;
      const utilisation = data.utilisation;
      const projet = data.projet;
  
      const properties = {
        "H_utilisation": {
          "select": {
            "name": utilisation,
          },
        },
        "I_projet": {
          "rich_text": [
            {
              "text": {
                "content": projet,
              },
            },
          ],
        },
      };
      
      const result = await updatePage(pageId, properties);
      console.log(result);
      
      return json(result);
      
    } catch (error) {
      console.error(error);
      return json(error);
    }
  };
  