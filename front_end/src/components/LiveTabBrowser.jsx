import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import axios from "axios";
import Items from './Items.jsx'

function LiveTabBrowser(props) {
  const [stashItems, setStashItems] = useState([]);
  const [stashTabs, setStashTabs] = useState([]);
  const [numTabs, setNumTabs] = useState(0);
  
  function getNumStashTabs() {
    axios.get("stashes/" + props.league + "/0/").then((response) => {
      // console.log(response.data.response["numTabs"]);
      // console.log(response.data.response.tabs);
      setNumTabs(response.data.response["numTabs"]);
      setStashTabs(response.data.response.tabs);
    });
  }

  function getStashTab(tabIndex) {
    axios.get("stashes/" + props.league + "/" + tabIndex + "/").then((response) => {
      console.log(response.data.response.items);
      // console.log(response.data.response);
      // let { tabIndex } = useParams()
      if (response.data.response.items.length > 0) {
        setStashItems(response.data.response.items)
      }
    
      console.log(stashItems)
    });
  }

  

  return (
      <div>  
        {props.user ? <div>
        <h2>Live Tab Browser</h2>
           <h4>Select League:</h4>
          <div
            onChange={(event) => {
              props.setLeague(event.target.value);
            }}
          >
            <input name="league" type="radio" value="Standard" />
            <>  Standard</>
            <br />
            <input name="league" type="radio" value="Hardcore" />
            <>  Hardcore</>
            <br />
            <input name="league" type="radio" value="Sanctum" />
            <>  Sanctum</>
          </div>
          {/* <div
            onChange={(event) => {   ////////need to ask for oath2 key for playstation and xbox accounts
              props.setPlatform(event.target.value);
            }}
          >
            <input name="platform" type="radio" value="pc" />
            <>  PC</>
            <br />
            <input name="platform" type="radio" value="playstation" />
            <>  PlayStation</>
            <br />
            <input name="platform" type="radio" value="xbox" />
            <>  Xbox</>
          </div> */}
          <br />
          <button
            onClick={() => {
              getNumStashTabs(props.league);
            }}
            className="button btn-outline-light"
          >
            Get Current Stash Tabs for {props.league} league
          </button>
          <br/>
          <br/>
          <p>
            {numTabs} Tabs in {props.league} league <br/>
            Brows Tabs below:
          </p>
          {stashTabs && stashTabs.map((stashTab) => {
            return (
              <>
                    <button className="button btn-outline-light" onClick={() => getStashTab(stashTab.i)}>
                    {stashTab.n}
                    </button>
              </>
            )})}
          <Items stashItems={stashItems}/>
        </div> : <>
        <>You must be signed in to view this content.</> <br/>
        <> <a href='/signIn' >Click here to sign In</a><br/>
        <a href="/signUp" >Click here to create an account</a></>
        </>
        }
      </div>
  );
}
export default LiveTabBrowser;
