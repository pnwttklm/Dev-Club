"use client"
import dynamic from "next/dynamic";

import { Accordion } from '@chakra-ui/react'

const QCard = dynamic(() => import('../components/questionCard'))

const Header = dynamic(() => import('../components/index_c/header'))
const Location = dynamic(() => import('../components/index_c/location'))
const Teams = dynamic(() => import('../components/index_c/teams'))
const WhyUs = dynamic(() => import('../components/index_c/whyUs'))

export default function Home() {
  return (
    <>
      <Header/>

      <div className='h-6'/>
      <div id='location'>

      <div className='flex flex-col pt-6 bg-white h-full w-full items-center'>
        <h1 className='
        text-2xl
        md:text-4xl'>Location</h1>
          <Location/>
        </div>
      </div>

      <div className='h-6'/>
      <div id='why-us'>

      <div className='flex flex-col pt-6 bg-white h-full w-full items-center'>
        <h1 className='
        text-2xl
        md:text-4xl'>Why Us?</h1>
          <WhyUs/>
        </div>
      </div>

      <div className='h-6'/>
      <div id='teams'>

      <div className='flex flex-col pt-6 bg-white h-full w-full items-center'>
        <h1 className='
        text-2xl
        md:text-4xl'>Teams</h1>
          <Teams/>
        </div>
      </div>

      <div className='h-6'/>
      <div id='faqs'>

      <div className='flex flex-col pt-16 p-12 bg-white h-full w-full items-center'>
        <h1 className='
        text-2xl
        md:text-4xl'>QUESTIONS...?</h1>
        <Accordion.Root collapsible className='pt-16
        w-full
        xl:w-7/12'>

        {questionElement.map((cardE, index) => (
              <div key={index}>
                <QCard
                value={`faq-${index}`}
                question={cardE.question}
                answer={cardE.answer}
                ></QCard>
              </div>
        ))}


        </Accordion.Root>

      </div>

      </div>

    </>
  );
}

const questionElement = [
  {
    question: 'What is this club',
    answer: <p>This club is for those who want to learn about working in developer field, not only coding but also Design, art, and QA.</p>,
  },
];
