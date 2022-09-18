import React, {useContext, useEffect, useState} from 'react'
import SingleMovie from '../components/SingleMovie'
import mainContext from '../context/mainContext'
import { useNavigate } from 'react-router'


const AllMoviesPage = () => {

    const { getMovieList, setClickedMovie} = useContext(mainContext) 
    const nav = useNavigate()
    


    const pickMovie = (x) => {
        setClickedMovie(x)
        nav("/reserve")
    }


  return (
    <div className="moviecontainer">
        {getMovieList && getMovieList.map((x,i) => <SingleMovie movie={x} pickMovie={() => pickMovie(x)} key={i}/>)}
    </div>
  )
}

export default AllMoviesPage