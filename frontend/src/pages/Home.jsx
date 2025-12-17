import axios from 'axios'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

export function Home() {
  const navigate=useNavigate()
  const jwtToken=localStorage.getItem('token')
  useEffect(()=>{
    if(!jwtToken){
      navigate('/signup')
    }
    const verify = async () => {
      try {
        const response=await axios.get('http://localhost:3000/api/v1/account/balance',{
          headers : {
            authorization : jwtToken
          }
        })
        navigate('/dashboard')
      }catch (err) {
        navigate('/signup')
      }
    }
    verify()
  },[jwtToken])

  return (
    <></>
  )
}