import React, { useState } from "react";

import {
  SimpleGrid
} from '@chakra-ui/react'
import Image from 'next/image';

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const foundInterview = interview.find((interviewee) => interviewee.ID.toString() === slug);

  if (foundInterview) {
    const element = foundInterview;
    const eligibleTeams = foundInterview.type.map((interviewType) => {
      const team = teams.find((team) => team.ID === interviewType.typeID);
      return team
    });
    return (
      <>
      <h1 className={`text-black text-[100px] text-center`}>🥰</h1>
        <h1 className={`text-black text-4xl pb-24  text-center`}>Congratulations {element.name}!<br/>You are eligible to be interviewed in the following team(s):</h1>
        
        <div className="grid grid-flow-col auto-cols-ma gap-100 lg:px-96 p-6">
        <SimpleGrid columns={[1, 1, 3]} spacingX='40px' spacingY='20px'>
        {foundInterview.type.map((qE, index) => (
            <div className='bg-black pt-6 px-6' key={index}>
              <Image src={`${eligibleTeams[index]?.imgSrc}`} width={1000} height={1000} alt='banner' className='h-1/3'/>
                <h1 className={`${eligibleTeams[index]?.color} text-3xl text-center pt-6`}>{eligibleTeams[index]?.name}</h1>
                <h1 className='text-[#FFFFFF] text-xl text-center'>Interview ID:</h1>
                <h1 className={`${eligibleTeams[index]?.color} text-[100px] text-center`}>{qE.typeID}{qE.interID}</h1>
                <h1 className='text-[#FFFFFF] text-xl text-left'>Date: {qE.date.toString()}</h1>
                <h1 className='text-[#FFFFFF] text-xl text-left'>Round: {qE.time}</h1>
            </div>
        ))}
      </SimpleGrid>
      </div>


        
      </>
    );
  } else {
    return <NotFound/>;
  }
}

function NotFound() {
  return (
    <>
    <h1 className={`text-black text-[100px] text-center`}>🥹</h1>
        <h1 className={`text-black text-4xl pb-24  text-center`}>We are sorry to hear that <br/>You are not eligible to interview.</h1>
        
    </>
  );
}


  const interview = [
    {
      ID: 6588048,
      name: 'Poonyawatt Klumnaim',
      type: [
        {
          typeID: 'FW',
          interID: '01',
          date: 'October 30, 2023',
          time: '10.30'
        },
        {
          typeID: 'DA',
          interID: '01',
          date: 'October 30, 2023',
          time: '11.30'
        },
        {
          typeID: 'QA',
          interID: '01',
          date: 'October 30, 2023',
          time: '12.30'
        }
      ]
    },
    {
      ID: 6588050,
      name: 'Poonyawatt Klumnaim',
      type: [
        {
          typeID: 'FW',
          interID: '02',
          date: 'October 30, 2023',
          time: '10.30'
        },
        {
          typeID: 'DA',
          interID: '02',
          date: 'October 30, 2023',
          time: '10.30'
        }
      ]
    }
  ]

  const teams = [
    {
      ID: 'FW',
      name: 'FRONTEND WEB',
      imgSrc: '/fwLogo.svg',
      color: 'text-[#00FF66]',
      des: 'Elevate Your Design Game. Dive into the Future of Web Development. Stay Ahead with Stunning and Innovative Designs.',
      tools: 'React, Next.js',
    },
    {
        ID: 'FA',
        name: 'FRONTEND APP',
        imgSrc: '/faLogo.svg',
        color: 'text-[#006AFF]',
        des: 'Explore the Future of Mobile Apps! Discover the Next Level of Innovation and Convenience. Join Us in Pushing Boundaries.',
        tools: 'Dart, Flutter',
      },
      {
        ID: 'BN',
        name: 'BACKEND',
        imgSrc: '/bnLogo.svg',
        color: 'text-[#FF5656]',
        des: 'The Backbone Behind Every Project. Managing data, securing information, and delivering smooth functionality, it\'s the invisible force that keeps everything running seamlessly.',
        tools: 'JS, TS, Express',
      },
      {
        ID: 'DA',
        name: 'DESIGN & ART',
        imgSrc: '/daLogo.svg',
        color: 'text-[#FA00FF]',
        des: 'Follow Your Heart to a World of Beauty and Tranquility. Explore Inspiring Creations and Express Your Inner Artist.',
        tools: 'Adobe Illustrator, Figma',
      },
      {
        ID: 'QA',
        name: 'Quality Assurance',
        imgSrc: '/qaLogo.svg',
        color: 'text-[#FFC700]',
        des: 'Ensuring Flawless Execution. We meticulously test and fine-tune every aspect of every project to guarantee it performs perfectly.',
        tools: '-',
      },
]
