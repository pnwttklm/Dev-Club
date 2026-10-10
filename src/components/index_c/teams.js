import Image from "next/image";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { TeamsScene } from '../landing/teams-scene';

export default function Teams() {
  return (
    <TeamsScene><h2>Teams</h2><SimpleGrid data-teams-grid columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }} gap="6" mt="10">
      {qElement.map(team => (
        <Box as="article" key={team.name} data-team-card={team.name} style={{ '--team-accent': `var(--chakra-colors-${team.color.replace('.', '-')})` }} bg="bg.inverted" color="fg.inverted" p={{ base: '4', '2xl': '3' }} minW="0" borderRadius="16px" border="2px solid var(--team-accent)">
          <div data-team-back aria-hidden="true">
            <div data-team-back-art><Image src="/logo_ww.svg" width={160} height={75} loading="eager" alt="" /><span>{team.name}</span></div>
          </div>
          <div data-team-content>
          <Image src={team.imgSrc} width={1000} height={1000} alt="" className="team-illustration w-full object-contain" />
          <div data-team-copy>
          <Box as="h3" bg={team.color} color={team.foreground || "white"} fontWeight="400">{team.name}</Box>
          <p>{team.des}</p>
          <p>Tools: {team.tools}</p>
          </div>
          </div>
        </Box>
      ))}
    </SimpleGrid></TeamsScene>
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
        foreground: 'black', tools: 'JS, TS, Express',
      },
      {
        name: 'DESIGN & ART',
        imgSrc: '/daLogo.svg',
        color: 'role.design',
        des: 'Follow Your Heart to a World of Beauty and Tranquility. Explore Inspiring Creations and Express Your Inner Artist.',
        foreground: 'black', tools: 'Adobe Illustrator, Figma',
      },
      {
        name: 'Quality Assurance',
        imgSrc: '/qaLogo.svg',
        color: 'role.qa',
        des: 'Test and refine projects to help the team identify problems and improve how the software works.',
        foreground: 'black', tools: '-',
      },
]

