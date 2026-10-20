import { request } from "./api.js";

export const getDepartments = () => {
  return request("/departments");
};