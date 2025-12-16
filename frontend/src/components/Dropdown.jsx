import {LogOut} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Dropdown(){
  const navigate=useNavigate()
  return(
    <div className='absolute right-0 mx-4 bg-black rounded-b-2xl p-2 z-10'>
      <div onClick={()=>{navigate('/updateprofile')}} className='text-white bg-white/20 my-1 rounded-sm p-2 cursor-pointer'>Update Profile</div>
      <div onClick={()=>{
        localStorage.removeItem('token')
        navigate('/signin')
      }} className='text-white bg-white/20 flex items-center p-2 cursor-pointer'>Logout <span className='mx-2'><LogOut color='white' size={14}/></span></div>
    </div>
  )
}