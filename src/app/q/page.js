'use client'
import Image from 'next/image';
import { Box, Link, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from "react";


export default function Q() {

const { Client } = require('@notionhq/client');
const database_token = 'secret_75OmxxYSJBIgPy37wh8Qm26MEIUqn9bvPHmTEpQWmCp'
const notion = new Client({ auth: database_token });

// (async () => {
  const databaseId = '73c5819b4daf4017a4da2b7f7ac77387';
  const response = notion.databases.retrieve({ database_id: databaseId });
  console.log(response);
// })();
const data = response.properties;
    
    return (
      <>
      <div className="grid grid-flow-col auto-cols-ma gap-100 lg:p-32 p-6">
        <SimpleGrid columns={[1, 1, 5]} spacingX='40px' spacingY='20px'>
        {qElement.map((qE, index) => (
            <div className='bg-black p-6' key={index}>
                <Image src={qE.imgSrc} width={1000} height={1000} alt='banner' className='h-1/3'/>
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

  const qElement = [
    {
      name: 'FRONTEND WEB',
      imgSrc: 'fwLogo.svg',
      color: 'text-[#00FF66]',
      num: 'FW06',
    },
    {
        name: 'FRONTEND APP',
        imgSrc: 'faLogo.svg',
        color: 'text-[#006AFF]',
        num: 'FA03',
      },
      {
        name: 'BACKEND',
        imgSrc: 'bnLogo.svg',
        color: 'text-[#FF5656]',
        num: 'BN09',
      },
      {
        name: 'DESIGN & ART',
        imgSrc: 'daLogo.svg',
        color: 'text-[#FA00FF]',
        num: 'DA10',
      },
      {
        name: 'Quality Assurance',
        imgSrc: 'qaLogo.svg',
        color: 'text-[#FFC700]',
        num: 'QA32',
      },
]

