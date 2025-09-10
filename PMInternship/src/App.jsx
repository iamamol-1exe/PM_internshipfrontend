import { Route, Routes } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element ={<Login/>}/>
      </Routes>
      
    </>
  )
}

export default App
