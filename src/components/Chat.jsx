import React, { useContext } from 'react'
import CallIcon from '@mui/icons-material/Call';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { blue } from '@mui/material/colors';
import userimg from "../assets/userimg.jpeg"
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/chatContext';
function Chat() {
  const{data}=useContext(ChatContext);
  console.log("data",data.user.displayName);
  console.log("data",data.user.photoURL
  );
  return (
    <div className='chat'>
       <div className='chatinfo'>
       <div className='userimg'> 
            <img src={data.user.photoURL} className='userphoto'/>
        </div>
        <span className='username'>{data.user?.displayName}</span>
        <div className='chaticons'>
        <CallIcon sx={{color:blue[500]}} className='icon' />
        <CameraAltIcon sx={{color:blue[500]}} className='icon'/>
        </div>
       
       </div>
       <Messages/>
       <Input/>
    </div>
  )
}

export default Chat
