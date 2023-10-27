import React, { useState } from "react";

import {
  Button,
  Center,
  Link,
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
        <h1 className={`text-black text-4xl pb-16  text-center`}>Congratulations {element.name}!<br/>You are eligible to be interviewed in the following team(s):</h1>
        
        <div className="grid grid-flow-col auto-cols-ma gap-100 lg:px-96 p-6">
        <SimpleGrid columns={[1, 1, 3]} spacingX='40px' spacingY='20px'>
        {foundInterview.type.map((qE, index) => (
            <div className='bg-black pt-6 px-6 text-white' key={index}>
              <Image src={`${eligibleTeams[index]?.imgSrc}`} width={1000} height={1000} alt='banner' className='h-1/3'/>
                <h1 className={`${eligibleTeams[index]?.color} text-3xl text-center pt-6 `}>{eligibleTeams[index]?.name}</h1>
                <h1 className="text-xl pt-6">ID: {element.ID}</h1>
                <h1 className="text-xl pb-12">Name: {element.name}</h1>
                {/* <h1 className='text-[#FFFFFF] text-xl text-center'>Interview ID:</h1>
                <h1 className={`${eligibleTeams[index]?.color} text-[100px] text-center`}>{qE.typeID}{qE.interID}</h1> */}
                {/* <h1 className='text-[#FFFFFF] text-xl text-left'>Date: {qE.date.toString()}</h1>
                <h1 className='text-[#FFFFFF] text-xl text-left'>Round: {qE.time}</h1> */}
            </div>
        ))}
      </SimpleGrid>
      
      </div>
      <Center>
      <Link href={element.form} className=" px-2 py-3 bg-black text-white text-xl border-2 border-black hover:bg-white hover:text-black hover:italic">
                Confirm to Interview
      </Link>
      </Center>
        
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
      ID: '6488a',
      name: 'Thanapat Nonpassopon',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone',
      type: [
        {
          typeID: 'DA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'QA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6588008',
      name: 'Jakguy Boriboon ',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i',
      type: [
        {
          typeID: 'BN',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6488b',
      name: 'Prachnachai Meakpaiboonwattana',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone-1',
      type: [
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'DA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'BN',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6688029',
      name: 'Phurinat Intawichian ',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone-1',
      type: [
        {
          typeID: 'DA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6688052',
      name: 'Pannawit Krutnak',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone',
      type: [
        {
          typeID: 'FA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'BN',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'QA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6688115',
      name: 'Ponlapat Subsaenudom',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone-1',
      type: [
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'DA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6488079',
      name: 'Burit Sihabut',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone',
      type: [
        {
          typeID: 'QA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'DA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6488018',
      name: 'Ramita Deeprom',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone-1',
      type: [
        {
          typeID: 'DA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6688026',
      name: 'Paulwit Fakfaiphol',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i',
      type: [
        {
          typeID: 'FA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'BN',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6688002',
      name: 'Nuttawat Angsakul',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone',
      type: [
        {
          typeID: 'BN',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'QA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6588018',
      name: 'Kritin Chitchobtham',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone',
      type: [
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'QA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6488217',
      name: 'Pattaradnai Kaeodumkoeng',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone',
      type: [
        {
          typeID: 'FA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'QA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6588013',
      name: 'Praewa Chan-on',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone',
      type: [
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'BN',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'QA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6488089',
      name: 'Pattaravit Suksri',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone-1',
      type: [
        {
          typeID: 'DA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6588106',
      name: 'Arbhichar Thanajirawat',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i',
      type: [
        {
          typeID: 'BN',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6588067',
      name: 'Harith Phalangpatanakij ',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone',
      type: [
        {
          typeID: 'BN',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'QA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6588028',
      name: 'Jinjutha Jindapunpaisan',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone',
      type: [
        {
          typeID: 'BN',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'QA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6588204',
      name: 'Chayanid Termphaiboon',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i',
      type: [
        {
          typeID: 'BN',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6588022',
      name: 'Sakhunich Iamcharas',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone-1',
      type: [
        {
          typeID: 'DA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    }, 
    {
      ID: '6688042',
      name: 'Punnawit Kanogpornwanich',
      form: 'https://calendly.com/muictdevclub/muict-dev-club-member-interview-group-i-clone',
      type: [
        {
          typeID: 'BN',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'FW',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
        {
          typeID: 'QA',
          interID: '00',
          date: 'October 31, 2023',
          time: '00.00'
        },
      ]
    },     
  ]

  const teams = [
    {
      ID: 'FW',
      name: 'FRONTEND WEB',
      imgSrc: '/fwLogo.svg',
      color: 'text-[#00FF66]',
      form: 'https://google.com',
    },
    {
        ID: 'FA',
        name: 'FRONTEND APP',
        imgSrc: '/faLogo.svg',
        color: 'text-[#006AFF]',
        form: '',
      },
      {
        ID: 'BN',
        name: 'BACKEND',
        imgSrc: '/bnLogo.svg',
        color: 'text-[#FF5656]',
        form: '',
      },
      {
        ID: 'DA',
        name: 'DESIGN & ART',
        imgSrc: '/daLogo.svg',
        color: 'text-[#FA00FF]',
        form: '',
      },
      {
        ID: 'QA',
        name: 'Quality Assurance',
        imgSrc: '/qaLogo.svg',
        color: 'text-[#FFC700]',
        form: '',
      },
]
