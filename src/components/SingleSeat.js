import React from 'react'

const SingleSeat = ({seat, enableButton, pickedSeats}) => {

    const findIfSelected = pickedSeats.find(x => x === seat.seatNumber)
    const bgStyle = seat.reserved !== "" ? "reserved" : "available"
    
  return (
    <div 
        onClick={enableButton} 
        style={{border: findIfSelected? "2px solid #990000" : "none"}} 
        className={bgStyle}>
        {seat.seatNumber}
    </div>
  )
}

export default SingleSeat