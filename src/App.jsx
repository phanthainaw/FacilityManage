import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import Navbar from './components/Navbar';
import RequestForm from './components/RequestForm';
import RequestDetail from './components/RequestDetail'

function App() {
  return (
    <>
      <Navbar/>
      <div className='container'>
        <div className='reviewRequestBox'>
          <RequestDetail/>
        </div>
        <RequestForm/>
      </div>
    </>

  )
}

export default App
