import Image from "next/image";
import { SimpleGrid } from "@chakra-ui/react";
import { BenefitsScene } from '../landing/benefits-scene';

export default function WhyUs() {
  return (
    <BenefitsScene><h2>Why Us?</h2><SimpleGrid
      data-benefits-grid columns={{ base: 1, md: 2, lg: 3 }}
      w="full" maxW="88rem" mx="auto" gap="10" mt="10"
      css={{ '& > [data-benefit-card]:last-child': {
        gridColumn: { mdOnly: '1 / -1' },
        width: { mdOnly: 'calc((100% - var(--chakra-spacing-10)) / 2)' },
        justifySelf: { mdOnly: 'center' },
      } }}
    >
      {qElement.map(benefit => (
        <article key={benefit.name} data-benefit-card className="p-4 lg:p-6">
          <Image src={benefit.imgSrc} width={500} height={500} alt="" className="h-[280px] lg:h-[320px] w-full object-contain" />
          <h3 className="mt-8 text-3xl lg:text-4xl leading-tight font-normal text-left">
            {benefit.name.split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h3>
          <p className="mt-6 text-lg lg:text-xl leading-relaxed text-left">{benefit.des}</p>
        </article>
      ))}
    </SimpleGrid></BenefitsScene>
  );
}

  const qElement = [
    {
      name: 'ACADEMIC \nGROWTH',
      imgSrc: '/whyUs/ag.svg',
      des: 'Dev Club often explore topics and technologies that may not be covered in your regular coursework. This can broaden your knowledge and give you a more well-rounded education.',
    },
    {
        name: 'EXPANDED \nCOMMUNITY',
        imgSrc: '/whyUs/ec.svg',
        des: 'Working with peers in Dev Club setting can improve your teamwork and communication skills. Collaboration is an essential skill in both academia and the professional world.',
      },
      {
        name: 'ENHANCED \nEXPERIENCE',
        imgSrc: '/whyUs/ee.svg',
        des: 'Being part of a Dev Club often involves working on real projects and practical coding tasks. This hands-on experience can deepen your understanding of programming languages and concepts.',
      },
      
]

