'use client'
import Link from "next/link"
import { BsArrowUpRight } from "react-icons/bs"

// h-[900px] w-[1026px]

const ict = ({ firsthalfName, secondhalfName, link, image, description }) => {
  return (
    <>
      <div
          className=" bg-cover bg-top bg-no-repeat rounded-3xl
            w-full
            h-full
            md:h-3/4 
            md:w-3/4" 
          style={{ backgroundImage: `url(${image})` }}
      >
        <div className=" bg-black/40 h-full rounded-3xl">
          <div className="  h-full justify-between flex flex-col w-full p-8 gap-10
          md:p-16
          md:w-4/6
          md:gap-32">
            <h1 className=" text-white text-xl md:text-4xl font-bold leading-normal">{firsthalfName}<br/>{secondhalfName}</h1>
            <p className="text-white text-base md:text-xl font-normal ">
              {description}
            </p>
            <Link href={link}><button className=" w-fit p-2 text-black font-semibold text-sm md:text-lg bg-[#00FF66] rounded-xl hover:bg-white transition-all duration-200">
              Open Google Map
              <BsArrowUpRight className="ml-1 inline-block"/>
            </button></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ict