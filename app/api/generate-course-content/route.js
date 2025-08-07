
import { ai } from "@/app/api/generate-course-layout/route";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { RawReferenceImage } from "@google/genai";
import axios from "axios";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
const  PROMPT = `
Generate HTML content for each topic within the provided chapter data.

**IMPORTANT:** Your response MUST be a single, valid JSON object and nothing else. Do not include any introductory text, explanations, or markdown formatting like \`\`\`json.

Use this exact JSON schema:
{
  "chapterName": "string",
  "topics": [
    {
      "topic": "string",
      "content": "string (containing HTML)"
    }
  ]
}

User Input:
`;



export async function POST(req){
  const {courseJson, courseTitle, courseId}=await req.json()
const tools = [
    {
      googleSearch: {
      }
    },
  ];
  const promise=courseJson.chapters.map(async(chapter)=>{
    const config = {
    tools,
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT+JSON.stringify(chapter),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  console.log(response.candidates[0].content.parts[0].text);
  const RawResp = response.candidates[0].content.parts[0].text;
  console.log("RawResp is");
  console.log(RawResp);
  
  
  const RawJson = RawResp.replace('```json', '').replace('```', '');

  console.log("RawJson iss");
  console.log(RawJson);
  
  
  // Add error handling for JSON.parse
  let JSONResp;
  try {
    JSONResp = JSON.parse(RawJson);
  } catch (e) {
    console.error("Failed to parse AI response as JSON:", e, RawJson);
    return NextResponse.json({ error: "AI did not return valid JSON", details: RawJson }, { status: 500 });
  }
  // Get youtube video
  const youtubeData=await GetYoutubeVideo(chapter?.chapterName)
console.log("course and youtube data");

  console.log({
    youtubeVideo:youtubeData,
    courseData:JSONResp
  });
  

  return {
    youtubeVideo:youtubeData,
    courseData:JSONResp
  }
  })

  const CourseContent=await Promise.all(promise)


  // save to db 
  const dbResp=await db.update(coursesTable).set({
    courseContent:CourseContent
  }).where(eq(coursesTable.cid, courseId))
  return NextResponse.json({
    courseName:courseTitle, 
    CourseContent:CourseContent
  })
}

const YOUTUBE_BASE_URL='https://www.googleapis.com/youtube/v3/search'
const GetYoutubeVideo= async(topic)=>{
  const params={
    part:'snippet',
    q:topic,
    maxResult:4,
    type:'video',
    key:process.env.YOUTUBE_API_KEY
  }

  const resp=await axios.get(YOUTUBE_BASE_URL, {params})

  const youtubeVideoListResp=resp.data.items

  const youtubeVideoList=[];
  youtubeVideoListResp.forEach(item=>{
    const data={
      videoId:item.id?.videoId,
      title:item.snippet?.title
    }
    youtubeVideoList.push(data)
  })
  console.log("youtubeVideoList", youtubeVideoList);
  
  return youtubeVideoList;

}