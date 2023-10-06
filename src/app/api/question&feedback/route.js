import { NextResponse, NextRequest } from "next/server";
import { Client } from "@notionhq/client"


const notion = new Client({ auth: process.env.NOTION_API_KEY })
const databaseId = process.env.NOTION_DB_ID

async function addQuestionToNotion(mail,comm) {
    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
            Email: {
                type: 'title',
                title:[
                    {
                        type: 'text',
                        'text': {
                            "content": mail
                        }
                    }
                ]
            },
            comment: {
                type: 'rich_text',
                rich_text: [
                    {
                        type: 'text',
                        'text': {
                            "content": comm
                        }
                    }
                ]
            },
            question_or_feedback: {
                type: 'multi_select',
                multi_select: [
                    {
                        "name": "Question"
                      },
                ]
            }
        },
      })
      console.log(response)
      console.log("Success! Entry added.")
    } catch (error) {
      console.error(error.body)
    }
}

async function addFeedbackToNotion(comm) {
    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
            comment: {
                type: 'rich_text',
                rich_text: [
                    {
                        type: 'text',
                        'text': {
                            "content": comm
                        }
                    }
                ]
            },
            question_or_feedback: {
                type: 'multi_select',
                multi_select: [
                    {
                        "name": "Feedback"
                      },
                ]
            }
        },
      })
      console.log(response)
      console.log("Success! Entry added.")
    } catch (error) {
      console.error(error.body)
    }
}

// TEST GET REQUEST
export async function GET() {
    return NextResponse.json({ name:'THANACHOT', surname:'ONLAMOON' })
}

export async function POST(request) {
    const res = await request.json() // take the request json to works with
    if (res['type'] == 'question') {
        console.log('kids email: ' + res['email'] + ' kids question: ' + res['comment']) //print info just for checking
        addQuestionToNotion(res['email'],res['comment']) //add info to notion database
    }
    else if (res['type'] == 'feedback') {
        console.log('Feedback: ' + res['comment']) //print info just for checking
        addFeedbackToNotion(res['comment'])
    }
    return NextResponse.json({ status: 'SUCCESS' });
}
  