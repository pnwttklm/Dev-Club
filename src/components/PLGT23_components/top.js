'use client'

import {Icon} from '@chakra-ui/react'
import {BsCalendarPlus} from 'react-icons/bs'
import { motion } from 'framer-motion'
const fadeInUp = {
    hidden: { opacity:0, y:50 },
    show: { opacity:[0.5,1], y:0 },
}

export default function TopElement({ event_name , date, description}) {
    return (
      <>
        <motion.iframe
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          className="w-full h-[500px]"
          src="https://my.spline.design/handlecopycopycopy-db34e99b67c67fd7920e9af25e46b9d3/"
          frameBorder="0"
          title='PLGT23 3D'
        />
  
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          className="flex flex-col mb-5 w-10/12 md:w-1/2 justify-center text-center text-white gap-10"
        >
          <h1
            className=" m-4 font-semibold text-center
                text-4xl
                md:text-5xl
                xl:text-6xl"
          >
            {event_name}
          </h1>
          <p
            className=" font-medium
                text-2xl
                md:text-3xl
                xl:text-4xl"
          >
            {date}
          </p>
          <div
            className="flex flex-col font-normal
                  text-sm
                  md:text-base
                  xl:text-lg"
          >
            <p>
              {description}
            </p>
          </div>
          {/* <div> */}
            {/* <Button
              className="mt-4 m-1 rounded-3xl lg:rounded-r-sm md:rounded-r-sm text-[#1D1D1F] bg-[#00ff66] hover:text-[#1D1D1F] hover:bg-[#FFFFFF]"
              size={{ base: "sm", md: "lg" }}
            > */}
              <a href='/asset/timeline_ics/PLGT23 Day 1 at Salaya.ics' download='PLGT23 Day 1 at Salaya.ics' className='font-semibold text-[#00FF66] hover:text-[#F5F5F7]'>Add Day 1 to calendar
                <Icon className='ml-2' as={BsCalendarPlus}/>
              </a>
            {/* </Button>
            <Button
              className="mt-4 m-1 rounded-3xl lg:rounded-l-sm md:rounded-l-sm text-[#1D1D1F] bg-[#00ff66] hover:text-[#1D1D1F] hover:bg-[#FFFFFF]"
              size={{ base: "sm", md: "lg" }}
            > */}
              <a href='/asset/timeline_ics/PLGT23 Day 2 at Amphawa.ics' download='PLGT23 Day 2 at Amphawa.ics' className='font-semibold text-[#00FF66] hover:text-[#F5F5F7]'>Add Day 2 to calendar<Icon className='ml-2' as={BsCalendarPlus}/></a>
            {/* </Button> */}
          {/* </div> */}
        </motion.div>
      </>
    );
  }
  