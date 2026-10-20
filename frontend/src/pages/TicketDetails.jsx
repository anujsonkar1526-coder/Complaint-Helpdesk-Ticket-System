import React,{useEffect,useState} from "react";
import {getTicket} from "../controllers/ticketController.js";

export default function TicketDetails({id,onBack}){
    
    const [ticket,setTicket]=useState(null);
    const [error,setError]=useState("");
    
 useEffect(()=>{getTicket(id)
        
        .then(r=>setTicket(r.ticket||r.data?.ticket||r.data||r))
        
   .catch(e=>setError(e.message))},[id]);
        
        return <section className="card formcard">
            
    <button className="link" onClick={onBack}>← Back to tickets</button>
            
            {
        error&&<p className="error">{error}</p>
         }
          {
        !ticket&&!error&&<p>Loading ticket…</p>
            }
         {
            ticket&&<>
        <p className="eyebrow">TICKET DETAILS</p>
            
            <h1>{ticket.title||ticket.subject||"Ticket"}</h1>
            
    <p className="muted">Status: {ticket.status||"Open"} · Priority: {ticket.priority||"Normal"}</p>
            
        <p className="description">{ticket.description||"No description"}</p>
            </>
            }
     </section>}
