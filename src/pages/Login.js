import React, {useRef, useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router'
import mainContext from '../context/mainContext'
const LoginPage = ({}) => {

const emailLogRef = useRef()
const passLogRef = useRef()
const [message, setMessage] = useState("")
const nav = useNavigate()
const {socket, setLogedinUser} = useContext(mainContext) 

function validateUser(){

  fetch("http://localhost:4000/logUser/" + emailLogRef.current.value + "/" + passLogRef.current.value )
            .then(res => res.json())
            .then(data => {
                
            if(data.error){
            
            setMessage(data.message)
            } else {
                socket.emit("connect_user", data.result)
                console.log(data)
                nav("/allmovies")
            }
                
            })
}

useEffect(()=> {
        
        socket.on("user_connected", (data) => {
            console.log(data)
            setLogedinUser(data)
        }) 


    },[socket])

  return (
    <div className="login">
      <h3>Login</h3>
        <input type="text" ref={emailLogRef} placeholder="email"/>
      <input type="text" ref={passLogRef} placeholder="password"/>
      <button onClick={validateUser}>Login</button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default LoginPage