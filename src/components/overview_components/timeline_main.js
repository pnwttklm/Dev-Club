'use client'
import { 
    Icon,
    SimpleGrid,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Portal,
} from '@chakra-ui/react'
import { BsGeoAltFill } from "react-icons/bs";
import Image from 'next/image'

export default function() {
    return (
      <div>
        <div className='flex flex-col h-full items-center'>
          <SimpleGrid className='pt-10 pl-20 pr-20 pb-10' columns={[1,1,2,4]} spacing={10}>
            {timeline_elements.map((timeline, index) => (
              <div key={index}>
                <Popover trigger='hover' closeOnBlur={true} >
                {/* {({ onClose }) => ( */}
                  <PopoverTrigger>
                    <div className='flex flex-col items-center justify-center'>
                      <Image className='mb-2' width={200} height={200} src={timeline.img_url} alt={`image of ${timeline.event_name}`} loading="lazy"/>
                      <p className='bg-white rounded-full pt-1 pb-1 pl-3 pr-3 font-bold 
                      text-xs
                      sm:text-sm
                      md:text-base'>{timeline.event_name}</p>
                      <p className='mt-2 text-white font-bold
                      text-xs
                      sm:text-sm
                      md:text-base'>{timeline.day}</p>
                    </div>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent className=' rounded-3xl'>
                      <PopoverArrow />
                      <PopoverBody className='p-6'>
                        <div className='flex justify-between'>
                          <Image width={150} height={150} src={timeline.img_url} alt={`image of ${timeline.event_name}`} loading="lazy"/>
                          <a href={`/asset/timeline_ics/${timeline.calendarLink}`} download={timeline.calendarLink}>
                            <Image width={56} height={56} className='h-18 w-18' src='Add_to_Calendar_btn.svg' alt='Add to Calendar'loading="lazy"/>
                          </a>
                        </div>
                        <div className='flex flex-col'>
                          <h1 className='font-bold text-xl text-black'>{timeline.event_name}</h1>
                          <p className='font-medium'>
                            {timeline.dateTime}
                          </p>
                          <p className='font-medium inline-block'>
                            <Icon as={BsGeoAltFill}/> {timeline.location}
                          </p>
                          <p>
                            <a className='font-medium'>Dress Code: </a>{timeline.dressCode}
                          </p>
                        </div>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                {/* )} */}
                </Popover>
              </div>
            ))}
          </SimpleGrid>
          <Popover trigger='hover'>
            <PopoverTrigger>
              <div className='flex flex-col items-center'>
              <Image className='mb-2' width={200} height={200} src='/asset/For_Timeline/SemesterST.svg' alt='Semester Begins' loading="lazy"/>
              <p className='bg-white rounded-full pt-1 pb-1 pl-3 pr-3 font-bold 
                      text-xs
                      sm:text-sm
                      md:text-base'>Semester Begins 🎉</p>
                <p className='mt-2 text-white font-semibold
                text-xs
                sm:text-sm
                md:text-base'>Aug 7</p>
              </div>
            </PopoverTrigger>
            <Portal>
              <PopoverContent className='rounded-3xl'>
                <PopoverArrow />
                <PopoverBody className='p-6'>
                  <div className='flex justify-between'>
                  <Image width={150} height={150} src='/asset/For_Timeline/SemesterST.svg' alt='Semester Begins' loading="lazy"/>
                  <a href='/asset/timeline_ics/Semester Begins.ics' download='Semester Begins.ics'>
                      <Image width={56} height={56} className='h-18 w-18' src='Add_to_Calendar_btn.svg' alt='Add to Calendar' loading="lazy"/>
                    </a>
                  </div>
                  <div className='flex flex-col'>
                  <h1 className='font-bold text-xl text-black'>Semester Begins 🎉</h1>
                  <p className='font-medium'>
                            Aug 7, 2023
                          </p>
                          <p className='font-medium inline-block'>
                            <Icon as={BsGeoAltFill}/> Faculty of ICT, Mahidol University
                          </p>
                          <p>
                            <a className='font-medium'>Dress Code: </a>Student Uniform
                          </p>
                  </div>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </div>
      </div>
    );
  };
  
  const timeline_elements = [
    {
      img_url:'/asset/For_Timeline/preppro.svg',
      event_name: 'Preparatory Program',
      day: 'Jul 3 - 31',
      dateTime: 'July 3 - 31, 2023',
      location: 'Faculty of ICT',
      dressCode: 'Proper W/ Blue Strap',
      calendarLink: 'Preparatory Program.ics',
    },
    {
      img_url:'/asset/For_Timeline/information ss.svg',
      event_name: 'Information Session',
      day: 'Jul 3',
      dateTime: 'July 3, 2023 10.30 a.m.-12 p.m.',
      location: 'Grand Auditorium, Faculty of ICT',
      dressCode: 'Proper',
      calendarLink: 'Information Session.ics',
    },
    {
      img_url:'/asset/For_Timeline/PLGT23_1.svg',
      event_name: 'PLGT23 Day 1 at Salaya',
      day: 'Jul 4',
      dateTime: 'July 4, 2023 9 a.m.-4 p.m.',
      location: 'Faculty of ICT',
      dressCode: 'Proper',
      calendarLink: 'PLGT23 Day 1 at Salaya.ics',
    },
    {
      img_url:'/asset/For_Timeline/PLGT23_2.svg',
      event_name: 'PLGT23 Day 2 at Amphawa',
      day: 'Jul 5',
      dateTime: 'July 5, 2023 9 a.m.-4 p.m.',
      location: 'Faculty of ICT',
      dressCode: 'Proper',
      calendarLink: 'PLGT23 Day 2 at Amphawa.ics',
    },
    {
      img_url: '/asset/For_Timeline/FP.svg',
      event_name: 'Fire Prevention and Control',
      day: 'Jul 6',
      dateTime: 'July 6, 2023 9 a.m.-4 p.m.',
      location: 'Grand Auditorium, Faculty of ICT',
      dressCode: 'Proper',
      calendarLink: 'Training Program for Fire Prevention and Control for ID66 Students.ics',
    },
    {
      img_url:'/asset/For_Timeline/PDPA.svg',
      event_name: 'PDPA Training',
      day: 'Jul 7',
      dateTime: 'July 7, 2023 9 a.m.-12 p.m.',
      location: 'Faculty of ICT',
      dressCode: 'Proper W/ Blue Strap',
      calendarLink: 'PDPA Training.ics',
    },
    {
      img_url:'/asset/For_Timeline/toefl-1 1.svg',
      event_name: 'TOEFL ITP (Round 1)',
      day: 'Jul 7',
      dateTime: 'July 7, 2023 1 p.m.-4 p.m.',
      location: 'Faculty of ICT',
      dressCode: 'Proper W/ Blue Strap',
      calendarLink: 'TOEFL ITP (Round 1).ics',
    },
    {
      img_url:'/asset/For_Timeline/xx.svg',
      event_name: 'Exemption Exam',
      day: 'Jul 18',
      dateTime: 'July 18, 2023 9 a.m.-12 p.m.',
      location: 'Faculty of ICT',
      dressCode: 'Proper W/ Blue Strap',
      calendarLink: 'Exemption Exam.ics',
    },
    {
      img_url:'/asset/For_Timeline/session 1.svg',
      event_name: 'Ethics Sessions',
      day: 'Jul 21',
      dateTime: 'July 21, 2023 1 p.m.-3 p.m.',
      location: 'Faculty of ICT',
      dressCode: 'Proper W/ Blue Strap',
      calendarLink: 'Ethics Sessions for ICT Students.ics',
    },
    {
      img_url:'/asset/For_Timeline/MUELT.svg',
      event_name: 'MU-ELT',
      day: 'Jul 22 - 23',
      dateTime: 'July 22 - 23, 2023',
      location: 'Faculty of ICT',
      dressCode: 'Depends',
      calendarLink: 'English Proficiency Test (MU-ELT).ics',
    },
    {
      img_url:'/asset/For_Timeline/rakNong.svg',
      event_name: 'Rak Nong',
      day: 'Jul 24 - 26',
      dateTime: 'July 24 - 26, 2023',
      location: 'Mahidol University',
      dressCode: 'Proper',
      calendarLink: 'Rak Nong.ics',
    },
    {
      img_url:'/asset/For_Timeline/toefl-1 2.svg',
      event_name: 'TOEFL ITP (Round 2)',
      day: 'Jul 25',
      dateTime: 'July 25, 2023 9 a.m. - 12 p.m.',
      location: 'Faculty of ICT',
      dressCode: 'Proper W/ Blue Strap',
      calendarLink: 'TOEFL ITP (Round 2).ics',
    },
    {
      img_url:'/asset/For_Timeline/ICTOR.svg',
      event_name: 'ICT Orientation',
      day: 'Jul 27',
      dateTime: 'July 27, 2023 1 p.m. - 3 p.m.',
      location: 'Grand Auditorium, Faculty of ICT',
      dressCode: 'Ceremonial',
      calendarLink: 'ICT Orientation.ics',
    },
    {
      img_url:'/asset/For_Timeline/MahidolOR.svg',
      event_name: 'Mahidol Orientation',
      day: 'July 31',
      dateTime: 'July 31, 2023 9 a.m. - 12 p.m.',
      location: 'Prince Mahidol Hall',
      dressCode: 'Ceremonial',
      calendarLink: 'Mahidol Orientation.ics',
    },
    {
      img_url:'/asset/For_Timeline/WF.svg',
      event_name: 'Welcome Freshy',
      day: 'Aug 6',
      dateTime: 'August 6, 2023 8.30 a.m. - 12 p.m.',
      location: 'Faculty of ICT',
      dressCode: 'Proper or Harry Potter Theme',
      calendarLink: 'Welcome Freshy.ics',
    },
    {
      img_url:'/asset/For_Timeline/srh.svg',
      event_name: 'Sairahus',
      day: 'Aug 6',
      dateTime: 'August 6, 2023 1 p.m. - 4 p.m.',
      location: 'Faculty of ICT',
      dressCode: 'Proper',
      calendarLink: 'Sairahus.ics',
    },
  ]