import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main';

export function Dashbaord(){
  return(
    <div className='flex flex-col justify-center items-center'>
      <Navbar/>
      <Main/>
      <ToastContainer/>
    </div>
  )
}