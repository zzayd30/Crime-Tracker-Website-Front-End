import React, { useEffect, useState } from 'react'
import Home from './Pages/Home'
import Layout from './Pages/Layout'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import NotFound from './Pages/Notfound'
import Signup from './Pages/Signup'
import Crimes from './Pages/Crimes'
import AddCrime from './Pages/AddCrime'
import { useUserStore } from './store/store'
import SingleCrime from './Pages/SingleCrime'
import Suspects from './Pages/Suspects'
import AddEvidences from './Pages/AddEvidences'
import AddSuspect from './Pages/AddSuspect'
import AddVictims from './Pages/AddVictims'
import EditSuspect from './Pages/EditSuspect'
import EditVictim from './Pages/EditVictim'
import Victims from './Pages/Victims'
import Admin from './Pages/Admin'

const App = () => {
  const { isLogin, isLoading ,role} = useUserStore();
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/suspects" element={<Suspects />} />
        <Route path="/victims" element={<Victims />} />
        <Route path="/suspects/add-suspect/:CrimeId" element={<AddSuspect />} />
        <Route path="/suspects/edit-suspect/:CrimeId/:SuspectId" element={<EditSuspect />} />
        <Route path="/crimes/add-crime" element={<AddCrime />} />
        <Route path="/crimes/:CrimeId" element={<SingleCrime />} />
        <Route path="/crimes" element={isLogin ? <Crimes /> : <Login />} />
        <Route path="/evidence/add-evidence/:CrimeId" element={<AddEvidences />} />
        <Route path="/victims/add-victim/:CrimeId" element={<AddVictims />} />
        <Route path="/victims/edit-victim/:CrimeId/:VictimId" element={<EditVictim />} />
        <Route path="/admin" element={role === "admin" ? <Admin /> : <Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
