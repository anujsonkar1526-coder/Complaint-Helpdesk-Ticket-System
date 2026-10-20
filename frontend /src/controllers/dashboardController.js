import { request } from "./api.js";

export const getDashboard = () => {
  return request("/admin/dashboard");
};