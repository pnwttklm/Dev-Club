'use client'

import { useState, useEffect } from "react";
import {
    Text,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: [0.5, 1], y: 0 },
  };

const ExpiredNotice = () => {
    return (
        <motion.a 
        variants={fadeInUp} 
        initial='hidden'
        whileInView='show'
        className='flex w-screen text-white text-center justify-center items-center'
        >
        <div className='p-16'>
            <Text fontSize='6xl' className='p-6 rounded-3xl font-bold size-3xl outline outline-2'>IT</Text>
            <h1 className='mt-3 font-semibold size-3xl'>DAYS</h1>
        </div>
         <div className='p-16'>
            <Text fontSize='6xl' className='p-6 rounded-3xl font-bold size-3xl outline outline-2'>IS</Text>
            <h1 className='mt-3 font-semibold size-3xl'>HOURS</h1>
        </div>
        <div className='p-16'>
            <Text fontSize='6xl' className='p-6 rounded-3xl font-bold size-3xl outline outline-2'>ABOUT</Text>
            <h1 className='mt-3 font-semibold size-3xl'>MINUTES</h1>
            </div>
        <div className='p-16'>
            <Text fontSize='6xl' className='p-6 rounded-3xl font-bold size-3xl outline outline-2'>TIME</Text>
            <h1 className='mt-3 font-semibold size-3xl'>SECONDS</h1>
        </div>
        </motion.a>


    );
  };
  
  const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="show-counter">
        <motion.a 
        variants={fadeInUp} 
        initial='hidden'
        whileInView='show'
        className='flex text-white text-center justify-center items-center'
        >
          <DateTimeDisplay value={days} type={'DAYS'} isDanger={false} />
          <DateTimeDisplay value={hours} type={'HOURS'} isDanger={false} />
          <DateTimeDisplay value={minutes} type={'MINUTES'} isDanger={false} />
          <DateTimeDisplay value={seconds} type={'SECONDS'} isDanger={false} />
        </motion.a>
      </div>
    );
  };
  
export default function CountdownTimer({ targetDate }) {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);
  
    if (days + hours + minutes + seconds <= 0) {
      return <ExpiredNotice />;
    } else {
      return (
        <ShowCounter
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      );
    }
  };
  
  const DateTimeDisplay = ({ value, type, isDanger }) => {
    if(value%10===value){
        value = "0" + value;
    }
    return (
      
      <div className={isDanger ? 'countdown danger' : 'countdown'}>
        <div className='p-3 md:p-12'>
          <h1 className=' rounded-3xl outline
          pb-8 pt-8 pl-4 pr-4
          font-medium md:font-bold  
          outline-2 md:outline-4
          text-2xl md:text-6xl'>
            {value}
          </h1>
          <h1 className='mt-3 font-semibold
            text-xs md:text-base'
          >
            {type}
          </h1>
        </div>
      </div>
    );
  };
  

  const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();
  
    const [countDown, setCountDown] = useState(
      countDownDate - new Date().getTime()
    );
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
      }, 1000);
  
      return () => clearInterval(interval);
    }, [countDownDate]);
  
    return getReturnValues(countDown);
  };
  
  const getReturnValues = (countDown) => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  
    return [days, hours, minutes, seconds];
  };
