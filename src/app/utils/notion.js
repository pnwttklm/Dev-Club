// utils/notion.js
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function fetchNotionData() {
  try {
    const { results } = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    return results;
  } catch (error) {
    console.error("Error fetching data from Notion:", error);
    throw error;
  }
}
