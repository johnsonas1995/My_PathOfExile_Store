import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useEffect } from 'react'
import chaosLogo from "./assets/stained.png";
import NavBar from "./components/NavBar.jsx";
import LiveTabBrowser from "./components/LiveTabBrowser";
import SignUp from "./views/SignUp";
import SignIn from './views/SignIn'
import "./App.css";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
// import Search from './components/Search.jsx'

function App() {
  const [user, setUser]= useState(null)

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const csrftoken = getCookie("csrftoken");
  axios.defaults.headers.common["X-CSRFToken"] = csrftoken;

  const signOut=async()=>{
    let myResponse=await axios.post('signOut/')
    if (myResponse.data["signout"]==true){
      window.location.reload()
    }
  }

  const curr_user=async()=>{
    let myResponse=await axios.get('current_user')
    let user= myResponse.data && myResponse.data[0] && myResponse.data[0].fields
    console.log(user)
    setUser(user)
  }
  useEffect(()=>{
    curr_user()
  },[])

  return (
    <div className="App">
      <NavBar />
      {user && <h5>Welcome {user.email}</h5>}
      <div>
        {user && <button className="button" onClick={signOut}>Sign Out</button>}
      </div>
      <br/>
      <Router>
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/liveStash" element={<LiveTabBrowser user={user}/> }/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
