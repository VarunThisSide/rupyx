import { Box } from "../components/Box";
import { Heading } from "../components/Heading";
import { InputLabel } from '../components/InputLabel'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Signup() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const notify = (msg) => toast(msg)
  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/signup', data)
      const msg = res.data.msg
      notify(msg)
      const jwtToken = 'Bearer ' + res.data.token
      localStorage.setItem('token', jwtToken)
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (err) {
      notify(err.response.data.msg)
    }
  }
  return (
    <>
      <Box>
        <Heading headingLabel='Signup' subHeadingLabel='Enter your information to create an account' />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputLabel label='First Name' />
            <input className="w-full border-b-2 border-black focus:outline-none" {...register('firstName')} />
            <InputLabel label='Last Name' />
            <input className="w-full border-b-2 border-black focus:outline-none" {...register('lastName')} />
            <InputLabel label='Username' />
            <input className="w-full border-b-2 border-black focus:outline-none" {...register('username')} />
            <InputLabel label='Password' />
            <input className="w-full border-b-2 border-black focus:outline-none" type="password" {...register('password')} />
            <input className="mx-auto p-3 cursor-pointer block my-3 text-white bg-black rounded-sm" type="submit" value="Signup" />
          </form>
        </div>
        <div>Already have an account? <span onClick={() => { navigate('/signin') }} className="underline cursor-pointer">Signin</span></div>
      </Box>
      <ToastContainer />
    </>
  )
}