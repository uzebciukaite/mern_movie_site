import React, {useContext} from 'react'
import { useNavigate } from 'react-router'
import mainContext from '../context/mainContext'

const Toolbar = () => {

  const nav = useNavigate()
  const {socket, logedinUser, purchasedTickets, setLogedinUser, setPurchasedTickets} = useContext(mainContext) 


  const logout = () => {
    setLogedinUser(null)
    setPurchasedTickets([])
    console.log(logedinUser)
    socket.emit("logout_user", logedinUser)
    nav("/")

  }
    
  return (
    <div className="toolbar">

      {logedinUser &&  (
        <>
        <div>
        <p>User name: {logedinUser.email}</p>
        <p>Money: {logedinUser.money.toFixed(2)}</p>
        <p>Age: {logedinUser.age}</p>
        </div>
        <div>
        <button onClick={() => nav("/allmovies")}>Movie list</button>
        <button onClick={() => nav("/mytickets")}>My tickets {purchasedTickets && `(${purchasedTickets.length})`}</button>
        <button className="logout" onClick={logout}>Logout</button>
        </div>
        
        </>
      )}
      
        
    </div>
  )
}

export default Toolbar