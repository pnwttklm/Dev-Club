'use client'

import './globals.css'
import ResNav from '../components/responsive_nav'
import { Providers } from "./providers"
import { IBM_Thai } from './fonts'
import { 
  motion,
  useScroll,
  useSpring
} from 'framer-motion';


export default function RootLayout({ children }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <html lang='en'>
      <head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="icon" href="/icon.svg" />
      <link
      rel="apple-touch-icon"
        href="/apple-icon.ico"
      />
      </head>
      <body className={IBM_Thai.className}>
          <Providers>
            <ResNav/>
            <motion.div className='z-30 bg-gradient-radial from-[#00FFFF] to-[#33FF00] rounded-full top-0 left-0 right-0 h-[2px] fixed' style={{ scaleX }} />  
            {children}
          </Providers>
      </body>
    </html>
  )
}
