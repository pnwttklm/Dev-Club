"use client";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BsChevronLeft, BsChevronRight,  } from "react-icons/bs";
import { useState } from "react";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import Image from "next/image";
// import styles from '@/app/global.css'

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function CaptionCarousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "45%", md: "45%" });
  const side = useBreakpointValue({ base: "10%", md: "40px" });

  // This list contains all the data for carousels
  // This can be static or loaded from a server

  const cards = [
    {
      name: "Napatkrit Asavarojpanich",
      pos: 'Vice President ICT#20',
      ig: 'napatkrit',
      text: '"Everything comes at a cost. And if you aspire to things that most could never dream of, then naturally, there will be an unimaginable price to pay." - Genshin Impact',
      image:
      '/msgcard/kung1.webp'    
    },
    {
      name: "Thanachot Onlamoon",
      pos: 'Vice Technology Director, ICT#20',
      ig: '__abbc',
      text: "อย่าลืมไปลอง Shindo Ramen หน้าประตู 5 นะครับ",
      image:
      '/msgcard/bb1.webp'    
    },
    {
      name: "Arus Thienmee",
      pos: 'Website Copy Writer, ICT#20',
      ig: 'arus_candlrhav',
      text: "Ok juniors, if you manage to face a subject called `Discrete Structure`, do not dare to lose your concentration while studying. Another thing, I highly recommend you to take the English class exemption and study Technical English  3 instead of 1 since it will save your time. p.s. kao mok kai todd at faculty of social science canteen is POG"
      ,
      image:
      '/msgcard/arus1.webp'
    },
    {
      name: "Natchapol Mingmahaphan",
      pos: 'President, ICT#20',
      ig: 'nnatcha.g',
      text: "หนีไปลูกผึ้ง หนีไป ผึ้งงง หนีไปปปปปป",
      image:
      '/msgcard/golf1.webp'    
    },
    {
      name: "Jarukit Buntheangjai",
      pos: 'ICT#20',
      ig: 'tatajarukit',
      text: "อยากทำไรแล้วไม่เดือดร้อนใครก็ทำเลย ใช้ชีวิตมหาลัยให้ตัวเองจบไปแล้วไม่เสียดาย",
      image:
      '/msgcard/tata1.webp'    
    },
    {
      name: "Poonyawatt Klumnaim",
      pos: 'Technology Director, ICT#20',
      ig: '_pnwttklm',
      text: "Studying in university has taught me one unforgettable lesson: Opportunity doesn't come easily, so grab it before you lose it.",
      image:
      '/msgcard/poon.webp'    
    },
    {
      name: "Ornjira Korsakpaisarn",
      pos: 'Secretary, ICT#20',
      ig: 'ornjiriiii_',
      text: "Welcome to ICT 21 ขอให้น้องๆทุกคนเรียนอย่างมีความสุข ไม่เจ็บไม่ป่วยแข็งแรง อย่าปวดหลัง!",
      image:
      '/msgcard/aj1.webp'    
    },
    {
      name: "Eakbodin Kanjanamuengthong",
      pos: 'Website Content, ICT#20',
      ig: 'sunshinw_tang',
      text: "ชีวิตที่มีปิดเทอมของคุณเหลืออีกแค่ 4 ปี ดังนั้น อยากทำอะไรก็ทำ",
      image:
      '/msgcard/tang1.webp'    
    },
    {
      name: "Jakkaphat Jumratboonsom",
      pos: 'ICT#20',
      ig: 'mingtar_',
      text: "การนอนเป็นเรื่องสำคัญมีโอกาสเมื่อไหร่ก็นอนเถอะก่อนจะไม่ได้นอน",
      image:
      '/msgcard/mt1.webp'    
    },
    {
      name: "Kritin Chitchobtham",
      pos: 'ICT#20',
      ig: 'tetee_kritin',
      text: "ที่คณะมีเต่าบิน หลอดชอบหมด แอร์ก็โคตรหนาว แต่อย่างน้อยก็มีโต๊ะปิงปอง",
      image:
      '/msgcard/tetee1.webp'    
    },
    {
      name: "Jakguy Boriboon",
      pos: 'ICT#20',
      ig: 'jakguyboribye',
      text: "อย่าลืม gcc 6688XXX_qx.c -o main && ./main",
      image:
      '/msgcard/jakguy1.webp'    
    },
    {
      name: "Raweerot Bhasidhchirapiroch",
      pos: 'ICT#20',
      ig: 'hoylordzbaby',
      text: "Respect your decision. Do the best you can. And let your potential be exploded as possible.",
      image:
      '/msgcard/sunny.webp'    
    },
    {
      name: "Nithimeth Mandee",
      pos: 'ICT#20',
      ig: 'sea.ntxm.c',
      text: "ปี1เทอม1สบายสุดแล้ว ใช้ชีวิตซะ และอย่าลืมหาเพื่อนที่แบกได้ เมื่อเหนื่อยเมื่อท้อ พี่จะรออยู่ตั้งสิน",
      image:
      '/msgcard/c.webp'
    },
    {
      name: "Pathompum Jirakarnpaisan",
      pos: 'ICT#20',
      ig: '_ppoom.jr',
      text: "เรียนมาก็ปีกว่า รู้แค่ท่าสาวบางโพ แต่แดดแต๊ดแด๊ดแต่ดแต้แดแด่ด~",
      image:
      '/msgcard/poom.webp'
    },
    {
      name: "Announcement",
      pos: 'Dev Team',
      ig: 'muict_studentactivities',
      text: <>
      <p>ใครอยากบอกอะไรกับน้อง ๆ คลิกปุ่มด้านล่างหรือสแกน QR Code เลย</p>
      <Button
              className="mt-4 rounded-full text-[#1D1D1F] bg-[#00ff66] hover:text-[#1D1D1F] hover:bg-[#FFFFFF]"
              size={{ base: "sm", md: "lg" }}
            >
               <a href='https://forms.gle/rmdx8zsdeyFDfJe56' target='_blank'>Send Message</a>
      </Button>
      </>
      
      ,
      image:
      '/msgcard/qrc.webp'    
    },
  ];

  return (
    <Box
      position={"relative"}
      height={"full"}
      width={"full"}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="solid"
        className="bg-[#1D1D1F] text-[#F5F5F7] hover:bg-[#FFFFFF] hover:text-[#000000] rounded-full"
        // colorScheme='whiteAlpha'
        position="absolute"
        left={side}
        top={top}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BsChevronLeft className='p-2' size="36px" />
      </IconButton> 
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="solid"
        className="bg-[#1D1D1F] text-[#F5F5F7] hover:bg-[#FFFFFF] hover:text-[#000000] rounded-full"
        // colorScheme='whiteAlpha'
        position="absolute"
        right={side}
        top={top}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BsChevronRight className='p-2' size="36px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <div key={index}>
            <div className="flex justify-center items-center xl:p-20 md:p-0 border-solid border-4 border-[#FFFFFF29] rounded-3xl
              flex-col
              md:flex-row"
            >

            <Image height={200} width={300} className="h-84 w-84 md:h-fit md:w-fit" src={card.image} alt={`${card.name} logo`} loading="lazy"/>
            <div className="flex flex-col justify-center items-center text-white">
              <div className="flex justify-start w-full m-2 md:m-16">
                <Image className="h-5 w-8 md:h-fit md:w-fit ml-6" height={72} width={72} src="/quote.opening.svg" alt="quote opening img" loading="lazy" />
              </div>
              <div className="flex items-center justify-center text-sm md:text-xl">
                <h1 className="text-left text-sm font-semibold">{card.name}</h1>
                <h1 className="text-[#FFFFFF80] text-sm">—{card.pos}</h1>
              </div>
              <div>
              {/* <a href={`https://www.instagram.com/${card.ig}`}> */}
                  <h1 className="rounded-full px-2 bg-white outline-white text-black text-md">ig: {card.ig}</h1>
                {/* </a> */}
              </div>
              <p className="font-regular text-center mt-4 lg:text-3xl md:text-xl sm:text-base">{card.text}</p>
              <div className="flex justify-end w-full m-4 md:m-16">
                <Image className="h-5 w-8 md:h-fit md:w-fit mr-6" height={72} width={72} src="/quote.closing.svg" alt="quote closing img" loading="lazy"/>
              </div>
            </div>
            </div>
          </div>
        ))}
      </Slider>
    </Box>
  );
}