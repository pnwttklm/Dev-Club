import Image from "next/image";

export default function TopElement() {
    return (
        <>
        <div className='flex flex-col w-screen justify-center items-center'>
            <Image width={40} height={40} className='w-4/6 md:w-3/6 h-full' src='/asset/MOT/MOT_HF.svg' alt='MOT logo'/>
            <h1 className='text-[#8D8D8D] text-base md:text-3xl -mt-12 md:-mt-36'>Powerful team drives powerful works</h1>
            <div className='flex flex-row gap-4 justify-center pt-6 md:pt-12'>
            {bar.map((element) =>
                <div className='rounded-3xl md:rounded-full text-sm md:text-lg border-2 border-black w-fit md:w-24 text-center px-2'>
                        <a href={`/meet-our-team#${element.theLink}`}>{element.name}</a>    
                </div> 
                )}
            </div> 
        </div>
        </>
    )
};

const bar = [
    {
        name: 'Cabinet',
        theLink: 'cabinet'
    },
    {
        name: 'Tech',
        theLink: 'tech'
    },
    {
        name: 'Content',
        theLink: 'content'
    },
    {
        name: 'Art',
        theLink: 'art'
    },
]