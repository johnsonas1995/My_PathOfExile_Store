import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useEffect } from 'react'
import chaosLogo from "./assets/stained.png";
import NavBar from "./components/NavBar.jsx";
import LiveTabBrowser from "./components/LiveTabBrowser";
import CategoryBrowser from "./components/CategoryBrowser";
import OtherGames from "./components/OtherGames";
import ItemDetails from "./components/ItemDetails";
import Cart from "./components/Cart";
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
  const [league, setLeague] = useState("");
  const [platform, setPlatform] = useState("");
  const [itemId, setItemId] = useState('')
  const [itemLeague, setItemLeague] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemBaseType, setItemBaseType] = useState('')
  const [itemInventoryId, setItemInventoryId] = useState('')
  const [itemIcon, setItemIcon] = useState('')
  const [iexplicitMods, setIExplicitMods] = useState('')
  const [iimplicitMods, setIImplicitMods] = useState('')
  const [itemStackSize, setItemStackSize] = useState('')
  const [itemNote, setItemNote] = useState('')

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
    // console.log(user)
    setUser(user)
  }
  useEffect(()=>{
    curr_user()
  },[])

  return (
    <div className="App">
      <NavBar />
      {user && <h8>Signed in as: {user.email} </h8>}
      <><> </>
        {user &&  <button className="buttonS" onClick={signOut}>Sign Out</button>}
      </>
      <br/>
      <br/>
      <Router>
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/liveStash" element={<LiveTabBrowser user={user} 
            league={league} 
            setLeague={setLeague}
            platform={platform}
            setPlatform={setPlatform}
            itemId={itemId}
            setItemId={setItemId}
            itemLeague={itemLeague}
            setItemLeague={setItemLeague}
            itemName={itemName}
            setItemName={setItemName}
            itemBaseType={itemBaseType}
            setItemBaseType={setItemBaseType}
            itemInventoryId={itemInventoryId}
            setItemInventoryId={setItemInventoryId}
            itemIcon={itemIcon}
            setItemIcon={setItemIcon}
            iexplicitMods={iexplicitMods}
            setIExplicitMods={setIExplicitMods}
            iimplicitMods={iimplicitMods}
            setIImplicitMods={setIImplicitMods}
            itemStackSize={itemStackSize}
            setItemStackSize={setItemStackSize}
            itemNote={itemNote}
            setItemNote={setItemNote}
             //it was here that I realized I needed to use context...
            /> }/>
            <Route path="/categories" element={<CategoryBrowser user={user} 
            league={league} 
            setLeague={setLeague}
            platform={platform}
            setPlatform={setPlatform}
            /> }/>
            <Route path="/cart" element={<Cart user={user} 
            league={league} 
            setLeague={setLeague}
            platform={platform}
            setPlatform={setPlatform}
            /> }/>
            <Route path="/itemdetails" element={<ItemDetails user={user} 
            league={league} 
            setLeague={setLeague}
            platform={platform}
            setPlatform={setPlatform}
            itemId={itemId}
            setItemId={setItemId}
            itemLeague={itemLeague}
            setItemLeague={setItemLeague}
            itemName={itemName}
            setItemName={setItemName}
            itemBaseType={itemBaseType}
            setItemBaseType={setItemBaseType}
            itemInventoryId={itemInventoryId}
            setItemInventoryId={setItemInventoryId}
            itemIcon={itemIcon}
            setItemIcon={setItemIcon}
            iexplicitMods={iexplicitMods}
            setIExplicitMods={setIExplicitMods}
            iimplicitMods={iimplicitMods}
            setIImplicitMods={setIImplicitMods}
            itemStackSize={itemStackSize}
            setItemStackSize={setItemStackSize}
            itemNote={itemNote}
            setItemNote={setItemNote}
             //it was here that I realized I needed to use context...
            /> }/>
            <Route path="/other_games" element={<OtherGames user={user} /> }/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
