import { UserRound } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import { ToastContainer , toast} from "react-toastify"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export function SendMoney() {
  const navigate=useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const firstName = searchParams.get('firstName')
  const lastName = searchParams.get('lastName')
  const [amount,setAmount]=useState(0)
  const jwtToken=localStorage.getItem('token')
  return (
    <div className="w-full h-screen flex justify-center items-center border">
      <div className="flex flex-col gap-3">
        <div className="text-3xl font-bold">Send Money</div>
        <div className="flex items-center">
          <UserRound size={30}/>
          <div className="mx-2 text-2xl">{firstName} {lastName}</div>
        </div>
        <div>Amount (in Rs.)</div>
        <input type="number" placeholder="Enter amount" onChange={(e)=>{setAmount(e.target.value)}} className="focus:outline-none border rounded-md p-3"/>
        <button onClick={async ()=>{
          try{
            const response=await axios.post('http://localhost:3000/api/v1/account/transfer',{
              to : id,
              amount : amount
            },{
              headers : {
                authorization : jwtToken
              }
            }
          )
            toast(response.data.msg)
            setTimeout(()=>{
              navigate('/dashboard')
            },2000)
          }catch(err){
            const errMsg=err.response?.data.msg || 'Transaction Failedd'
            toast(errMsg)
          }
        }} className="bg-black cursor-pointer rounded-lg text-white px-4 py-2">Pay</button>
        <button onClick={()=>{navigate('/dashboard')}} className="cursor-pointer rounded-lg px-4 py-2 border bg-gray-200">Cancel Transaction</button>
      </div>
      <ToastContainer/>
    </div>
  )
}