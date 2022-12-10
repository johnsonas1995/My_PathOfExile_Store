import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import chaosLogo from "./assets/stained.png";
import NavBar from "./components/NavBar.jsx";
import DatabaseManager from "./assets/pages/DatabaseManager.jsx";
import LiveTabBrowser from "./components/LiveTabBrowser";
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

  return (
    <div className="App">
      <NavBar />
      <div class="pic">
        <img className="logo" src={chaosLogo} />
      </div>
      <LiveTabBrowser />
      <Router>
          <Routes>
            <Route path="/database/management" element={<DatabaseManager />}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
