import Image from "next/image";
import { Box, SimpleGrid } from "@chakra-ui/react";

export default function Teams() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }} gap="6" mt="10">
      {qElement.map(team => (
        <Box as="article" key={team.name} bg="bg.inverted" color="fg.inverted" p="6" minW="0">
          <Image src={team.imgSrc} width={1000} height={1000} alt="" className="h-[200px] w-full object-contain" />
          <Box as="h3" bg={team.color} color={team.foreground || "white"} fontSize="3xl" lineHeight="1.25" fontWeight="400" mt="6" mb="4">{team.name}</Box>
          <p className="text-xl leading-relaxed">{team.des}</p>
          <p className="mt-4 text-xl leading-relaxed">Tools: {team.tools}</p>
        </Box>
      ))}
    </SimpleGrid>
  );
}

  const qElement = [
    {
      name: 'FRONTEND WEB',
      imgSrc: '/fwLogo.svg',
      color: 'role.frontend',
      des: 'Elevate Your Design Game. Dive into the Future of Web Development. Stay Ahead with Stunning and Innovative Designs.',
      foreground: 'black', tools: 'React, Next.js',
    },
    {
        name: 'FRONTEND APP',
        imgSrc: '/faLogo.svg',
        color: 'role.mobile',
        des: 'Explore the Future of Mobile Apps! Discover the Next Level of Innovation and Convenience. Join Us in Pushing Boundaries.',
        tools: 'Dart, Flutter',
      },
      {
        name: 'BACKEND',
        imgSrc: '/bnLogo.svg',
        color: 'role.backend',
        des: 'The Backbone Behind Every Project. Managing data, securing information, and delivering smooth functionality, it\'s the invisible force that keeps everything running seamlessly.',
        tools: 'JS, TS, Express',
      },
      {
        name: 'DESIGN & ART',
        imgSrc: '/daLogo.svg',
        color: 'role.design',
        des: 'Follow Your Heart to a World of Beauty and Tranquility. Explore Inspiring Creations and Express Your Inner Artist.',
        tools: 'Adobe Illustrator, Figma',
      },
      {
        name: 'Quality Assurance',
        imgSrc: '/qaLogo.svg',
        color: 'role.qa',
        des: 'Test and refine projects to help the team identify problems and improve how the software works.',
        foreground: 'black', tools: '-',
      },
]

