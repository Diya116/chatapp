import React, { useContext, useEffect, useState } from 'react'
import userimg from "../assets/userimg.jpeg"
import { onSnapshot,doc } from 'firebase/firestore'
import{AuthContext, currentUser} from "../context/AuthContext"
import { db } from '../firebase'
import { ChatContext } from '../context/chatContext'
import { Navigate } from 'react-router-dom'
function Chats() {
  const {currentUser}=useContext(AuthContext)
  const[chats,setChats]=useState([]);
  const { dispatch } = useContext(ChatContext);
  useEffect(()=>{
    const getChats=()=>{
      const unsub=onSnapshot(doc(db,"userChats",currentUser.uid),(doc)=>{
        setChats(doc.data());
      });
      return()=>{
        unsub();
      };
    };
    currentUser.uid&&getChats();
  },[currentUser.uid]);
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
   
  };
  console.log(Object.entries(chats));
  return (
    <div className='chatss'>
      {Object.entries(chats)?.map(chat=>(
        <div className='chats' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
    <div className='userimg'>
   <img className="userphoto" src={chat[1].userInfo.photoURL?chat[1].userInfo.photoURL:{userimg}}/>
</div>
<div className='userinfo'>
   
        <span className='username'>{chat[1].userInfo.displayName}</span>
    
    <div className='chatdescription'>
        <span>{chat[1].userInfo.lastMessage?.text}</span>
    </div>
</div>
</div>
      ))}
     
    </div>
  )
}

export default Chats
