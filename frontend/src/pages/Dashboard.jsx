import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../components/Navbar';

export function Dashbaord(){
    return(
        <>
            <Navbar/>
            <ToastContainer/>
        </>
    )
}