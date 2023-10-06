'use client'

import Image from "next/image";

export default function coppor() {
    return (
        <>
        <div id='flex flex-col w-screen justify-center items-center'>
            <a href='/meet-our-team/recruit' className='my-24'><Image width={1000} height={1000} src='/asset/MOT/joinusc.webp' alt='joinus logo'/></a>
        </div>
        </>
    );
}