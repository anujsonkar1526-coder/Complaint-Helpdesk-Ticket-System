import {request} from "./api.js";

export const getComments=(id)=>request
(`/comments/${encodeURIComponent(id)

}`);
export const addComment=(id,text)=>request(
    `/comments/${encodeURIComponent(id)}`,

    {method:"POST",body:JSON.stringify({text,comment:text}
        
    )});
