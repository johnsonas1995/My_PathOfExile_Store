import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import chaosLogo from "./assets/chaos.jpeg";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TabPage from "./pages/TabPage";
// import Search from './components/Search.jsx'

function App() {
  const [stashItems, setStashItems] = useState([]);
  const [stashTabs, setStashTabs] = useState([]);
  const [numTabs, setNumTabs] = useState(0);
  const [league, setLeague] = useState("");

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

  function getNumStashTabs() {
    axios.get("stashes/" + league + "/0/").then((response) => {
      console.log(response.data.response["numTabs"]);
      console.log(response.data.response.tabs);
      setNumTabs(response.data.response["numTabs"]);
      setStashTabs(response.data.response.tabs);
    });
  }

  function getStashTab(tabIndex) {
    axios.get("stashes/" + league + "/" + tabIndex + "/").then((response) => {
      console.log(response.data.response.items);
      setStashItems(response.data.response.items);
    });
  }

  return (
    <div className="App">
      <h1>Inventory</h1>
      <div class="pic">
        <img className="logo" src={chaosLogo} />
      </div>
      <h4>Select League:</h4>
      <div
        onChange={(event) => {
          setLeague(event.target.value);
        }}
      >
        <input name="league" type="radio" value="Standard" />
        Standard
        <></>
        <br />
        <input name="league" type="radio" value="Hardcore" />
        Hardcore
      </div>
      <br />
      <button
        onClick={() => {
          getNumStashTabs(league);
        }}
        className="button"
      >
        Get Stash Tabs for {league} league
      </button>
      <br />
      <br />
      <p>
        {numTabs} Tabs in {league} league
      </p>
      {stashTabs.map((stashTab) => {
        return (
          <div>
            <button className="button" onClick={() => getStashTab(stashTab.i)}>
              {" "}
              {stashTab.i}: {stashTab.n}
            </button>{" "}
            <br /> <br />
            {stashItems &&
              stashItems.map((item) => {
                return (
                  <>
                    <img class="item" src={item.icon} /> <br />
                    Name: {item.name} <br />
                    Base:{item.baseType} <br />
                    <br />
                    <h6>Explicit Modifiers:</h6>
                    {item.explicitMods} <br />
                    <br />
                    <h6>Implicit Modifiers:</h6>
                    {item.implicitMods} <br />
                  </>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
