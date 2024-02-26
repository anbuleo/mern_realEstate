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
import MeetingContext from './context/MeetingContext'
import Meeting from './pages/Nested/Meeting'
import MeetingTable from './pages/Nested/MeetingTable'

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
                  <Route path='users' element={<MeetingContext><Users/></MeetingContext>}/>
                  <Route path='' element={<Charts/>}/>
                  <Route path='meetingtable' element={<MeetingTable/>}/>
                  <Route path='users/meeting' element={<MeetingContext><Meeting/></MeetingContext>} />
              </Route>
              <Route  />
              </Route>
              <Route path='/about' element={<About />} />
              
            </Routes>
          </BrowserRouter>
}

export default App