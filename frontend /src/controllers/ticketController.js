import { request } from "./api.js";

export const getTickets = (isAdmin = false) => {
  const path = isAdmin ? "/admin/tickets" : "/tickets";
         return request(path);
};

export const getTicket = (id, isAdmin = false) => {
  const path = isAdmin ? "/admin/tickets" : "/tickets";
       return request(`${path}/${id}`);
};

export const createTicket = (data) => {
      return request("/tickets", {
 method: "POST",
    body: JSON.stringify(data),
  });
};