import React, { useState } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { storage,auth ,db} from '../firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Register() {
  const[err,seterr]=useState(false);
  const navigate=useNavigate();
  const handlesubmit=async(e)=>{
    e.preventDefault();
   const displayName
   =e.target[0].value;
     const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];
   try{
    console.log(e.target[0].value);
    const res= await createUserWithEmailAndPassword(auth, email, password);
const storageRef = ref(storage,`${displayName
}`);
await uploadBytesResumable(storageRef, file).then(() => {
  getDownloadURL(storageRef).then(async (downloadURL) => {
    try {
      //Update profile
      await updateProfile(res.user, {
        displayName
,
        photoURL: downloadURL,
      });
      //create user on firestore
     await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,

        email,
        photoURL: downloadURL,
      });
      await setDoc(doc(db,"userChats",res.user.uid),{});
      navigate("/");

      //create empty user chats on firestore
      // await setDoc(doc(db, "userChats", res.user.uid), {});
      
    } catch (err) {
      console.log(err);
      seterr(true);
     
    }
  });
});
} catch (err) {
seterr(true);

} };
  return (
    <div className='formContainer'>
      <div className='form'>
        <h1>chit chat</h1>
        <h3>Register</h3>
      
          <form onSubmit={handlesubmit}>
            <input type="text" placeholder=' Enter your username'/>
            <input type="email" placeholder=' Enter your email'/>
            <input type="password" placeholder=' Password'/>
           
            <input style={{display:"none"}} type="file" id="filee" /> 
            <label htmlFor='filee'>
                <AddAPhotoIcon color="blue"/>
                <span>Add profile pic</span>
            </label>
           
            <button className='btn'>Sign up!</button>
            {err && <span> something went wrong </span>}
            </form> 
            <p>You do have an account?<span>Login</span></p>  
        </div>
      
    </div>
  )
}

export default Register
