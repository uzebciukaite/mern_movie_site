import React, {useContext, useEffect, useState} from 'react'
import SingleSeat from '../components/SingleSeat'
import mainContext from '../context/mainContext'


const ReservationPage = () => {

  const {socket, clickedMovie, setClickedMovie, logedinUser} = useContext(mainContext) 
  const [pickedSeats, setPickedSeats] = useState([])
  const [showreserve, setShowReserve] = useState(false)
  const [ticketPrice, setTicketPrice] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [isOldEnough, setIsOldEnough] = useState(true)
  const [enoughMoney, setEnoughMoney] = useState(true)
  const [purchaseDone, setPurchaseDone] = useState(false)


  useEffect(()=> {
          if(logedinUser.age < clickedMovie.census){
            setIsOldEnough(false)
          } else {
            setIsOldEnough(true)
          }

      },[clickedMovie])

      useEffect(()=> {
        if(totalPrice > logedinUser.money){
          setEnoughMoney(false)
          setShowReserve(false)
        } else {
          setEnoughMoney(true)
          setShowReserve(true)
        }
      },[totalPrice])


  function enableButton(x){
        setPurchaseDone(false)
        const findIfSelected = pickedSeats.find(seat => seat === x.seatNumber)
        
          if(!x.reserved && !findIfSelected && isOldEnough && enoughMoney){
            setShowReserve(true)
            setPickedSeats([...pickedSeats, x.seatNumber])
            setTicketPrice([...ticketPrice, x.price])
        } else {
            let index = pickedSeats.findIndex(seat => seat === x.seatNumber)
            console.log(index)
            let newSeatArr = [...pickedSeats]
            let newPriceArr = [...ticketPrice]
            newSeatArr.splice(index, 1)
            setPickedSeats(newSeatArr)
            newPriceArr.pop()
            setTicketPrice(newPriceArr)
          }
        }
      

      useEffect(()=> {
        console.log(ticketPrice.length)
        if(ticketPrice.length >= 1){
          let totalSum = ticketPrice.reduce((a, b) => a + b, 0)
        setTotalPrice(totalSum)
        }  else {
          setShowReserve(false)
          console.log(showreserve)
          setTotalPrice(0)
        }
      },[ticketPrice])

      useEffect(()=> {
          socket.on("updated_current_movie", (data) => {
                setClickedMovie(data)  
          }) 
      },[socket])

      


  const buyTickets = () => {
      const data= {
        reservedBy: logedinUser.id,
        movie: clickedMovie.title,
        seats: pickedSeats,
        amount: totalPrice
        }

          // change mongodb info
      fetch("https://mern-movie-site.herokuapp.com/" + logedinUser.email + "/" + totalPrice )
        .then(res => res.json())
        .then(info => socket.emit("charge_user", info)
         )
         //change socket info       
      socket.emit("update_seat_list", data)
      socket.emit("update_clicked_movie", clickedMovie) 
      setPickedSeats([]) 
      setTicketPrice([])
      setShowReserve(false)
      setPurchaseDone(true)
}
        
  return (

    <div className="reservationCont">
      <div className="resLeft">
      {clickedMovie && clickedMovie.seats.map((x, i) => 
      <SingleSeat 
          seat={x} 
          key={i} 
          enableButton={() => enableButton(x)} 
          pickedSeats={pickedSeats} 
      />)}
      </div>
      <div className="resRight">
        {clickedMovie && (<h2>Movie: {clickedMovie.title}</h2>)}
        {showreserve && ticketPrice.length > 0 ? (
          <>
          <p className="innermargin">You have selected: <br />
          <span>{pickedSeats.join(", ")}</span>
         <br />seats!
          </p>
          <button onClick={buyTickets} >Buy tickets</button>
          </>
        )
        : ""
        }
        
        {ticketPrice.length > 0 ? (
          <p>Total sum: <span>{totalPrice.toFixed(2)} </span> € </p>
        ) : "" }
      
        
        {!isOldEnough && <p className="error">Unfortunately, you do not have permission to buy tickets to this movie.</p>}
        {!enoughMoney && <p className="error">Unfortunately, you do not have enough money to purchase tickets.</p>}
        {purchaseDone && <p className="error">Purchase done successfully. You can see your purchase in My Tickets page.</p>}
          
      </div>
      
    </div>
  )
}

export default ReservationPage