'use client'
import { PanelRightOpen } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Navbar = () => {
    const { data, status } = useSession();
    const router = useRouter();

    const [botMode, setBotMode] = useState(true);

    const handelbotMode = (mode: boolean) => {
        setBotMode(mode)
        botMode ? router.push('/dashboard') : router.push('/notedashboard')
    }
    return (
        <div className='flex fixed top-0 left-0 w-full backdrop-blur-2xl z-[30] justify-between shadow border-b  bordercolor h-[60px] items-center p-5 max-md:p-3   '>
            {<Link href={`${data?.user ? "/" : '/'}`} className='  text text-transparent text-2xl center gap-2 max-md:text-lg whitespace-nowrap textbase font-bold'>
                <p className="textbg">Super bot</p>
            </Link>}
            {
                status !== 'loading' && data ? <div className='center gap-2 max-md:gap-1'>

                    {/* <div className='card between bordercolor rounded-2xl p-5  gap-3 '> */}
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" onClick={() => handelbotMode(!botMode)} checked={botMode} className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 dark:peer-focus:ring-pink-200 rounded-full peer dark:bg-pink-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-pink-600 peer-checked:[#cb1140c5] dark:peer-checked:bg-[#cb1140c5]"></div>
                    </label>

                    {/* </div> */}

                    <Link href={`/profile`}>
                        <Image loading='lazy' src={data.user.image!} alt="User Avatar" width={40} height={40} className=' max-md:w-8  rounded-full' />
                    </Link>


                </div> :
                    status !== 'loading' && <Link href="/sign-in" className="buttonbg p-2 px-6">
                        Sign In
                    </Link>
            }

        </div>
    )
}

export default Navbar