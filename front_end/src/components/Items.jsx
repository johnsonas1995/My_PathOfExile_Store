import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react'
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';

function Items(props) {
    console.log('props',props)
    function addToCart(){
        axios.post('add_to_cart/' , {'category': 'live',
                                    'item_id': props.itemId,
                                    'league': props.itemLeague, 
                                    'name': props.itemName,
                                    'baseType': props.itemBaseType,
                                    'inventoryId': props.itemInventoryId,
                                    'icon': props.itemIcon,
                                    'explicitMods': props.iexplicitMods,
                                    'implicitMods': props.iimplicitMods,
                                    'stackSize': props.itemStackSize,
                                    'note': props.itemNote,
                                    })
        .then( response => {
            console.log(response.data)
        
            
        }) 
        }

        function addToDetails(){
            axios.post('add_to_details/' , {'category': 'live',
                                        'item_id': props.itemId,
                                        'league': props.itemLeague, 
                                        'name': props.itemName,
                                        'baseType': props.itemBaseType,
                                        'inventoryId': props.itemInventoryId,
                                        'icon': props.itemIcon,
                                        'explicitMods': props.iexplicitMods,
                                        'implicitMods': props.iimplicitMods,
                                        'stackSize': props.itemStackSize,
                                        'note': props.itemNote,
                                        })
            .then( response => {
                console.log(response.data)
            
                
            }) 
            }
    function handleHover(item){
        props.setItemId(item.id);
        props.setItemLeague(item.league);
        props.setItemName(item.name);
        props.setItemBaseType(item.baseType);
        props.setItemInventoryId(item.inventoryId);
        props.setItemIcon(item.icon);
        props.setIExplicitMods(item.explicitMods);
        props.setIImplicitMods(item.implicitMods);
        props.setItemStackSize(item.stackSize);
        props.setItemNote(item.note);
    };

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
                        onMouseEnter={()=>handleHover(item)} 
                        onClick={()=>{addToCart()}} 
                        className="button">Add To Cart
                        </button><br/>
                        <div className="buttonL" style={{ width: "200px", height: "40px",}} >
                        <a  href="/itemdetails"
                            onMouseEnter={()=>handleHover(item)} 
                            onClick={()=>{addToDetails()}} 
                            >Details/Value Analytics  
                        </a>
                        </div>
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