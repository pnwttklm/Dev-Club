'use client'
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity:0, y:50 },
  show: { opacity:[0.5,1], y:0 },
}


export default function TopElement() {
    return (
        <>
          <motion.iframe
            variants={fadeInUp}
            whileInView="show"
            className="w-full h-[500px]"
            src="https://my.spline.design/untitledcopycopy-68a94d1e36b2b2363b738436fefb91a2/"
            frameBorder="0"
            title='Freshy go round 3D'
            loading="lazy"
          />
      
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            className="flex flex-col mb-5 w-10/12 md:w-1/2 justify-center text-center text-white gap-10"
            
          >
            <h1
              className=" m-4  font-semibold text-center
                text-4xl
                md:text-5xl
                xl:text-6xl"
            >
              Freshy go round.
            </h1>
            <p
              className=" font-medium
                text-lg
                md:text-xl
                xl:text-2xl
                "
            >
              Greetings, ICT21 Students of the Class of 2027!
            </p>
            <div
              className="flex flex-col font-normal gap-10
                text-sm
                md:text-base
                xl:text-lg"
            >
              <p>
                {/* Mark your calendars and be part of this extraordinary opportunity to
                kickstart your college journey with the Faculty of ICT. As you step
                into the latest batch of our esteemed faculty, get ready to delve into
                the world of cutting-edge technologies and enriching education. This
                is your chance to connect with ICT Ajarns, experienced senpais, and
                fellow developers. */}
                Get yourselves ready for the upcoming four years of unforgettable college journey in the Faculty of ICT. 
                As now you have stepped into this faculty, there’s no turning back. You will experience the world of cutting-edge technologies 
                from the basic like printing “Hello, world!” to the abysmal dept of world changing algorithms, internet of things, 
                and even taming an artificial intelligence. This is also a great opportunity to connect with our kind instructors, 
                experienced seniors, and fellowship of ICT21 who have ended up in the same fate as you are.
              </p>
              <p>
                {/* Join us onsite events exclusively designed for ICT Freshy. Immerse
                yourself in a month filled with knowledge, networking, and endless
                possibilities. */}
                Come join us at the onsite exclusive events specifically designed for you ICT freshmen. 
                Immerse yourself in a month full of activities that will fill you with needed wisdom, making you ready for the upcoming semester.
              </p>
              <p>Stay tuned for more details, and we can't wait to welcome you!</p>
            </div>
          </motion.div>
        </>
      
    )
}