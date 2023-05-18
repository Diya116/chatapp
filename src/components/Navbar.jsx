import { Add } from '@mui/icons-material'
import React, { useContext } from 'react'
import Searchbar from './Searchbar'
import userimg from "../assets/userimg.jpeg"
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
function Navbar() {
   const{currentUser}=useContext(AuthContext);
  return (
    <div className='navbar'>
    
     <div className='userinfo'>
        <div className='info'>
     <img src={currentUser.photoURL}alt="userimg"className="userphoto"/>
     <div className='user'>
     <span className='username'>{currentUser.displayName
}
     </span>
     <span className='userid'>{currentUser.email
}</span>
     </div>
     </div>
     <div className='logout' onClick={()=>signOut(auth)}>
        <LogoutIcon />
     </div>
     </div>
      </div>
    
  )
}

export default Navbar
