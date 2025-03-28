import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Login from './Components/Login/login.jsx'
import Users from './Components/ProfileList/users.jsx'
import Signup from "./Components/Signup/signup.jsx"
import EditUser from "./Components/ProfileList/editUser.jsx"

function App() {

  return (
    <>
      <Routes>
        <Route path="/Login" element={<Login />} />
        {/* <Route path="/Signup" element={<Signup />} /> */}
        <Route path="/Users" element={<Users />} />
        <Route path="/EditUser/:id" element={<EditUser />} />
      </Routes>

    </>
  )

}

export default App
