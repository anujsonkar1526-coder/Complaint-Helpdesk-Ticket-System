import React,{useState} from "react";
import {loginUser} from "../controllers/authController.js";

export default function Login({onLogin,onRegister}){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const [busy,setBusy]=useState(false);

    async function submit(e){e.preventDefault();setError("");
        setBusy(true);try{
            const r=await loginUser(email,password);
            if(!r.user)throw new Error("API login response did not include a user. Check your backend response fields.");
            onLogin(r.user)
        }
        catch(e){
            setError(e.message)
        }
        finally{
            setBusy(false)
        }
    }
    return <section className="auth card">
        
        
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Sign in</h1>
        <p className="muted">Manage your support tickets.</p>

        <form onSubmit={submit}>

            <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
            </label>

            <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>
            {
            error&&<p className="error">{error}</p>
            }

            <button className="primary" disabled={busy}>{busy?"Signing in…":"Sign in"
                }
                </button>
                </form>
                <p className="muted center">New here? <button className="link" onClick={onRegister}>Create account</button></p>
                </section>
                }
