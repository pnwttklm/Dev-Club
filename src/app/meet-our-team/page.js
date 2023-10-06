import dynamic from 'next/dynamic'



const Top = dynamic(() => import('../../components/meet-our-team_components/top'))
const Portrait = dynamic(() => import('../../components/meet-our-team_components/coppor'))
const Recruit = dynamic(() => import('../../components/meet-our-team_components/recruit'))



const Footer = dynamic(() => import('../../components/footer'))

export default function MeetOurTeam() {
    return (
        <>
        <title>Meet Our Team - ICT21</title>
        <div className='bg-white'>
        <Top/>

        <Portrait/>

        <div className='bg-[#F5F5F7] flex flex-col w-screen justify-center items-center p-6 md:p-24'>
            <Recruit/>
        </div>
        

        <Footer/>
        </div>
        </>
    )
}