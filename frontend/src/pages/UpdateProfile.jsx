import { ToastContainer , toast } from "react-toastify";
import { Box } from "../components/Box";
import { Heading } from "../components/Heading";
import { useForm } from 'react-hook-form'
import { InputLabel } from "../components/InputLabel";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export function UpdateProfile(){
  const {register,handleSubmit} = useForm()
  const navigate=useNavigate()
  const token=localStorage.getItem('token')
  const onSubmit=async (data)=>{
    try{
      if(data.firstName === '') delete data.firstName
      if(data.lastName === '') delete data.lastName
      if(data.password === '') delete data.password
      console.log(data)
      const response=await axios.put('http://localhost:3000/api/v1/user/update',data,{
        headers : {
          authorization : token
        }
      })
      toast(response.data.msg)
      setTimeout(()=>{
        navigate('/dashboard')
      },2000)
    }catch(err){
      toast(err.response.data.msg)
    }
  }
  return(
    <>
      <Box>
        <Heading headingLabel='Update Profile' subHeadingLabel='Enter new entry that you need to change'/>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel label='First Name'/>
          <input className="w-full border-b-2 border-black focus:outline-none" {...register('firstName')} />
          <InputLabel label='Last Name'/>
          <input className="w-full border-b-2 border-black focus:outline-none" {...register('lastName')} />
          <InputLabel label='Password'/>
          <input className="w-full border-b-2 border-black focus:outline-none" type="password" {...register('password')} />
          <input className="mx-auto p-3 cursor-pointer block my-3 text-white bg-black rounded-sm" type="submit" value="Update"/>
        </form>
      </Box>
      <ToastContainer/>
    </>
  )
}