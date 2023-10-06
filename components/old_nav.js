'use client' //This is need because ChakraUI is client side library

import Link from "next/link"
import { Button } from '@chakra-ui/react'

export default function NavBar() {
    return (
        <>
            <div className='m-0 top-0 fixed
                            bg-blue-900/20
                            w-screen h-14
                            drop-shadow-md'>
                <div className="flex justify-between">
                <Link href="/overview" className="nav-items"><img src="ict21_logo.svg" className="p-2 h-14 drop-shadow-md"></img></Link>
                    <ul className="flex w-full pr-8 text-white items-center justify-end gap-8">
                        <li><Link href="/" className="nav-items">Overview</Link></li> 
                        <li><Link href="/PLGT23" className="nav-items">PLGT23</Link></li>
                        <li><Link href="/welcome-freshy" className="nav-items">Welcome Freshy</Link></li>
                        <li><Link href="/sairahus" className="nav-items">Late Code</Link></li>
                        <li><Link href="/prep-class" className="nav-items">Prep Class</Link></li>
                    </ul>
                <Link href="/meet-our-team" className="nav-items"><img src="meet_our_team.svg" className=" pt-3 h-14 drop-shadow-md"></img></Link>
                </div>
            </div>
            <Button colorScheme='blue'>Button</Button>
        </>
    )
}