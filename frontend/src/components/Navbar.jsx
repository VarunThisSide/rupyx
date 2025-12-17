import {UserRoundCog} from 'lucide-react'
import { useState } from 'react'
import { Dropdown } from './Dropdown'

export function Navbar(){
    const [open,setOpen]=useState(false)
    return(
        <div className='w-full'>
            <div className="flex justify-between px-5 bg-black items-center h-14">
                <div className="text-3xl text-white">Rupyx</div>
                <div onClick={()=>{setOpen(!open)}} className='cursor-pointer h-10 w-10 rounded-full hover:bg-white/20 flex justify-center items-center'>
                    <UserRoundCog color='white'/>
                </div>
            </div>
            {open && <Dropdown/>}
        </div>
    )
}