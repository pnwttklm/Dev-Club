'use client'
import {
    Icon,
    Button
} from '@chakra-ui/react'
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
          loading="lazy"
          src="https://my.spline.design/untitledcopycopy-3d9f2f0a66920c69f75b6915da72b96d/"
          frameBorder="0"
          title='Sairahus 3D'
        />
  
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          className="flex flex-col mb-5 w-10/12 md:w-1/2 justify-center text-center text-white gap-10"
        >
          <h1
            className=" m-4  font-semibold text-center
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
            className="flex flex-col font-normal gap-10
                  text-sm
                  md:text-base
                  xl:text-lg"
          >
            <p>
              {description}
            </p>
          </div>
          <a href='/asset/timeline_ics/Sairahus.ics' download='Welcome Freshy.ics' className='font-semibold text-[#00FF66] hover:text-[#F5F5F7]'>Add to your calendar<Icon className='ml-2' as={BsCalendarPlus}/></a>
          <div>
            <Button
              className="mt-4 rounded-full text-[#1D1D1F] bg-[#00ff66] hover:text-[#1D1D1F] hover:bg-[#FFFFFF]"
              size={{ base: "sm", md: "lg" }}
            >
               <a href='/forms/SRHR' target='_blank'>Register</a>
            </Button>
          </div>
        </motion.div>
      </>
    );
  }
  