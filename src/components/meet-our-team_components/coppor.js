'use client'

import { 
    Stack 
} from '@chakra-ui/react'

import Image from "next/image";

export default function coppor() {
    return (
        <div>
            <div className='flex flex-col w-full h-full gap-12 mt-12'>
                <div className='flex flex-col w-full justify-center items-center gap-12'>
                    <div id='cabinet' className='font-bold text-xl md:text-3xl'>Cabinet</div>
                    <Stack direction={{base:'column', md:'row'}} spacing={12}>
                        {cabinet.map((cab, index) => (
                            <div key={index}>
                            
                                <Image width={200} height={200} src={cab.imgsrc} alt={cab.fulln}/>
                                <div
                                    className="mt-4 m-1 p-2 rounded-full text-center text-black bg-white border-black border-2 hover:text-[#1D1D1F] hover:bg-[#FFFFFF]"
                                    size={{ base: "sm", md: "lg" }}
                                    >
                                    <p className='font-bold text-xs'>{cab.fulln}</p>
                                    <p className='font-medium text-xs text-[#717171]'>{cab.pos}</p>
                                </div>
                            </div>
                        ))}
                    </Stack>
                </div>
                
                <div className='flex flex-col w-full justify-center items-center gap-12'>
                    <div id='tech' className='font-bold text-xl md:text-3xl'>Tech</div>
                    <Stack direction={{base:'column', md:'row'}} spacing={12}>
                        {tech.map((cab, index) => (
                            <div key={index}>
                            
                                <Image width={200} height={200} src={cab.imgsrc} alt={cab.fulln}/>
                                <div
                                    className="mt-4 m-1 p-2 rounded-full text-center text-black bg-white border-black border-2 hover:text-[#1D1D1F] hover:bg-[#FFFFFF]"
                                    size={{ base: "sm", md: "lg" }}
                                    >
                                    <p className='font-bold text-xs'>{cab.fulln}</p>
                                    <p className='font-medium text-xs text-[#717171]'>{cab.pos}</p>
                                </div>
                            </div>
                        ))}
                    </Stack>
                </div>
                
                <div className='flex flex-col w-full justify-center items-center gap-12'>
                    <div id='content' className='font-bold text-xl md:text-3xl'>Content</div>
                    <Stack direction={{base:'column', md:'row'}} spacing={12} align='start'>
                        {content.map((cab, index) => (
                            <div key={index}>
                            
                                <Image width={200} height={200} src={cab.imgsrc} alt={cab.fulln}/>
                                <div
                                    className="mt-4 m-1 p-2 rounded-full text-center text-black bg-white border-black border-2 hover:text-[#1D1D1F] hover:bg-[#FFFFFF]"
                                    size={{ base: "sm", md: "lg" }}
                                    >
                                    <p className='font-bold text-xs'>{cab.fulln}</p>
                                    <p className='font-medium text-xs text-[#717171]'>{cab.pos}</p>
                                </div>
                            </div>
                        ))}
                    </Stack>
                </div>
                
                <div className='flex flex-col w-full justify-center items-center gap-12'>
                    <div id='art' className='font-bold text-xl md:text-3xl'>Art</div>
                    <Stack direction={{base:'column', md:'row'}} spacing={12} align='center'>
                        {art.map((cab, index) => (
                            <div key={index}>
                            
                                <Image width={200} height={200} src={cab.imgsrc} alt={cab.fulln}/>
                                <div
                                    className="mt-4 m-1 p-2 rounded-full text-center text-black bg-white border-black border-2 hover:text-[#1D1D1F] hover:bg-[#FFFFFF]"
                                    size={{ base: "sm", md: "lg" }}
                                    >
                                    <p className='font-bold text-xs'>{cab.fulln}</p>
                                    <p className='font-medium text-xs text-[#717171]'>{cab.pos}</p>
                                </div>
                            </div>
                        ))}
                    </Stack>
                </div>

                <div className='bg-[#EDEDED] rounded-3xl p-3 md:p-16 mx-12 md:mx-32 my-8 md:my-16'>
                    <p className=' font-normal md:font-medium text-xs md:text-3xl text-center'>Success is not solely attributed to our individual efforts, but rather to the collective contributions and support extended by everyone within our faculty.</p>
                </div>

            </div>
        </div>
    )
};

const cabinet = [
    {
        imgsrc: '/asset/MOT/mock.webp',
        fulln: 'Natchapol Mingmahaphan',
        pos: 'President'
    },
    {
        imgsrc: '/asset/MOT/mock.webp',
        fulln: 'Napatkrit Asavarojpanichn',
        pos: 'Vice President'
    },
    {
        imgsrc: '/asset/MOT/mock.webp',
        fulln: 'Ornjira Korsakpaisarn',
        pos: 'Secretary'
    },
    {
        imgsrc: '/asset/MOT/mock.webp',
        fulln: 'Patiparn Tangmongkolpaisan',
        pos: 'Secretary'
    },
]

const tech = [
    {
        imgsrc: '/asset/MOT/mock.webp',
        fulln: 'Poonyawatt Klumnaim',
        pos: 'Technology Director'
    },
    {
        imgsrc: '/asset/MOT/mock.webp',
        fulln: 'Sanhanut Kungwolngan',
        pos: 'Vice Technology Director'
    },
    {
        imgsrc: '/asset/MOT/mock.webp',
        fulln: 'Thanachot Onlamoon',
        pos: 'Vice Technology Director'
    },
]

const content = [
    {
        imgsrc: '/asset/MOT/mock.webp',
        fulln: 'Eakbodin Kanjanamuengthong',
        pos: 'Content Director'
    },
]

const art = [
    {
        imgsrc: '/asset/MOT/mock.webp',
        fulln: 'Sakhunich Iamcharas',
        pos: 'Art Director'
    },
]

