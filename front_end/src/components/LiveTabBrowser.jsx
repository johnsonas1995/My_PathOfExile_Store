import { useState } from "react";
import axios from "axios";

function LiveTabBrowser(user) {
  const [stashItems, setStashItems] = useState([]);
  const [stashTabs, setStashTabs] = useState([]);
  const [numTabs, setNumTabs] = useState(0);
  const [league, setLeague] = useState("");

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
      console.log(response.data.response);
      // let { tabIndex } = useParams()
      setStashItems(response.data.response.items);
    });
  }

  function pullAllTabs() {
    axios.get("stashes/" + league + "/database/pull/").then((response) => {
      console.log(response.data.response);
    });
  }

  return (
    user &&
        <div>
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
            <br />
            <input name="league" type="radio" value="Sanctum" />
            Sanctum
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
          <br/>
          <br/>
          <button
            onClick={() => {
              pullAllTabs(league);
            }}
            className="button"
          >
            Refresh Database for {league} league
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
                  Tab:{stashTab.i} ({stashTab.n})
                </button>{" "}
                <br /> <br />
                {stashItems &&
                  stashItems.map((item) => {
                    return (
                      <div>
                        <img class="item" src={item.icon} /> <br />
                        <h6>{item.name}</h6>
                        {item.baseType} <br />
                        <br />
                        <h6>Explicit Modifiers:</h6>
                        {item.explicitMods &&
                          item.explicitMods.map((mod) => {
                            return (
                              <>
                                <>{mod}</>
                                <br />
                              </>
                            );
                          })}
                        <br />
                        <h6>Implicit Modifiers:</h6>
                        {item.implicitMods} <br />
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div> 
  );
}
export default LiveTabBrowser;
