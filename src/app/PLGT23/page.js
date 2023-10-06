"use client"
import dynamic from "next/dynamic";
import React from "react";
import {
  Accordion,
} from '@chakra-ui/react'

const Individual_nav = dynamic(() => import('../../components/individual_nav'))
const Top = dynamic(() => import("../../components/PLGT23_components/top"));
const Info = dynamic(() => import("../../components/PLGT23_components/info"));
const Countdown = dynamic(() =>import("../../components/countdown"));
const Place = dynamic(() => import('../../components/place'))
const Agenda = dynamic(() => import('../../components/agenda'))
const Sumup = dynamic(() => import('../../components/sum_up'))
const Footer = dynamic(() => import('../../components/footer'))

const Question = dynamic(() => import('../../components/questionsection'))
const QCard = dynamic(() => import('../../components/questionCard'))

export default function plgt23() {
  const dateTimeAfterThreeDays = new Date("July 4, 2023 09:00:00");

  return (
    <>
    <title>PLGT23 - ICT21</title>
    <Individual_nav event_name='PLGT23' eventlink='PLGT23' hasImg='hidden' img='' imgLink='' links={[{
        delink: '/PLGT23#about',
        name: 'About'
      }, {
        delink: '/PLGT23#location',
        name: 'Location'
      }, 
      // {
      //   delink: '/PLGT23#agenda',
      //   name: 'Agenda'
      // }, 
      {
        delink: '/PLGT23#sum-up',
        name: 'Sum Up'
      }, {
        delink: '/PLGT23#faqs',
        name: 'FAQs'
      }
      
      ]} />
      <div
        id="plgt23"
        className="flex flex-col w-screen justify-center items-center"
      >
        <Top 
          event_name='PLGT23'
          date='July 4-5'
          description='Play, Learn and Grow Together, the activity specifically designed by Chittapanya team for ICT freshies to get to know each other. This event is thoughtfully made to enable the process of icebreaking for freshmen to interact, play, learn and grow together as the name mentioned. Along the activities, attendees can have fun while getting to know or at least having an attempt to remember faces of those who failed into the same fate as they are. '
        />
        <div className=" m-4">
          <Countdown targetDate={dateTimeAfterThreeDays} />
        </div>
        <Info />

        <div id='location' className="flex flex-col content-center items-center w-full h-fit bg-[#1D1D1F] mt-16 p-8 md:p-16 gap-7 md:gap-14">
          <h1 className=' text-2xl font-bold text-[#F5F5F7] items-center 
            pb-7 
            md:pb-10
            md:text-4xl'
          >
            LOCATION
          </h1>

          <div className="bg-[#FFFFFF] rounded-2xl p-3">
            <h1 className='text-transparent bg-clip-text font-extrabold text-xl md:text-3xl bg-gradient-to-l from-[#00FFFF] to-[#33FF00]'>DAY 1</h1>
          </div>

          <Place  
            firsthalfName='Faculty of ICT,'
            secondhalfName='Mahidol University'
            link='https://goo.gl/maps/ug6xrjcSav17RaEa8'
            image='ICTBuilding.webp'
            description='Unleashing Technology Horizons on San Sattaya Road: Faculty of ICT, Mahidol University, Where Innovation Converges with Academic Brilliance amidst a Tapestry of Knowledge, Enveloped by the Library, Lecture Theater I, Office of the President, and the Faculty of Engineering'
          />

          <div className="bg-[#FFFFFF] rounded-2xl p-3 ">
            <h1 className='text-transparent bg-clip-text font-extrabold text-xl md:text-3xl bg-gradient-to-l from-[#FF6B00] to-[#8F00FF]'>DAY 2</h1>
          </div>
          
          <Place  
            firsthalfName='Amphawa,'
            secondhalfName='Samut Songkhram'
            link='https://goo.gl/maps/2RuGnwguGQpGgbNSA'
            image='amphawa1.webp'
            description='Amphawa is a charming and historic town located in the province of Samut Songkhram, Thailand. Known for its picturesque canals and vibrant floating market, Amphawa offers visitors a glimpse into traditional Thai culture and a delightful sensory experience.'
          />
        </div>
      </div>

      {/* <div id='agenda'><Agenda whichEvent='PLGT23'/></div> */}

      <div  id='sum-up'><Sumup theText={
        <>
        <p><b>PLGT23 2 days</b>Tue 4th July and Wed 5th July, around 9.00-16.00</p>
        <p><b>Day 1 </b>9.00 at Grand Auditorium, Faculty of ICT</p>
        <p><b>Day 2 </b>9.00 at Innovative Space (Bamboo Garden), Faculty of ICT</p>
        <p><b>Dress Code </b>proper</p>
        </>
      }/></div>

      <div id='faqs' className='flex flex-col p-16 bg-white h-full w-screen items-center'>
        <h1 className=' font-bold
        text-2xl
        md:text-4xl'>QUESTIONS...?</h1>
        <Accordion allowToggle className='pt-16 
        w-12/12
        md:w-7/12'>

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

      <Footer/>
    </>
  );
}

const questionElement = [
  {
    question: 'What is the PLGT activities?',
    answer: 
    <div>
      <p>Play Learn Grow Together(PLGT) is a yearly activity for new freshmen. Letting know each other with in year 1 of ICT.</p>
      {/* <div className="p-4 flex flex-col items-center"><Image className='w-96' width={478} height={692} alt='English Exemption documents' src='/asset/English_exemption_doc.png' loading="lazy"/></div> */}
    </div>,
    allowFile: 'hidden',//if allow '', if not 'hidden'
    fileRoot: 'downloads/project1_leak.pdf',
    filename: 'project1_leak.pdf',
    fileName: 'Exemption Policy for Basic and Prerequisite English Classes',
  },
  {
    question: 'Any cost?',
    answer: 'All activity is free! Plus, the faculty also provides food, drink, and snack for free!',
    allowFile: 'hidden',
    fileRoot: '',
    filename: '',
    fileName: '',
  },
  {
    question: 'When? Where?',
    answer: <div>
    <p>Tue 4th July and Wed 5th July, around 9.00-16.00</p>
    <p>Day 1 the activity takes place in Faculty of ICT, and Day 2 the activity taks place in Amphawa.</p>
   </div>,
    allowFile: 'hidden',
    fileRoot: '',
    filename: '',
    fileName: '',
  },
  {
    question: '2-Day activity means I have to sleep over right?',
    answer:  <div>
    <p>No.</p>
    <p>The activity is two one-day activities the first day at Faculty of ICT the second day at Amphawa.</p>
   </div>,
    allowFile: 'hidden',
    fileRoot: '',
    filename: '',
    fileName: '',
  },
]
