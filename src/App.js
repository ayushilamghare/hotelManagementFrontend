import './App.css';
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import RoomDetails from './pages/RoomDetails';
import Bookings from './pages/Bookings';

const stripePromise = loadStripe('pk_test_51234567890abcdefghijklmnopqr');

function App() {

  //state variables
  const [screen, setScreen] = useState("register")
  const [user, setUser] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [bookings, setBookings] = useState([])

  return(
    <>
    {screen === "login" && (
      <Login setScreen = {setScreen} setUser= {setUser}/>
    )}

      {screen === "register" && (
      <Register setScreen = {setScreen}/>
    )}

      {screen === "home" && (
      <Home user = {user} setScreen = {setScreen} setSelectedRoom = {setSelectedRoom}/>
    )}

      {screen === "roomDetails" && (
      <Elements stripe={stripePromise}>
        <RoomDetails room = {selectedRoom} setScreen = {setScreen} bookings = {bookings} setBookings = {setBookings}/>
      </Elements>
    )}

      {screen === "bookings" && (
      <Bookings setScreen = {setScreen} bookings = {bookings}/>
    )}
    </>
  )
  
}

export default App;
