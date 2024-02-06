import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Signup from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpadateListing from './pages/UpadateListing'
import ListIng from './pages/ListIng'
import Search from './pages/Search'
import AdminLog from './pages/AdminLog'

import Charts from './pages/Nested/Charts'
import Otp from './pages/Nested/Otp'
import Users from './pages/Nested/Users'
import OtpAuth from './pages/OtpAuth'

function App() {
  return  <BrowserRouter>
            
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<Signup />} />
              <Route path='/search' element={<Search />} />
              <Route path='/otpauth/:id' element={<OtpAuth />} />
              <Route path='/listing/:listingId' element={<ListIng />} />
              <Route element={<PrivateRoute/>}>
                
              <Route path='/profile' element={<Profile />} />
              <Route path='/create-listing' element={<CreateListing />} />
              <Route path='/update-listing/:listingId' element={<UpadateListing/>} />
              <Route path='/adminlog' element={<AdminLog />}>
                  <Route path='otp' element={<Otp/>}/>
                  <Route path='users' element={<Users/>}/>
                  <Route path='charts' element={<Charts/>}/>
              </Route>
              <Route  />
              </Route>
              <Route path='/about' element={<About />} />
              
            </Routes>
          </BrowserRouter>
}

export default App