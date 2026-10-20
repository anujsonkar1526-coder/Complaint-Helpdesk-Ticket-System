import {request} from "./api.js";
export const getTickets=()=>request("/tickets");
export const getTicket=(id)=>request(`/tickets/${encodeURIComponent(id)}`);
export const createTicket=(data)=>request("/tickets",{method:"POST",body:JSON.stringify(data)});
