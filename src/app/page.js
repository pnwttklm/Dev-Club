"use client"
import dynamic from 'next/dynamic'
import Head from 'next/head'

import {
  Accordion,
  Icon
  // Image,
} from '@chakra-ui/react'

// import {BsLink} from 'react-icons/bs'

import Image from "next/image"
import { BsLink } from 'react-icons/bs'

const Individual_nav = dynamic(() => import('../components/individual_nav'))
const GallerySlider2 = dynamic(() => import('../components/overview_components/galleryslider2'))
const MsgSlider2 = dynamic(() => import('../components/overview_components/msgslider2'))
const Allcards1 = dynamic(() => import('../components/overview_components/allcards1'))
const Footer = dynamic(() => import('../components/footer'))
const Timeline = dynamic(() => import( '../components/overview_components/timeline_main'))
const E_card = dynamic(() => import('../components/overview_components/event_cards'))
const Topelement = dynamic(() => import('../components/overview_components/top'))

const Question = dynamic(() => import('../components/questionsection'))
const QCard = dynamic(() => import('../components/questionCard'))


export default function Home() {

  return (
    <>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
  rel="apple-touch-icon"
  href="/apple-icon.ico"
/>
    </Head>
    <title>ICT21</title>
      <Individual_nav event_name='Overview' eventlink='' hasImg='hidden' img='' imgLink='' links={[{
        delink: '#about',
        name: 'About'
      }, {
        delink: '#timeline',
        name: 'Timeline'
      }, {
        delink: '#gallery',
        name: 'Gallery'
      }, {
        delink: '#msg-from-senpai',
        name: 'Messages'
      }, {
        delink: '#faqs',
        name: 'FAQs'
      }
      
      ]} />

      {/* <Individual_nav event_name='PLGT23' links={['About','Location','Agenda','Sum Up','FAQs']} img='game_icon2.svg'/> */}
      <div id='overview' className='flex flex-col w-screen justify-center items-center'>
        <Topelement/>

        <main className='flex flex-col mt-10 gap-10 items-center'>
        <E_card 
          topic={'PLGT23'} 
          info={'Play, learn, and grow together with activities designed specifically for ICT freshy.'}
          date1={'July 4'}
          date2={'July 5'}
          link={'/PLGT23'}
          img={'/asset/foroverviewbadge/plgtbadge.svg'} 
          type={2}
        />

        <E_card 
          topic={'Welcome Freshy'} 
          info={'Say hi to senpais, Ajarns, and staffs. Start your own legendary journey at Faculty of ICT.'} 
          date1={'Aug 6, 8.30 a.m.'}
          link={'/welcome-freshy'}
          img={'/asset/foroverviewbadge/sairahusbadge.svg'} 
          type={1}
        />

        <E_card 
          topic={'Sairahus'} 
          info={'Hereditarily cursed passed down from generation to generation.'} 
          date1={'Aug 6, 1 p.m.'}
          link={'/sairahus'}
          img={'/asset/foroverviewbadge/welcomefreshybadge.svg'} 
          type={1}
        />

        <p className='text-[#4A4A4A] 
        text-xs
        sm:text-sm
        md:text-base'>All activities will be conducted in Thai and English.</p>
        </main>

        <main className='flex flex-col mt-10 gap-10 items-center'>
          <E_card 
            topic={'Guide Book'} 
            info={'Let’s explore places around uni including restaurants, entertainments, and more.'} 
            link={'/guide-book'}
            img={'/asset/foroverviewbadge/book1.svg'} 
            type={3}
          />

          <E_card 
            topic={'Meet our team'} 
            info={'Meet the team who make these happen, and make, learn, fun with us by joining us.'} 
            link={'/meet-our-team'}
            img={'/asset/foroverviewbadge/badge20.svg'} 
            type={3}
          />

        </main>
      </div>

      <div id='timeline' className='h-24 '/>
      <div className='bg-gradient-to-b from-[#000000] via-[#303285] to-[#000000]'>
        <div className='flex flex-col pt-10 justify-center'>
          <h1 className=' text-white font-bold text-center
          text-2xl
          md:text-4xl'>TIMELINE</h1>
        </div>
        <Timeline/>
      </div>

      <div id='gallery' className='h-24'/>
      <div className='flex w-screen justify-center'>
        <div className='flex flex-col h-full w-11/12 items-center justify-center gap-10'>
          <h1 className=' text-white font-extrabold text-4xl text-center'>GALLERY</h1>
          <GallerySlider2/>
        </div>
      </div>
      {/* <GallerySlider/> keen-slider have problem with nextJs */}

      <div id='msg-from-senpai' className='h-24'/>
      <div className='flex w-screen justify-center'>
        <div className='flex flex-col h-full w-11/12 justify-center gap-10'>
          <h1 className=' text-white font-extrabold text-4xl text-center'>MESSAGE FROM SENPAIS</h1>
          <MsgSlider2/>
        </div>
      </div>
      {/* <MsgSlider/> keen-slider have problem with nextJs*/}

      <div className='h-6'/>
      <div id='faqs'>
        
      <div className='flex flex-col pt-16 p-12 bg-white h-full w-full items-center'>
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

      <div id='ict'>
        <Allcards1/>
      </div>

      <div id='foot'>
        <Footer/>
      </div>
    </>
  )
}

const questionElement = [
  {
    question: 'What is English Exemption?',
    answer: 
    <div>
      <p>Ask Mr. Martin or P.Tum for more information, but to say it in short, exemption is an act that if you are good at English and have a solid proof (such as getting a remarkable score in  TOEFL, IELTS, etc.) you will be able to skip the easy English class that everyone will be taken and go study even more advanced course instead. (the skipped class will be granted as S grade and it won’t be calculated in your GPA, but you still got the credit and need to pay the credit fee).</p>
      <p>As your senior, I recommend you to exempt because you can take more foreign languages available such as German(I, II), and Chinese(I, II).</p>
      <div className="p-4 flex flex-col items-center"><Image width={478} height={692} alt='English Exemption documents' src='/asset/forQuestion/English_exemption_doc.webp' loading="lazy"/></div>
    </div>,
    allowFile: 'hidden',//if allow '', if not 'hidden'
    fileRoot: '/downloads/project1_leak.pdf',
    filename: 'project1_leak.pdf',
    fileName: 'Exemption Policy for Basic and Prerequisite English Classes',
  },
  {
    question: 'I would like to loan the student loan (กยศ.)',
    answer: <>
      <p>As a student of ICT you can loan the student loan (กยศ.) type 1.</p>
      <p className='pb-6'>You can learn more by clicking the link below</p>
      
      <a href='https://sites.google.com/view/musl-mahidol2564/' className="w-fit rounded-full text-md font-medium hover:text-[#F5F5F7] hover:bg-[#1D1D1F] bg-[#F5F5F7] px-4 p-2" >
      <Icon className="mr-1" as={BsLink} />
        Link
      </a>
      
    </>,
    allowFile: 'hidden',
    fileRoot: '',
    filename: '',
    fileName: '',
  },
  {
    question: "Everyone who graduated from Mahidol university is a doctor, isn't it",
    answer: 'ahhhhhh, maybe not.',
    allowFile: 'hidden',
    fileRoot: '',
    filename: '',
    fileName: '',
  },
  {
    question: 'How can I contact ICT staffs?',
    answer:     <div>
    <p>Here it is!</p>
    <div className="p-4 flex flex-col items-center"><Image width={478} height={692} alt='English Exemption documents' src='/asset/forQuestion/contact.webp' loading="lazy"/></div>
    </div>
    ,
    allowFile: 'hidden',
    fileRoot: '',
    filename: '',
    fileName: '',
  },
  {
    question: 'I gonna buy a new computer for studying in ICT, can you recommend me?',
    answer: <>
      <p className='font-medium'>1. Do I have to have my own computer or laptop?</p>
      <p ><b>Ans.</b> No, you don't. Faculty of ICT provided computers for all students in the class but if you want more privacy or continuity of working between your place and faculty you should go for it.</p>
      <p className='font-medium'>2. Can you recommend me the specs</p>
      <p><b>Ans.</b> Yes, I can. The faculty recomended </p>
      <p> -- CPU: Intel Core i5 or i7 Gen 11 or higher, AMD Ryzen 5 or 7 5500 series or higher</p>
      <p> -- Storage: SSD PCLe/NVMe M.2 512GB or higher</p>
      <p> -- Ram: DDR4 16GB or higher</p>
      <p> -- Graphic for general programming: NVIDIA GeForce MX450 2GB GDDR6 or AMD Radeon Graphics</p>
      <p> -- Graphic for multimedia purpose: NVIDIA GeForce GTX1650 4GB GDDR6 or AMD Radeon RX 5500M 4GB GDDR</p>
      <p>*note that this is the recommended specs for buying a new one, lower specs still okay.</p>
      <p className='font-medium'>3. How about Macs?</p>
      <p><b>Ans.</b> Macs are also recommended but some applications may not support but instructors always have alternative applications for Macs.</p>
    </>,
    allowFile: 'hidden',
    fileRoot: '',
    filename: '',
    fileName: '',
  },
  {
    question: 'Is there any scholarship for ICT students',
    answer: <><p>Yes, there is. For ICT students the faculty provides scholarships for students who demonstrate excellent academic and activity qualifications. The scholarships cover the tuition and university fees.</p>
    <p>More information in the file below.</p>
    </>
    ,
    allowFile: '',
    fileRoot: 'https://www.ict.mahidol.ac.th/wp-content/uploads/2023/02/16.-ICT-66-ทุนการศึกษา-66-ประกาศ-เรื่องการให้ทุนการศึกษาทุน-Talentพ.ศ.-2566-ID66-เป็นต้นไป.pdf',
    filename: '16.-ICT-66-ทุนการศึกษา-66-ประกาศ-เรื่องการให้ทุนการศึกษาทุน-Talentพ.ศ.-2566-ID66-เป็นต้นไป.pdf',
    fileName: 'ICT 66 Scholarships',
  },
  {
    question: 'If I choose Software Engineering track will I get B.Sc or B.E',
    answer: 
    <p>Everyone graduated from any track of ICT will get The Bachelor of Science Program in Information and Communication Technology(B.Sc)</p>
    ,
    allowFile: 'hidden',
    fileRoot: '',
    filename: '',
    fileName: '',
  },
]