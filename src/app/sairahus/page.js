"use client"
import dynamic from "next/dynamic";
import React from "react";

import {
  Accordion,
  Image,
} from '@chakra-ui/react'

const Individual_nav = dynamic(() => import('../../components/individual_nav'))
const Top = dynamic(() => import("../../components/sairahus_components/top"));
const Countdown = dynamic(() =>import("../../components/countdown"));
const Place = dynamic(() => import('../../components/place'))
const Agenda = dynamic(() => import('../../components/agenda'))
const Footer = dynamic(() => import('../../components/footer'))
const Sumup = dynamic(() => import('../../components/sum_up'))

const Question = dynamic(() => import('../../components/questionsection'))
const QCard = dynamic(() => import('../../components/questionCard'))

export default function Sairahus() {
  const dateTimeAfterThreeDays = new Date("August 6, 2023 13:00:00"); //customize date here

  return (
    <>
    <title>Sairahus - ICT21</title>
    <Individual_nav event_name='Sairahus' eventlink='sairahus' hasImg='hidden' img='' imgLink='' links={[{
        delink: '/sairahus#about',
        name: 'About'
      }, {
        delink: '/sairahus#location',
        name: 'Location'
      }, {
        delink: '/sairahus#agenda',
        name: 'Agenda'
      }, {
        delink: '/sairahus#sum-up',
        name: 'Sum Up'
      }, {
        delink: '/sairahus#faqs',
        name: 'FAQs'
      }
      
      ]} />
      <div
        id="sairahus"
        className="flex flex-col w-screen justify-center items-center"
      >
        <Top 
            event_name='Sairahus'
            date='Aug 6'
            description='Hereditarily cursed passed down from generation to generation. Generations by generations, the student ID or Rahus Naksuksa is passed down. Find your seniors in your Sairahus here! Now you might be wondering that how will finding your “P’Rahus” benefits you, right? A certain advantage can be instantly granted to you such as a spoiler for the whole next semester that your seniors previously faced a year ago, which they probably haven’t forgotten such nostalgic (traumatic, to be precise) moment just yet. Not only just an untold experience but also something that you might like such as worksheets, slides, lectures, and even some gift from your senior. So, stay tuned for this event and get ready to know that random person who is just happened to get in the university 1 year faster than you do! (If you are lucky enough your senior will not resign yet)'
        />
        
        <div className=" m-4">
          <Countdown targetDate={dateTimeAfterThreeDays}/>
        </div>

        <div id='location' className="flex flex-col content-center items-center w-full h-fit bg-[#1D1D1F] mt-16 p-8 md:p-16  gap-7 md:gap-14">
            <h1 className=' text-2xl font-bold text-[#F5F5F7] items-center 
                pb-7 
                md:pb-10
                md:text-4xl'
            >
                LOCATION
            </h1>

          <Place  
            firsthalfName='Faculty of ICT,'
            secondhalfName='Mahidol University'
            link='https://goo.gl/maps/ug6xrjcSav17RaEa8'
            image='ICTBuilding.webp'
            description='Unleashing Technology Horizons on San Sattaya Road: Faculty of ICT, Mahidol University, Where Innovation Converges with Academic Brilliance amidst a Tapestry of Knowledge, Enveloped by the Library, Lecture Theater I, Office of the President, and the Faculty of Engineering'
          />
        </div>
      </div>

      <div id='agenda'><Agenda whichEvent='Sairahus'/> </div>

      <div id='sum-up'><Sumup
      theText={
        <>
        <p><b>Sairahus </b>Sun 6th August, around 13.00-16.00 at Faculty of ICT</p>
        <p><b>Dress Code </b>proper</p>
        </>
      }
      /></div>
      
      <div id='faqs'>
        
      <div className='flex flex-col p-6 bg-white h-full w-full items-center'>
        <h1 className=' font-bold
        text-2xl
        md:text-4xl'>QUESTIONS...?</h1>
        <Accordion allowToggle className='pt-16 
        md:w-full
        xl:w-7/12'>

        {questionElement.map((cardE, index) => (
              <div key={index}>
                <QCard
                question={cardE.question}
                answer={cardE.answer}
                allowImg={cardE.allowImg}
                allowFile={cardE.allowFile}
                imgL={cardE.imgL}
                imgAlt={cardE.imgAlt}
                fileRoot={cardE.fileRoot}
                filename={cardE.filename}
                fileName={cardE.fileName}
                ></QCard>
              </div>
        ))}

          
        </Accordion>
         <Question/>

      </div>
      </div>

      <Footer/>
    </>
  );
}

const questionElement = [
  {
    question: 'What is the Sairahus activity?',
    answer: 
    <div>
      <p>Sairahus is a yearly activity for new freshmen. Letting know each other between year 1 ICT and another year of ICT.</p>
      {/* <div className="p-4 flex flex-col items-center"><Image className='w-96' width={478} height={692} alt='English Exemption documents' src='/asset/English_exemption_doc.png' loading="lazy"/></div> */}
    </div>,
    allowFile: 'hidden',//if allow '', if not 'hidden'
    fileRoot: 'downloads/project1_leak.pdf',
    filename: 'project1_leak.pdf',
    fileName: 'Exemption Policy for Basic and Prerequisite English Classes',
  },
  {
    question: 'Any cost?',
    answer: <div>
    <p>No, it's all for free.</p>
  </div>,
    allowFile: 'hidden',
    fileRoot: '',
    filename: '',
    fileName: '',
  },
  {
    question: 'When? Where?',
    answer: 'Sun 6th August, around 13.00-16.00 at Faculty of ICT',
    allowFile: 'hidden',
    fileRoot: '',
    filename: '',
    fileName: '',
  },
]