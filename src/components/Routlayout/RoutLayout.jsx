import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function RoutLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
   <Footer/> 
    </>
  )
}
