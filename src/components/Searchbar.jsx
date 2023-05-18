import React,{useContext, useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { collection, query, where,getDocs,doc,updateDoc, serverTimestamp,setDoc,getDoc} from "firebase/firestore";
import { db } from '../firebase';
import userEvent from '@testing-library/user-event';
import {AuthContext} from "../context/AuthContext"

function Searchbar() {
  const {currentUser}=useContext(AuthContext);
  const[username,setUsername]=useState("");
  const[user,setUser]=useState(null);
  const[err,seterr]=useState(false);
  const handleSearch=async()=>{
    const q=query(
      collection(db,"users"),
      where("displayName","==",username)
    );
   
    try{
      const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
     setUser(doc.data());
     console.log("user",user);
    // const querySnapshot = await getDocs(q);
  });
}
  catch(err)
  {
    seterr(true);
  }
};
  const handlekey=(e)=>{
    e.code === "Enter" && handleSearch();
       
  };
  const handleselect=async(e)=>{
    console.log("hii")
    const combineid=currentUser.uid>user.uid?currentUser.uid+user.uid:user.uid+currentUser.uid;
   try{
    const res=await getDoc(doc(db,"chats",combineid));
    if(!res.exists()){
       await setDoc(doc(db,"chats",combineid),{messages:[]});
       await updateDoc(doc(db,"userChats",currentUser.uid),{
        [combineid+".userInfo"]:{
          uid:user.uid,
          displayName:user.displayName,
          photoURL:user.photoURL

        },
        [combineid+".date"]:serverTimestamp(),
       });
       await updateDoc(doc(db,"userChats",user.uid),{
        [combineid+".userInfo"]:{
          uid:currentUser.uid,
          displayName:currentUser.displayName,
          photoURL:currentUser.photoURL

        },
        [combineid+".date"]:serverTimestamp()
       });
    }
  } 
   catch(err){}
   
   setUser(null);
   setUsername("")
   
  }
  return (
    <div className='searchbar'>
   
    <div className='search'>
                    <SearchIcon />
                    <input type="text" class="searchterm" placeholder="search...." 
                    onChange={(e)=>setUsername(e.target.value)}
                    onKeyDown={handlekey}
                    value={username}
                    />
     
     </div>
     {err &&<span>user not found</span>}
    {user && (<div className="userChat" onClick={handleselect}>
          <div>
          <img src={user.photoURL} alt="me" className='userphoto'/>
          </div>
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>)}
      
    </div>
  );
};

export default Searchbar
