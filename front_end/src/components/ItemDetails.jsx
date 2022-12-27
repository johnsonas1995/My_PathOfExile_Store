import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react'
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';

function ItemDetails(props) {
  const [details, setDetails] = useState([]);
  function addToCart(){
      axios.post('add_to_cart/' , {'category': 'live',
                                   'item_id': itemId,
                                   'league': itemLeague, 
                                   'name': itemName,
                                   'baseType': itemBaseType,
                                   'inventoryId': itemInventoryId,
                                   'icon': itemIcon,
                                   'explicitMods': iexplicitMods,
                                   'implicitMods': iimplicitMods,
                                   'stackSize': itemStackSize,
                                   'note': itemNote,
                                   })
      .then( response => {
        console.log(response.data)
        
      }) 
    }

    function getDetails() {
        axios.get("details/").then((response) => {
          console.log(response.data.response[0])
          setDetails(response.data.response)
          props.setLeague
          console.log(details)
          });
    }

    // need to setLeague within this component to search by league. Will currently only query latest league data.(and type)
    function getAnalytics(){
      axios.get(`https://poe.ninja/api/data/currencyoverview?league=Sanctum&type=Currency`)
      .then((response) => {
        console.log(response)
      })
    }
    
    useEffect(()=>{
        getDetails(),
        getAnalytics()
    }, [])

    return (
        <div>
        <h4>Item Details</h4>
        <br/>
        {Object.keys(details).map((obj, i) => {
          return (
            <div>
            {details[obj].name}<br/>
            {details[obj].baseType}<br/><br/>
            <img class="item" src={details[obj].icon} /><br/><br/>
            {details[obj].explicitMods ? <>
                    <h5>Explicit Modifiers:</h5> 
                    {details[obj].explicitMods.split(',').map((mod)=>{ //maps through mods to display each (if they exist)
                        return(<>{mod.replace(/[\[\]']+/g,'')}<br/></>) //regex to remove brackets
                    })}
                    </>:<></>}
                    {details[obj].implicitMods ? <>
                    <br/>
                    <h5>Implicit Modifiers:</h5>
                    {details[obj].implicitMods.split(',').map((mod)=>{
                        return(<>{mod.replace(/[\[\]']+/g,'')}<br/></>)
                    })}
                    </> :<></>}
            </div>
          )
        })}
        </div>
        )
}
export default ItemDetails;