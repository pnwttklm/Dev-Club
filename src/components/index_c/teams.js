import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { TeamsScene } from '../landing/teams-scene';

const cardStyle = {
  bg: "bg.inverted", color: "fg.inverted", p: "6", minW: "0",
  borderRadius: "16px", border: "2px solid var(--team-accent)",
};
const accent = team => ({ '--team-accent': `var(--chakra-colors-${team.color.replace('.', '-')})` });

function TeamContent({ team }) {
  return <div data-team-content>
    <Image src={team.imgSrc} width={1000} height={1000} alt="" className="team-illustration w-full object-contain" />
    <div data-team-copy>
      <Box as="h3" bg={team.color} color={team.foreground || "white"} fontWeight="400">{team.name}</Box>
      <p>{team.des}</p>
      <p>Tools: {team.tools}</p>
    </div>
  </div>;
}

export default function Teams() {
  return <TeamsScene>
    <h2 id="teams-heading">Teams</h2>
    <div data-teams-grid role="region" aria-labelledby="teams-heading" data-lenis-prevent>
      {qElement.map(team => <div key={team.name} data-team-slot style={accent(team)}>
        <Box as="article" data-team-card={team.name} {...cardStyle}>
          <TeamContent team={team} />
        </Box>
        <div data-team-placeholder aria-hidden="true">
          <div data-team-back-art>
            <Image src="/logo_ww.svg" width={160} height={75} loading="eager" alt="" />
            <span>{team.name}</span>
          </div>
        </div>
      </div>)}
    </div>
    <div data-team-presentation-layer aria-hidden="true">
      {qElement.map(team => <Box key={team.name} data-team-presentation={team.name} className="team-presentation" style={accent(team)} {...cardStyle} bg="transparent" borderColor="transparent">
        <div data-team-presentation-frame />
        <TeamContent team={team} />
      </Box>)}
    </div>
    <div data-team-controls role="group" aria-label="Choose a team">
      {qElement.map((team, index) => <button key={team.name} type="button" data-team-dot={index} aria-label={`Show ${team.name}`} aria-current={index === 0 ? "true" : "false"} style={accent(team)}><span /></button>)}
    </div>
  </TeamsScene>;
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

