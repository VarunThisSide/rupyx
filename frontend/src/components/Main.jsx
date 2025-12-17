import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { AllUsers } from './AllUsers';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {IndianRupee} from 'lucide-react'

export function Main() {
  const [filter,setFilter]=useState('')
  const [balance,setBalance]=useState(0)
  const jwtToken=localStorage.getItem('token')
  useEffect(()=>{
    try{
      const fetchBalance=async ()=>{
        const response=await axios.get('http://localhost:3000/api/v1/account/balance',{
          headers : {
            authorization : jwtToken
          }
        })
        return response.data.balance
      }
      setBalance(fetchBalance())
    }catch(err){
      const errMsg=err.response?.data.msg || 'Error fetching balance'
      toast(errMsg)
    }
  },[])
  return (
    <div className='w-1/2'>
      <div className='text-2xl my-4 flex items-center'>
        <span className='font-bold'>Your Balance : </span> <IndianRupee strokeWidth={3}/> {balance}
      </div>
      <SearchBar setFilter={setFilter}/>
      <AllUsers filter={filter}/>
    </div>
  )
}