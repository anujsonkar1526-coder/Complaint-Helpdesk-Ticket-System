import { request } from "./api.js";

export const getComments = (ticketId) => {
  return request(`/comments/${encodeURIComponent(ticketId)}`);
};

export const addComment = (ticketId, message) => {
  return request("/comments", {
    method: "POST",
    body: JSON.stringify({ ticketId, message }),
  });
};
