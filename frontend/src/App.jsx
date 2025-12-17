import {BrowserRouter , Routes , Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashbaord } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import {UpdateProfile} from './pages/UpdateProfile'
import './App.css'

function App(){
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/dashboard' element={<Dashbaord/>}/>
          <Route path='/send' element={<SendMoney/>}/>
          <Route path='/updateprofile' element={<UpdateProfile/>} />
          <Route path='/send' element={<SendMoney/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App