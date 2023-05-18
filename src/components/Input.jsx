import React, { useContext, useState } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { ChatContext, ChatContextProvider } from '../context/chatContext';
import{AuthContext} from "../context/AuthContext"
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { blue } from '@mui/material/colors';
function Input() {
  const[text,setText]=useState("");
  const[img,setImg]=useState(null);
  const{currentUser}=useContext(AuthContext);
  const{data}=useContext(ChatContext);
   const handleSend= async()=>{
    if(img)
    {
      const storageRef=ref(storage,uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error)=>{
          console.log(error)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img:downloadURL,
              }),
            });
          })

        }
      )
    }
    else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date:Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
    

   }
   console.log(img);
  return (
     

      <div className='input'>
                <input type="file" style={{display:"none"}} id="file"onChange={(e) => setImg(e.target.files[0])} />
                <label htmlFor='file'>
                   
                <AttachFileIcon className='icon'/>
                
                </label>
                   
                    <input type="text" class="searchterm" placeholder="Type Message"  onChange={(e) => setText(e.target.value)}
        value={text} />
                 
                    <SendIcon  className="icon" sx={{color:blue[500]}} onClick={handleSend}/>
                    
                    

     </div>
  
  )
}

export default Input
