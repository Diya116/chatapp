import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/chatContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
    <React.StrictMode>
    <App />
  </React.StrictMode>
    </ChatContextProvider>
 
  </AuthContextProvider>
  
);


