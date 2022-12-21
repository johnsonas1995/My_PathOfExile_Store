import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import CategoryItems from './CategoryItems.jsx'

function CategoryBrowser(props) {
  // const [stashItems, setStashItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  

  function pullAllTabs() {
    setIsLoading(true);
    axios.get("stashes/" + props.league + "/database/pull/")
    .then((response) => {
      // console.log("Tabs:",response.data.response);
      // console.log("Categories:",response.data.categories);
      // console.log("Gear:",response.data.gear);
      // console.log("Currency:",response.data.currency);
      // console.log("Gems:",response.data.gems)
      // console.log("Divination:",response.data.divination);
      // console.log("Blight:",response.data.blight);
      // console.log("Delve:",response.data.delve);
      // console.log("Fragment:",response.data.fragment);
      // console.log("Essence:",response.data.essence);
      // console.log("Delirium:",response.data.delirium);
      setCategories(response.data.categories);
      setIsLoading(false)

    });
  }

  function getCategoryItems(category) {
    console.log(category);
    axios.get("category/" + category+ "/").then((response) => {
      console.log(response.data.response)
      setCategory(response.data.response)
      });
  }
  
  
  return (
      <div>
      {isLoading ? <LoadingSpinner/> : CategoryBrowser}
      <div> 
        {props.user ? <div>
          <h2>Category Browser</h2>
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
              pullAllTabs(props.league);
            }}
            className="button btn-outline-light"
            disabled={isLoading}
          >
            Refresh Category Tabs for {props.league} league
          </button>
          <br/>
          <br/>
          {categories &&
                  categories.map((category) => {
                    return (
                      
                      <>
                      <button
                       className="button btn-outline-light"
                       onClick={() => {
                        getCategoryItems(category);
                      }}>{category}
                      </button>
                      </>
                      )})}
          <CategoryItems category={category}/>
        </div> : <>
        <>You must be signed in to view this content.</> <br/>
        <> <a href='/signIn' >Click here to sign In</a><br/>
        <a href="/signUp" >Click here to create an account</a></>
        </>
        }
      </div>
      </div>
  );
}
export default CategoryBrowser;