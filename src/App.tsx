import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Employees from './pages/Employees'

export default function App(){
  return (
    <Routes>
      <Route path="/employees" element={<Employees/>} />
      <Route path="/" element={<Navigate to="/employees" replace />} />
    </Routes>
  )
}
