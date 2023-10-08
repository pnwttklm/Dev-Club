'use client'
import Image from 'next/image';
import { Box, Link, SimpleGrid } from '@chakra-ui/react';


export default function teams() {

    return (
      <>
      <div className="grid grid-flow-col auto-cols-ma gap-100 lg:p-32 p-6">
        <SimpleGrid columns={[1, 1, 5]} spacingX='40px' spacingY='20px'>
        {qElement.map((qE, index) => (
            <div className='bg-black p-6' key={index}>
                <Image src={qE.imgSrc} width={1000} height={1000} alt='banner' className='h-[200px]'/>
                <h1 className={`${qE.color} text-3xl text-left pt-6 pb-3`}>{qE.name}</h1>
                <h1 className={`text-white text-xl text-left`}>{qE.des}</h1>
                <h1 className={`text-white text-xl text-left pt-3`}>Tools: {qE.tools}</h1>
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
      des: 'Making the gorgeous websites, akfjekdfkdfdjfo[jdjpskjspdkjdjks;j;kjfjfd;ksjf;fk',
      tools: 'React, Next.js',
    },
    {
        name: 'FRONTEND APP',
        imgSrc: 'faLogo.svg',
        color: 'text-[#006AFF]',
        des: 'Push mobile application beyond the edge djfdfjkdddjkdjdkgjkdjgkdjdjdlldkfdfldkdlkfldkfkdllkfdlkl',
        tools: 'Dart, Flutter',
      },
      {
        name: 'BACKEND',
        imgSrc: 'bnLogo.svg',
        color: 'text-[#FF5656]',
        des: 'Supporting and structuring all the project  djfkdjkdjjdksjldjgklddhkldskslkjgdslkdsjkljdlgjfskdlghdslkfmwdn',
        tools: 'JS, TS, Express',
      },
      {
        name: 'DESIGN & ART',
        imgSrc: 'daLogo.svg',
        color: 'text-[#FA00FF]',
        des: 'Let\'s your heart lead you to the land of beautiful and peaceful of art and design dkfjkdjfpsjgdikldjpsmfdjcpigjsdgpdgj',
        tools: 'Adobe Illustrator, Figma',
      },
      {
        name: 'Quality Assurance',
        imgSrc: 'qaLogo.svg',
        color: 'text-[#FFC700]',
        des: 'Making sure that every piece of the project runs as expected idjfipfjifjjffjpdjfdpjfdojopjpso',
        tools: '-',
      },
]

