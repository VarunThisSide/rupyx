import { Heading } from "../components/Heading";
import {useForm} from 'react-hook-form'
import { InputLabel } from "../components/InputLabel";
import { ToastContainer , toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box } from "../components/Box";
import axios from 'axios'

export function Signin(){
  const {register , handleSubmit} = useForm()
  const navigate=useNavigate()
  const onSubmit=async (data)=>{
    try{
      const res=await axios.post('http://localhost:3000/api/v1/user/signin',data)
      const jwtToken='Bearer '+res.data.token
      localStorage.setItem('token' , jwtToken)
      toast('Signin Successful')
      setTimeout(()=>{
        navigate('/dashboard')
      },2000)
    }catch(err){
      console.log(err)
      toast(err.response.data.msg)
    }
  }
  return(
      <>
        <Box>
          <Heading headingLabel={'Signin'} subHeadingLabel={'Enter your information to signin'}/>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputLabel label='Username'/>
              <input className="w-full border-b-2 border-black focus:outline-none" {...register('username')} />
              <InputLabel label='Password'/>
              <input className="w-full border-b-2 border-black focus:outline-none" type="password" {...register('password')} />
              <input className="mx-auto p-3 cursor-pointer block my-3 text-white bg-black rounded-sm" type="submit" value="Signin"/>
            </form>
          </div>
        </Box>
        <ToastContainer/>
      </>
  )
}