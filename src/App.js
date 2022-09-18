import './App.css';
import {React, useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import mainContext from './context/mainContext';
import io from "socket.io-client"

import Toolbar from './components/Toolbar'

import HomePage from './pages/HomePage';

import AllMoviesPage from './pages/AllMoviesPage';
import ReservationPage from './pages/ReservationPage';
import TicketPage from './pages/TicketPage';

const socket = io.connect("http://localhost:4000")

function App() {

  const [logedinUser, setLogedinUser] = useState(null)
  const [getMovieList, setMovieList] = useState([])
  const [clickedMovie, setClickedMovie] = useState(null)
  const [purchasedTickets, setPurchasedTickets] = useState([])


  useEffect(()=> {
     socket.on("get_movies", (data) => {
            setMovieList(data)
            
        })
     socket.on("purchased_tickets", (data) => {
            setPurchasedTickets(data)
        })
    
        // socket.on("user_connected", (data) => {
        //     console.log(data)
        //     setLogedinUser(data)
        // })

  },[socket])
  

  return (
<mainContext.Provider value={{socket, logedinUser, setLogedinUser,
getMovieList, setMovieList, clickedMovie, setClickedMovie, purchasedTickets, setPurchasedTickets


}}>
<div className="App"> 

<BrowserRouter>
<Toolbar/>
<Routes>
  

 <Route path="/" element={<HomePage/>}/>
 <Route path="/allmovies" element={<AllMoviesPage/>}/>
 <Route path="/reserve" element={<ReservationPage/>}/>
 <Route path="/mytickets" element={<TicketPage/>}/>


  
</Routes>

</BrowserRouter>

</div>

</mainContext.Provider>








    
  );
}

export default App;
