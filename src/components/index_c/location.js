import Image from "next/image";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { BsArrowUpRight } from "react-icons/bs";

export default function Location() {
  return (
    <Box bg="black" color="white" p={{ base: 6, md: 10, lg: 16 }} mt="8">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 12 }} alignItems="center">
        <a
          href="https://www.ict.mahidol.ac.th/en/contact-us/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full overflow-hidden border border-white/20 bg-black transition-opacity hover:opacity-90"
          aria-label="Faculty of ICT Mahidol University Contact Us"
        >
          <Image
            src="/ICT-mahidol.jpg"
            width={1280}
            height={748}
            alt="Faculty of ICT, Mahidol University"
            className="h-auto w-full object-cover"
          />
        </a>
        <div className="flex flex-col items-start justify-center">
          <p className="text-2xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white wrap-break-word">
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
