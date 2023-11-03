import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const Login = ()=>{
    const navigate = useNavigate();
        const  [credentials,setCredentials]= useState({
        email: "",
        password: "",
})
 const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        
        if (json.user_id) {
            localStorage.setItem('token', json.auth_token);
            localStorage.setItem('userid', json.user_id);

            navigate("/profile");
        } else {
            alert("Invalid Credential");
        }
    }

    return(
        <div className="login">
        <div className="fitZing">Fit<span className="zing">Zing</span></div>
        <div className="login-signup-toggle">
            <span className="login-toggle highlight">
                Login
            </span>
            <Link to='/signup' className="signup-toggle">
                Signup
            </Link>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
        <input type='email' value={credentials.email} onChange={onChange} id='email' name='email' placeholder="email" required></input>
        <input type='password' value={credentials.password} onChange={onChange} id='password' name='password' placeholder="password" required></input>
        <button type="submit" className='signup-btn' >Signup</button>

        </form>
        </div>
    )
}