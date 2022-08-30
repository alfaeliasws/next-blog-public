export async function getProperties(pageId, propsId) {
    const { Client } = require('@notionhq/client');
    const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_TOKEN });

    const result = await notion.pages.properties.retrieve({page_id: pageId, property_id: propsId})
    return result
}
