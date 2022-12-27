import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react'
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';

function ItemDetails(props) {
  const [details, setDetails] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [item, setItem] = useState([]);
  // const [name, setName] = useState('');
  const [sparkLine, setSparkLine] = useState([]);
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

    // function getDetails() {
        
    // }

    // need to setLeague within this component to search by league. Will currently only query latest league data.(and type)
    function getAnalytics(){
      let name = 'Orb of Chance'
      axios.get("details/").then((response) => {
        // console.log(response.data.response[0]["baseType"])
        // setName(response.data.response[0]["baseType"])
        name = response.data.response[0]["baseType"]
        console.log(name)
        setDetails(response.data.response)
        });
      axios.get("analytics/")
      .then((response) => {
        let allItems = response.data.response.lines
        setAllItems(response.data.response.lines)
        console.log('importantname:',name)
        let item = allItems.find(({ currencyTypeName }) => currencyTypeName === name)
        setItem (allItems.find(({ currencyTypeName }) => currencyTypeName === name))
        console.log('spark:',item.paySparkLine.data)
        setSparkLine(item.paySparkLine.data)
        console.log(allItems)
        console.log(item)
        
      })
    }
    
    useEffect(()=>{
        // getDetails(),
        getAnalytics()
    }, [])

    return (
        <div>
        <h4>Item Details</h4>
        <h6>Analytics Powered by POE Ninja</h6>
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
        {Object.keys(item).map((i) => {
          return (
            <div>
            <br/><br/>
            {item.detailsId}<br/>
            Current Chaos Value: {item.chaosEquivalent}<br/><br/>
            </div>
          )
        })}
        
        </div>
        )
}
export default ItemDetails;