import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

function Login() {
  const[err,seterr]=useState(false);
  const navigate=useNavigate();
  const handlesubmit=async(e)=>{
    e.preventDefault();
     const email=e.target[0].value;
    const password=e.target[1].value;
   
   try{
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    
} catch (err) {
seterr(true);

} }
  return (
    <div className='formContainer'>
    <h1>chit chat</h1>
    <h3>Login</h3>
    <div className='form'>
      <form onSubmit={handlesubmit}>
       
        <input type="email" placeholder=' Enter your email'/>
        <input type="password" placeholder=' Password'/>
     
        <button className='btn'>Login!</button>
        </form> 

        <p>You don't have account?</p>  
        <Link to="/register">Register</Link>
        {err && <span> something went wrong </span>}
    </div>
  
</div>
  )
}

export default Login
