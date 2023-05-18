import "./style.scss"
import './App.css';
import Register from './pages/Register';
import { BrowserRouter as Router,Route,Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Chat from "../src/components/Chat"
function App() {  

  const{currentUser}=useContext(AuthContext);
  const ProtectedRoute=({children})=>{
    if(!currentUser) 
    { 
       return <Navigate to="/login"/>;
    }
    return children;
  }
  console.log(currentUser); 
  return (
   <div>
    <Router>
      <Routes>
        <Route path="/"> 
        <Route index element={
        <ProtectedRoute> 
          <Home/>
        </ProtectedRoute>}/>
        <Route path="/register" Component={Register}/>
        <Route path="/login" Component={Login}/>
        <Route path="/chat" Component={Chat}/>
        </Route>
      </Routes>
    </Router>
  
    </div>
  );
}

export default App;
