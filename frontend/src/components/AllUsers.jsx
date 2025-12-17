import axios from 'axios'
import { UserRound } from "lucide-react"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'

export function AllUsers({filter}){
  const navigate=useNavigate()
  const [allUsers,setAllUsers]=useState([])
  const [userId,setUserId]=useState(null)
  const jwtToken=localStorage.getItem('token')

  useEffect(()=>{
    const fetchUsers=async ()=>{
      const response=await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
      setAllUsers(response.data.users)
    }
    fetchUsers()
  },[filter])

  useEffect(()=>{
    const fetchUserId=async ()=>{
      const response=await axios.get('http://localhost:3000/api/v1/account/balance',{
        headers : {
          authorization : jwtToken
        }
      })
      setUserId(response.data.userId)
    }
    fetchUserId()
  },[])

  const visibleUsers=allUsers.filter((user)=>{
    return user._id!=userId
  })

  return (
    <div>
      {visibleUsers.map((user)=>{
        return(
          <div key={user._id} className="flex items-center justify-between px-2 my-4 hover:bg-gray-200/50 py-2 rounded-lg">
            <div className="flex items-center">
              <UserRound size={30}/>
              <div className="mx-2 text-2xl">{user.firstName} {user.lastName}</div>
            </div>
            <button onClick={()=>{
              navigate(`/send?id=${user._id}&firstName=${user.firstName}&lastName=${user.lastName}`)
            }} className="bg-black cursor-pointer rounded-lg text-white px-4 py-2">Pay</button>
          </div>
        )
      })}
    </div>
  )
}