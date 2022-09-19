import React, {useRef, useState} from 'react'

const RegisterPage = () => {

const emailRef = useRef()
const passOneRef = useRef()
const passTwoRef = useRef()
const ageRef = useRef()

const [message, setMessage] = useState("")



function registerUser(){

  if(emailRef.current.value !== "" && passOneRef.current.value !== "" && passTwoRef.current.value !== "empty" && passOneRef.current.value === passTwoRef.current.value){
    const newUser = {
        useremail : emailRef.current.value,
        userpass: passOneRef.current.value,
        passTwo: passTwoRef.current.value,
        userage: ageRef.current.value
    }

    

const options = {
        mode: "cors",
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newUser)

    }

        fetch("https://mern-movie-site.herokuapp.com/regUser", options)
      .then(res => res.json())
      .then((data) => {
        
        if(!data.error){
          setMessage("Registered successfully")
        } else {
          setMessage(data.message)
        }


  })  
  } else return
      
}

  return (
    <div className="register">
        <h3>Register</h3>
 
        <input type="text" ref={emailRef}  placeholder="email"/>
        <input type="text" ref={passOneRef} placeholder="password"/>
        <input type="text"  ref={passTwoRef} placeholder="repeat password"/>
        <input type="number"  ref={ageRef} placeholder="enter your age"/>
        <button onClick={registerUser}>Register</button>
        {message && <p>{message}</p>}
    </div>
  )
}

export default RegisterPage