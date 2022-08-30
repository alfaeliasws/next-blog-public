const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_TOKEN });

import { getNotionData } from "./GetFromNotion";

export async function getPages() {
    const pages = await getNotionData()
    const pageObject = pages.map((page)=>{
        return { properties: {
            pageId: page.id,
            pageCoverId: page.properties.Cover.id,
            slugId: page.properties.Slug.id,
            descId: page.properties.Description.id,
            dateId: page.properties.Date.id,
            titleId: page.properties.Post.id,
            slugzId: process.env.NEXT_PUBLIC_NOTION_SLUGZ}}
    })
    return pageObject
}