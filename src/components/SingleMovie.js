import React, {useEffect, useState} from 'react'

const SingleMovie = ({movie, pickMovie}) => {

const [leftSeats, setLeftSeats] = useState(30)

    useEffect(()=> {

        let availableSeats = movie.seats.filter(x => x.reserved === "").length
        setLeftSeats(availableSeats)

   
    },[movie])


  return (
    <div className="movieBox">
        <img src={movie.image} alt="" />
        <div className="movieInfo">
            <h3>{movie.title}</h3>
            <p>Genre: {movie.genre}</p>
            <p>Census: {movie.census === 0? "none" : `N-${movie.census}`}</p>
            <p>Seats left: {leftSeats} / 30  </p>
            <button onClick={pickMovie}>Buy seats</button>
        </div>
    </div>
  )
}

export default SingleMovie