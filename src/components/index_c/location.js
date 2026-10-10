import Image from "next/image";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { BsArrowUpRight } from "react-icons/bs";

export default function Location() {
  return (
    <Box bg="black" color="white" p={{ base: 6, md: 10, lg: 16 }} mt="8">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 12 }} alignItems="center">
        <div className="w-full overflow-hidden border border-white/20 bg-black">
          <Image
            src="/location-placeholder.svg"
            width={1000}
            height={1000}
            alt="ICT Building"
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text-2xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white break-words">
            Dev Club is currently located at room IT210
            <br />
            Faculty of ICT, Mahidol University
          </p>
          <a
            href="https://maps.app.goo.gl/QgykA6nfCLHqc7Mh6"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 sm:mt-8 inline-flex items-center gap-2 border-2 border-white bg-white px-5 py-3 sm:px-6 sm:py-4 text-lg sm:text-xl font-medium text-black transition-colors hover:bg-black hover:text-white"
          >
            <BsArrowUpRight className="text-xl" />
            <span>Open in Map</span>
          </a>
        </div>
      </SimpleGrid>
    </Box>
  );
}
