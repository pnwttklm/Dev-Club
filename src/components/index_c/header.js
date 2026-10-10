import Image from "next/image";
import { SimpleGrid } from "@chakra-ui/react";
import { MotionToggle } from '../landing/motion-provider';
import { TerminalHeadline } from '../landing/terminal-headline';

export default function Header() {
  return (
    <section id="about" className="landing-section hero">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 10 }} alignItems="center">
        <Image src="/head_banner.svg" width={1000} height={1000} alt="" priority className="w-full" />
        <div>
          <h1><TerminalHeadline sentence="Did someone tell you that your knowledge cannot be implemented in real-world problems?" response="They were wrong!" /></h1>
          <p className="mt-8 text-xl leading-relaxed">At MUICT Dev Club, we believe that knowledge can be applied to real-world problems. We are a sandbox for everyone to learn, try ideas, and experience working in software development. Alongside developers, we welcome other important roles such as Quality Assurance, UX/UI Design, and Art. We cannot wait to see you here.</p>
          <MotionToggle />
        </div>
      </SimpleGrid>
    </section>
  );
}
