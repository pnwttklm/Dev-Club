import Image from "next/image";
import { Box, SimpleGrid } from "@chakra-ui/react";

export default function Location() {
  return (
    <Box bg="bg.inverted" color="fg.inverted" p={{ base: 6, md: 8 }} mt="8">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="10" alignItems="center">
        <Image src="/location-placeholder.svg" width={640} height={400} alt="" className="w-full" />
        <p className="text-xl leading-relaxed md:text-2xl">Room IT210 at the Faculty of ICT, Mahidol University appears in older site content. The current club room is unconfirmed.</p>
      </SimpleGrid>
    </Box>
  );
}
