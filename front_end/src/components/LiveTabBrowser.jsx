import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import axios from "axios";

function LiveTabBrowser(props) {
  const [stashItems, setStashItems] = useState([]);
  const [stashTabs, setStashTabs] = useState([]);
  const [numTabs, setNumTabs] = useState(0);
  
  

  function getNumStashTabs() {
    axios.get("stashes/" + props.league + "/0/").then((response) => {
      console.log(response.data.response["numTabs"]);
      console.log(response.data.response.tabs);
      setNumTabs(response.data.response["numTabs"]);
      setStashTabs(response.data.response.tabs);
    });
  }

  function getStashTab(tabIndex) {
    axios.get("stashes/" + props.league + "/" + tabIndex + "/").then((response) => {
      console.log(response.data.response.items);
      console.log(response.data.response);
      // let { tabIndex } = useParams()
      setStashItems(response.data.response.items);
    });
  }

  return (
      <div> 
            
        {props.user ? <div>
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
          <br />
          <button
            onClick={() => {
              getNumStashTabs(props.league);
            }}
            className="button"
          >
            Get Current Stash Tabs for {props.league} league
          </button>
          <br/>
          <br/>
          <p>
            {numTabs} Tabs in {props.league} league
          </p>
          {stashTabs && stashTabs.map((stashTab) => {
            return (
              <div>
                <Card className="card card border-light mb-3">
                  <button className="button" onClick={() => getStashTab(stashTab.i)}>
                    Tab:{stashTab.i} ({stashTab.n})
                  </button>
                </Card>
                  
                  {stashItems &&
                    stashItems.map((item) => {
                      return (
                        <div>
                          <Card className="cardItem border-light mb-3">
                            <Card.Img class="item" src={item.icon} />
                              <Card.Body className="card-body">
                              <Card.Title className="card-header">{item.name}</Card.Title>
                              <Card.Title className="card-header">{item.baseType}</Card.Title>
                              <Card.Text className="card-text">
                              <h6>Explicit Modifiers:</h6>
                              {item.explicitMods &&
                                item.explicitMods.map((mod) => {
                                  return (
                                    <>
                                      <>{mod}</>
    
                                    </>
                                  );
                                })}
            
                              <h6>Implicit Modifiers:</h6>
                              {item.implicitMods}
                              </Card.Text>
                              </Card.Body>
                          </Card>
                          </div>
                      );
                    })}
              </div>
            );
          })}
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
