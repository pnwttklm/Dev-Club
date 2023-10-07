'use client'
import Image from 'next/image';
import { Box, Link, SimpleGrid } from '@chakra-ui/react';
import { Client } from "@notionhq/client";
import { useEffect, useState } from 'react'; // Import the useState and useEffect hooks

// const { Client } = require("@notionhq/client")

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  

export default function q() {
    const [qEle, setQEle] = useState([]); // Initialize qEle as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {results} = await notion.databases.query({ database_id: process.env.NOTION_DATABASE_ID });
        const qElements = results.map((q) => ({
          name: q.properties.name.rich_text[0].plain_text,
          imgSrc: q.properties.imgSrc.rich_text[0].plain_text,
          color: q.properties.color.rich_text[0].plain_text,
          num: q.properties.num.rich_text[0].plain_text,
        }));
        setQEle(qElements); // Update qEle with the fetched data
      } catch (error) {
        console.error("Error fetching data jaaa:", error);
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, []); // Pass an empty dependency array to run this effect only once when the component mounts

    return (
      <>
      <div class="grid grid-flow-col auto-cols-ma gap-100 lg:p-32 p-6">
        <SimpleGrid columns={[1, 1, 5]} spacingX='40px' spacingY='20px'>
        {qEle.map((qE, index) => (
            <div className='bg-black p-6' key={index}>
                <Image src={qE.imgSrc} width={1000} height={1000} alt='banner' className='w-full'/>
                <h1 className={`${qE.color} text-3xl text-center pt-6`}>{qE.name}</h1>
                <h1 className='text-[#FFFFFF] text-xl text-center'>It is the turn of</h1>
                <h1 className={`${qE.color} text-[100px] text-center`}>{qE.num}</h1>
            </div>
        ))}
        </SimpleGrid>
      </div>
      </>
      
    );
  }

//   const {results} = await notion.databases.query({ database_id: process.env.NOTION_DATABASE_ID });
//   const qEle = results.properties;
//   await results.map((q) => {
//     const qEle = q.properties;
//     const qElement = [{name: qEle.name, 
//         imgSrc: qEle.imgSrc.rich_text[0].plain_text,
//         color: qEle.color.rich_text[0].plain_text,
//         num: qEle.num.rich_text[0].plain_text,
//     }]
//   })

//   const qElement = [
//     {
//       name: 'FRONTEND WEB',
//       imgSrc: 'head_banner.svg',
//       color: 'text-[#00FF66]',
//       num: 'FW06',
//     },
//     {
//         name: 'FRONTEND APP',
//         imgSrc: 'head_banner.svg',
//         color: 'text-[#2400FF]',
//         num: 'FA03',
//       },
//       {
//         name: 'BACKEND',
//         imgSrc: 'head_banner.svg',
//         color: 'text-[#FAFF00]',
//         num: 'BN09',
//       },
//       {
//         name: 'DESIGN & ART',
//         imgSrc: 'head_banner.svg',
//         color: 'text-[#FA00FF]',
//         num: 'DA10',
//       },
//       {
//         name: 'QA',
//         imgSrc: 'head_banner.svg',
//         color: 'text-[#FF0000]',
//         num: 'QA32',
//       },
// ]

