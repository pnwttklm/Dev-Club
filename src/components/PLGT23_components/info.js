'use client'
import { 
    Divider,
  } from '@chakra-ui/react';

export default function() {
    return (
        <>
            <div className='rounded-3xl bg-gradient-to-br from-[#0B6446] via-[#0F373E] to-[#08141C] p-6
                w-10/12
                md:w-1/2
                md:p-12'
            >
                <div className='flex flex-col gap-10'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex'>
                            <h1 className='text-transparent bg-clip-text font-extrabold text-xl md:text-3xl bg-gradient-to-l from-[#00FFFF] to-[#33FF00]'>DAY 1</h1>
                        </div>
                        <p className='text-[#F5F5F7] text-sm md:text-base'>The first day of this activity will be held at the faculty of ICT, Mahidol University Salaya campus. This is an opportunity for freshmen to get used to both their peers and the place where they will be studying throughout the next four years. Freshmen will be able to have fun with activities provided while getting familiar with the faculty building together with their newfound friends.
                        </p>
                    </div>
                    {/* <Center width='50px'> */}
                        <Divider />
                    {/* </Center> */}
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-end'>
                            <h1 className=' text-transparent bg-clip-text font-extrabold text-xl md:text-3xl bg-gradient-to-l from-[#FF6B00] to-[#8F00FF]'>DAY 2</h1>
                        </div>
                        <p className='text-[#F5F5F7] text-right text-sm md:text-base'>The second day will a field trip will be at Amphawa, Samut Songkran. Well, at this rate, you freshmen that reading this will start to wonder why the so-called icebreaking activity will be held at Amphawa. Will it be a trip to the famous Amphawa floating market? That’s going to be a surprise! 
                        </p>
                    </div>
                </div>
            </div>
            <div className=' mt-12 items-center'></div>
            <p className='text-gray-500 
            text-xs
            sm:text-sm
            md:text-base'>All activities will be conducted in Thai and English.
            </p>
        </>
    )
}