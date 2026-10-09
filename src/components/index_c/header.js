import Image from "next/image";
import { SimpleGrid } from "@chakra-ui/react";

export default function Header() {
  return (
    <section id="about" className="landing-section hero">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 10 }} alignItems="center">
        <Image src="/head_banner.svg" width={1000} height={1000} alt="" priority className="w-full" />
        <div>
          <h1>Did someone tell you that your knowledge cannot be implemented in real-world problems? <em>They were wrong!</em></h1>
          <p className="mt-8 text-xl leading-relaxed">At Dev Club ICT Mahidol, we believe that knowledge can be applied to real-world problems. We are a sandbox for everyone to learn, try ideas, and experience working in software development. Alongside developers, we welcome other important roles such as Quality Assurance, UX/UI Design, and Art. We cannot wait to see you here.</p>
        </div>
      </SimpleGrid>
    </section>
  );
}
