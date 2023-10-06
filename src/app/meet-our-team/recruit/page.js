"use client"
import dynamic from 'next/dynamic'
const Footer = dynamic(() => import('../../../components/footer'))

export default function rec() {
    return (
        <>
            <title>Recruit - Meet our team - ICT21</title>
        <div className='bg-white'>
            
            <div className='flex flex-col w-screen justify-center items-center'>
                <h1 className='text-black font-medium text-4xl  mt-32'>Find your perfect role.</h1>
            </div>
            <div className='flex flex-col w-screen h-screen justify-center items-center'>
                <h1 className='text-[#1D1D1F] text-3xl'>No job is recruited</h1>
            </div>
        </div>
        <Footer/>
        </>
    )
}