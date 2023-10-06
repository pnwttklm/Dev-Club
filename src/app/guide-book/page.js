import dynamic from 'next/dynamic'
import Image from "next/image";

const Footer = dynamic(() => import('../../components/footer'))
const Card = dynamic(() => import('../../components/guidebook_components/card'))

export default function guideBook() {
    return (
        <>
        <title>Guide Book - ICT21</title>
        
        <div className='flex flex-col w-screen justify-center items-center bg-[#FFFFFF]'>
            <Image width={1728} height={1101} className='w-full md:w-4/6' src='/asset/forGuideBook/headFigure.svg' alt='head figure'></Image>
            <p className='text-4xl font-bold pb-64'>Coming Soon</p> 
            {/* <h1 className='text-[#00FF66] font-semibold text-4xl w-5/6 text-left'>Accessible by foot</h1>
            <h1 className='m-16 text-black font-medium text-3xl'>IN UNI</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
                <Card
                    main_tag='FOOD'
                    sub_tags= 
                    {
                        [
                            {
                                tag_name: 'NOODLE',
                                color: "#806640"
                            },
                            {
                                tag_name: 'JAPANESE',
                                color: "#FF6746"
                            },
                            {
                                tag_name: 'CAFE',
                                color: "#6A4000"
                            },
                            {
                                tag_name: 'À LA CARTE',
                                color: "#FFAF37"
                            },
                        ]
                    }
                    name='Faculty of Social Sciences and Humanities Canteen'
                    name_color="#FFAF37"
                    type_name='Type of Food:'
                />
                <Card 
                    main_tag='LANDMARK' 
                    sub_tags= 
                    {
                        [
                            {
                                tag_name: 'PARK',
                                color: "#00FF66"
                            },
                            {
                                tag_name: 'LAKE',
                                color: "#0047AB"
                            },
                        ]
                    }
                    name='Sireeruckhachati Nature Learning Park'
                    name_color='#FF3767'
                    type_name='Facilities:'
                />
                <Card 
                    main_tag='LANDMARK' 
                    sub_tags= 
                    {
                        [
                            {
                                tag_name: 'PARK',
                                color: "#00FF66"
                            },
                            {
                                tag_name: 'LAKE',
                                color: "#0047AB"
                            },
                        ]
                    }
                    name='Sireeruckhachati Nature Learning Park'
                    name_color='#FF3767'
                    type_name='Facilities:'
                />
                <Card 
                    main_tag='LANDMARK' 
                    sub_tags= 
                    {
                        [
                            {
                                tag_name: 'PARK',
                                color: "#00FF66"
                            },
                            {
                                tag_name: 'LAKE',
                                color: "#0047AB"
                            },
                        ]
                    }
                    name='Sireeruckhachati Nature Learning Park'
                    name_color='#FF3767'
                    type_name='Facilities:'
                />
                <Card 
                    main_tag='LANDMARK' 
                    sub_tags= 
                    {
                        [
                            {
                                tag_name: 'PARK',
                                color: "#00FF66"
                            },
                            {
                                tag_name: 'LAKE',
                                color: "#0047AB"
                            },
                        ]
                    }
                    name='Sireeruckhachati Nature Learning Park'
                    name_color='#FF3767'
                    type_name='Facilities:'
                />
                <Card 
                    main_tag='LANDMARK' 
                    sub_tags= 
                    {
                        [
                            {
                                tag_name: 'PARK',
                                color: "#00FF66"
                            },
                            {
                                tag_name: 'LAKE',
                                color: "#0047AB"
                            },
                        ]
                    }
                    name='Sireeruckhachati Nature Learning Park'
                    name_color='#FF3767'
                    type_name='Facilities:'
                />
                <Card 
                    main_tag='LANDMARK' 
                    sub_tags= 
                    {
                        [
                            {
                                tag_name: 'PARK',
                                color: "#00FF66"
                            },
                            {
                                tag_name: 'LAKE',
                                color: "#0047AB"
                            },
                        ]
                    }
                    name='Sireeruckhachati Nature Learning Park'
                    name_color='#FF3767'
                    type_name='Facilities:'
                />
                <Card 
                    main_tag='LANDMARK' 
                    sub_tags= 
                    {
                        [
                            {
                                tag_name: 'PARK',
                                color: "#00FF66"
                            },
                            {
                                tag_name: 'LAKE',
                                color: "#0047AB"
                            },
                        ]
                    }
                    name='Sireeruckhachati Nature Learning Park'
                    name_color='#FF3767'
                    type_name='Facilities:'
                />
            </div>

            <h1 className='m-16 text-black font-medium text-3xl'>GATE 1</h1>
            <h1 className='m-16 text-black font-medium text-3xl'>GATE 4</h1>
            <div className=' bg-gradient-to-b from-transparent to-black w-full'>
                <h1 className='m-16 text-black font-medium text-3xl text-center'>GATE 6</h1>
            </div>
            <div className='bg-black w-screen'>
                <h1 className='text-white font-medium text-3xl text-center'>THE TANGSIN</h1>
            </div> */}
        </div>

        <Footer/>
        </>
    )
}