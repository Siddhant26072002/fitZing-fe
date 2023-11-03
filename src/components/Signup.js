import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export const Signup = ()=>{
    const navigate = useNavigate();
    const  [credentials,setCredentials]= useState({
        email: "",
        password: "",
        cpassword: ""
})
 const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
    
        const response = await fetch("http://localhost:5000/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password: credentials.password,confirm_password: credentials.cpassword,
            email: credentials.email })
        });
        console.log(response);
        const json = await response.json()
        if(json.message === 'User created'){
            navigate("/login");
        }else{
            alert("Invalid Credential");
        }
    }

    return(
        <div className="signup">
        <div className="fitZing">Fit<span className="zing">Zing</span></div>
        <div className="login-signup-toggle">
            <Link to='/login' className="login-toggle">
                Login
            </Link>
            <span className="signup-toggle highlight">
                Signup
            </span>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
        <input type='email' value={credentials.email} onChange={onChange} id='email' name='email' placeholder="email" required></input>
        <input type='password' value={credentials.password} onChange={onChange} id='password' name='password' placeholder="password" required></input>
        <input type='password' value={credentials.cpassword} onChange={onChange} id='cpassword' name="cpassword" placeholder="confirm password" required></input>
        <button type="submit" className='signup-btn' >Signup</button>

        </form>
        </div>
    )
}