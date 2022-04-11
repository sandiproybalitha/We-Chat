import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App