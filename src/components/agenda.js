'use client'
import {
  Image,
} from '@chakra-ui/react'

export default function agenda({ whichEvent }) {
  const event = '/asset/forAgenda/'+ whichEvent +'.svg'
  // const notA = '/asset/forAgenda/notA.svg'
  return(
    <>
      <div className="flex flex-col w-screen h-full bg-[#EDEDED] p-16 items-center">
        <h1 className='text-2xl md:text-4xl font-bold text-black items-center pb-14'>AGENDA</h1>
        <Image width={200}
          height={200}
          className="w-full h-full pl-1 pr-1 md:pl-36 md:pr-36"
          src={event}
          loading="lazy"/>
      </div>
    </>
  )
  
  }