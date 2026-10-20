import { request } from "./api.js";

export const getTickets = () => {
  return request("/tickets");
};

export const getTicket = (id) => {
  return request(`/tickets/${id}`);
};

export const createTicket = (data) => {
  return request("/tickets", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateTicket = (id, data) => {
  return request(`/tickets/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteTicket = (id) => {
  return request(`/tickets/${id}`, {
    method: "DELETE",
  });
};