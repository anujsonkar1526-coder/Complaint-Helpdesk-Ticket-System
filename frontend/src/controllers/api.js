const BASE=(import.meta.env.VITE_API_URL||"http://localhost:3000/api").replace(/\/$/,"");

export function token(){
    return localStorage.getItem("token");
}
export function clearSession(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}
export function saveSession(result){
    
    const data=result?.data||result;
    const t=data?.token||data?.accessToken;
    const u=data?.user; 

    if(t)localStorage.setItem("token",t);
    if(u)localStorage.setItem("user",JSON.stringify(u));

    return u||null;
}

export async function request(path,options={})
{
    const headers={"Content-Type":"application/json",
        ...(options.headers||{})};
        const t=token();
     if(t)headers.Authorization=`Bearer ${t}`;
      let res;
        try{
            res=await fetch(BASE+path,{...options,headers});
        }
        catch{
     throw new Error(`Cannot connect to ${BASE}. Is the backend running?`);
        }
        const raw=await res.text();let body={};
        try{
         body=raw?JSON.parse(raw):{};
        }
        catch{
            body={message:raw};}
        if(!res.ok)throw new Error(body.message||body.error||`HTTP ${res.status}`);return body;
        }
export function arrayFrom(r,key){
    if(Array.isArray(r))return r;

        if(Array.isArray(r?.[key]))return r[key];
 if(Array.isArray(r?.data))return r.data;
    if(Array.isArray(r?.data?.[key]))return r.data[key];return [];
}
