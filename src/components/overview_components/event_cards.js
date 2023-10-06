"use client";
import Image from "next/image";

import { Button, Icon } from "@chakra-ui/react";

// framer motion
import { motion } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: [0.5, 1], y: 0 },
};

export default function ({ topic, info, link, img, date1, date2, type }) {
  return (
    <motion.a
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      href={link}
      className="flex p-6 w-9/12 h-full outline outline-2 text-white text-center justify-center items-center rounded-[56px] gap-6
        flex-col
        md:flex-row
        md:outline-4
        md:text-left
        md:w-7/12"
    >
      <Image
        width={200}
        height={200}
        className=" w-40 h-40"
        alt={`${topic} logo`}
        src={img}
        loading="lazy"
      />
      <div
        className="flex flex-col gap-4 
          items-center
          md:items-start"
      >
        <h1
          className="font-semibold
            text-2xl
            md:text-4xl"
        >
          {topic}
        </h1>
        <p
          className=" font-medium 
            text-base
            md:text-xl"
        >
          {info}
        </p>
        {type === 1 && (
          <>
            <p className="text-gray-500">{date1}</p>
            <Button
              className=" w-fit rounded-xl font-semibold hover:text-black"
              size={{ base: "sm", md: "lg" }}
              variant="outline"
            >
              Learn more<Icon m="1" as={BsArrowUpRight}></Icon>
            </Button>
          </>
        )}
        {type === 2 && (
          <>
            <div className="grid grid-rows-1 grid-flow-col gap-4">
              <div
                className=" font-normal flex flex-col gap-1
                  text-sm
                  md:text-base"
              >
                <h2>Salaya Day</h2>
                <p className=" text-gray-500">{date1}</p>
              </div>
              <div
                className=" font-normal flex flex-col gap-1
                  text-sm
                  md:text-base"
              >
                <h2>Amphawa Day</h2>
                <p className="text-gray-500">{date2}</p>
              </div>
            </div>
            <Button
              className=" w-fit rounded-xl font-semibold hover:text-black"
              size={{ base: "sm", md: "lg" }}
              variant="outline"
            >
              Learn more<Icon m="1" as={BsArrowUpRight}></Icon>
            </Button>
          </>
        )}
      </div>
    </motion.a>
  );
}
