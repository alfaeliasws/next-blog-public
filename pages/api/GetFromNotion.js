const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_TOKEN });

export async function getNotionData () {
  const response = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
    // Filter out posts not checked to publish.
    filter: {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    // Sort posts in descending order based on the Date column.
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })
  return response.results
}
