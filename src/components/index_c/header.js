import Image from 'next/image';
import {
  Box,
  Link,
  SimpleGrid
}from '@chakra-ui/react'

export default function Header() {
    return (
      <>
      <div class="grid grid-flow-col auto-cols-ma gap-100 lg:p-32 p-6">
        <SimpleGrid columns={[1, 1, 2]} spacingX='40px' spacingY='20px'>
        <div>
                <Image src='header.svg' width={1000} height={1000} className='w-full'/>
          </div>
        <div>
                <h1 className="text-6xl">Did someone tell you that your knowledge cannot be implemented in the real-world problems?</h1>
                <h1 className="italic text-6xl">They were wrong!</h1>
                <p className='pt-12 text-xl'>At Dev Club ICT Mahidol, we belive that blah blah we are sandbox for everyone to learn to try to experience the real-world problems of working in software developement field, not only developers we also welcome blah blah such as <p className='italic'>📋 Quality Assurance and 🎨 UX/UI Designer and Art, </p></p>
                <Link href="https://forms.gle/WEeVVa5fKjRgTQ2dA"><button  className="bg-[#000000] text-white text-2xl hover:text-black hover:bg-[#FFFFFF] border-2 border-black mr-6 hover:italic py-4 px-16  mt-6">Submit Your Application</button></Link>
            </div>
          
        </SimpleGrid>
      </div>
      {/* <div class="grid grid-flow-col auto-cols-ma gap-100 lg:p-32 p-6">
      <div>
                <h1 className="text-6xl">Did someone tell you that your knowledge cannot be implemented in the real-world problems?</h1>
                <h1 className="italic text-6xl">They were wrong!</h1>
                <p className='pt-12 text-xl'>At Dev Club ICT Mahidol, we belive that blah blah we are sandbox for everyone to learn to try to experience the real-world problems of working in software developement field, not only developers we also welcome blah blah such as <p className='italic'>📋 Quality Assurance and 🎨 UX/UI Designer and Art, </p></p>
                <Link href="https://forms.gle/WEeVVa5fKjRgTQ2dA"><button  className="bg-[#000000] text-white text-2xl hover:text-black hover:bg-[#FFFFFF] border-2 border-black mr-6 hover:italic py-4 px-16  mt-6">Submit Your Application</button></Link>
            </div>
            <div>
                
            </div>
      </div> */}
      </>
      
    )
  }