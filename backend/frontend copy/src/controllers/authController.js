import {request,saveSession} from "./api.js";
export async function loginUser(email,password){const r=await request("/auth/login",{method:"POST",body:JSON.stringify({email,password})});const user=saveSession(r);return {result:r,user:user||r.user||r.data?.user||null};}
export async function registerUser(form){return request("/auth/register",{method:"POST",body:JSON.stringify(form)});}
