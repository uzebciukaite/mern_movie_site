import React, {useContext, useEffect, useState} from 'react'
import mainContext from '../context/mainContext'

const TicketPage = () => {

    const {socket, purchasedTickets } = useContext(mainContext) 



  return (
    <div>
        {purchasedTickets.map((x,i) => (
            <div key={i} className="ticketgroup">
                <h4 >Bought on: {x.date}</h4>
                <div>
                    {x.purchaseInfo.seats.map((seat, i) => (
                    <div key={i} className="singleticket">
                        <h3>Movie: {x.purchaseInfo.movie}</h3>
                        <p>Seat: {seat}</p>
                        
                    </div>
                ))}
                </div>
                
            </div>
            
            
        ))}
    </div>
  )
}

export default TicketPage