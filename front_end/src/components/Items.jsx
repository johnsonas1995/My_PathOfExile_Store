import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react'
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';

function Items(props) {

  const[itemId, setItemId] = useState('')
  const[itemLeague, setItemLeague] = useState('')
  const[itemName, setItemName] = useState('')
  const[itemBaseType, setItemBaseType] = useState('')
  const[itemInventoryId, setItemInventoryId] = useState('')
  const[itemIcon, setItemIcon] = useState('')
  const[iexplicitMods, setIExplicitMods] = useState('')
  const[iimplicitMods, setIImplicitMods] = useState('')
  const[itemStackSize, setItemStackSize] = useState('')
  const[itemNote, setItemNote] = useState('')
  

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

    return (
        <div className="cards" >
        {props.stashItems &&
            props.stashItems.map((item) => {
            return (
                <div >
                <Card className="cardItem border-light mb-3 style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}">
                <Card.Header>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-custom-2">
                        Options
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark"> 
                        {/* on hover of button, set id of item to send to cart, on click, send current id to cart */}
                        <button  style={{ width: "200px", height: "40px",}} 
                        onMouseEnter={()=>{setItemId(item.id);
                                           setItemLeague(item.league);
                                           setItemName(item.name);
                                           setItemBaseType(item.baseType);
                                           setItemInventoryId(item.inventoryId);
                                           setItemIcon(item.icon);
                                           setIExplicitMods(item.explicitMods);
                                           setIImplicitMods(item.implicitMods);
                                           setItemStackSize(item.stackSize);
                                           setItemNote(item.note);
                                            }} 
                        onClick={()=>{addToCart()}} 
                        className="button">Add To Cart
                        </button><br/>
                        <button  style={{ width: "200px", height: "40px",}} className="button">More Details</button>
                        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                    </Dropdown.Menu>
                    </Dropdown>
                </Card.Header>
                <Card.Body className="card-body">
                    <Card.Img class="item" src={item.icon} />
                    
                    <Card.Title className="card-header">{item.name}</Card.Title>
                    <Card.Title className="card-header">{item.baseType}</Card.Title>
                    <Card.Text className="card-text">
                    {item.explicitMods ? <>
                    <h5>Explicit Modifiers:</h5> 
                    {item.explicitMods.map((mod)=>{ //maps through mods to display each (if they exist)
                        return(<>{mod.replace(/[\[\]']+/g,'')}<br/></>) //regex to remove brackets
                    })}
                    </>:<></>}
                    {item.implicitMods ? <>
                    <br/>
                    <h5>Implicit Modifiers:</h5>
                    {item.implicitMods.map((mod)=>{
                        return(<>{mod.replace(/[\[\]']+/g,'')}<br/></>)
                    })}
                    </> :<></>}
                   
                    </Card.Text>
                    </Card.Body>
                </Card>
                </div>
                
            );
            })}
            </div>)
}
export default Items;