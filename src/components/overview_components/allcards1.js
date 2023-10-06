"use client";
import Image from "next/image";
import { SimpleGrid, Icon, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";

export default function () {
  return (
    <div className="flex flex-col h-full w-full justify-center items-center bg-[#EDEDED]">
      <SimpleGrid
        columns={[1, 1, 2]}
        spacing={10}
        className="py-10 p-2
        md:w-full
        xl:w-2/3"
      >
        <motion.a
          href="https://mycourses.ict.mahidol.ac.th/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          target="_blank"
          
        >
          <Image
            width={1000}
            height={1000}
            src="/cards/mycourse.webp"
            alt="mycourse card"
            className="rounded-3xl"
            // loading="lazy"
          />
        </motion.a>

        <motion.a
          href="https://smartedu.mahidol.ac.th/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          target="_blank"
        >
          <Image
            width={1000}
            height={1000}
            src="/cards/smartedu.webp"
            alt="smartEDU card"
            className="rounded-3xl"
            // loading="lazy"
          />
        </motion.a>

        <SimpleGrid columns={1} spacing={10}>
          <motion.a
            href="https://mux.mahidol.ac.th"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            target="_blank"
          >
            <Image
              width={1000}
              height={1000}
              src="/cards/mux.webp"
              alt="mux card"
              className="rounded-3xl"
              // loading="lazy"
            />
          </motion.a>
          <motion.a
            href="https://online.ict.mahidol.ac.th/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            target="_blank"
          >
            <Image
              width={1000}
              height={1000}
              src="/cards/online.webp"
              alt="online card"
              className="rounded-3xl"
              // loading="lazy"
            />
          </motion.a>
        </SimpleGrid>

        <motion.a
          href="https://student.ict.mahidol.ac.th"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          target="_blank"
        >
          <Image
            width={1000}
            height={1000}
            className="h-full w-full bg-white rounded-3xl"
            src="/cards/studentportal.webp"
            alt="studentPortal card"
            // loading="lazy"
          />
        </motion.a>

        <motion.a
          href="https://softwaredownload.mahidol"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          target="_blank"
        >
          <Image
            width={1000}
            height={1000}
            src="/cards/softwaredownload.webp"
            alt="software download card"
            className="rounded-3xl"
            // loading="lazy"
          />
        </motion.a>

        <motion.a
          href="https://www.music.mahidol.ac.th/salayalink/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          target="_blank"
        >
          <Image
            width={1000}
            height={1000}
            src="/cards/sayink.webp"
            alt="Salaya Link card"
            className="rounded-3xl"
            // loading="lazy"
          />
        </motion.a>

        <motion.a
          href="https://mahidol.ac.th/aqireport/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          target="_blank"
        >
          <Image
            width={1000}
            height={1000}
            src="/cards/aqi.webp"
            alt="AQI report card"
            className="rounded-3xl"
            // loading="lazy"
          />
        </motion.a>

        <a>
          <Image
            width={1000}
            height={1000}
            src="/cards/comingsoon.webp"
            alt="comingsoon card"
            className="rounded-3xl"
            // loading="lazy"
          />
        </a>

        <div className=" min-w-full h-full w-full pt-12 pb-12 flex justify-center items-end rounded-3xl bg-cover bg-center bg-no-repeat gap-3" style={{ backgroundImage: `url('/cards/wemahidol.webp')`}}>
          <div className="h-[400px]"/>
          <motion.a
          href="https://apps.apple.com/us/app/we-mahidol/id1425003959?itsct=apps_box_badge&amp;itscg=30200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          target="_blank"
          >
            <Image
              width={640}
              height={190}
              alt="Download on the App Store"
              src="https://apple-resources.s3.amazonaws.com/media-badges/download-on-the-app-store/black/en-us.svg"
              // loading="lazy"
              className="z-10 w-32 h-10"
            />
          </motion.a>
          <motion.a
          href="https://play.google.com/store/apps/details?id=th.ac.mahidol.SCBxMU.WeMahidol&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          target="_blank"
          >
            <Image
              width={2560}
              height={754}
              alt="Get it on Google Play"
              src="/cards/GooglePlay_badge.webp"
              // loading="lazy"
              className=" w-32 h-10"
            />
          </motion.a>
        </div>

        <motion.a
          href="https://www3.ict.mahidol.ac.th/building/checkin/ATKSubmit/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          target="_blank"
        >
          <Image
            width={1000}
            height={1000}
            src="/cards/atk.webp"
            alt="ATK Swap card"
            className="rounded-3xl"
            // loading="lazy"
          />
        </motion.a>
      </SimpleGrid>
      <div
        className="flex flex-col justify-center items-center
        md:w-full
        xl:w-2/3"
      >
        <a>
          <Image
            width={2000}
            height={2000}
            src="/cards/roomreserve.svg"
            alt="room reserved card"
            // loading="lazy"
            className="rounded-3xl p-[10px]"
          />
        </a>
        <a href="/mahidolMap.png">
          <div className="relative flex items-center justify-center">
            <Image
              width={2000}
              height={2000}
              className="p-[10px] rounded-3xl"
              src="/cards/map.webp"
              alt="Map"
              // loading="lazy"
            />
            <Button
              className="absolute mt-32 bg-white font-medium rounded-xl hover:text-[#f5f5f7] hover:bg-[#1D1D1F] active:bg-[#00FF66]"
              size={["xs", "sm", "md", "lg"]}
            >
              Get Mahidol Map
              <Icon m="1" as={BsArrowUpRight}></Icon>
            </Button>
          </div>
        </a>
      </div>
      <p
        className="py-10 px-2 text-[#4A4A4A] text-center
            text-xs
            sm:text-sm
            md:text-lg"
      >
        Some websites may not be available for all internet network or at the
        released time.
      </p>
    </div>
  );
}
