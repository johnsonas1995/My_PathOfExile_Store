import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useEffect, useState } from 'react'




function CategoryItems(props) {
    
    const[cartItem, setCartItem] = useState('')

    function addToCart(){
        axios.post('add_to_cart/' , {'category': props.category, 'item_id': cartItem})
        .then( response => {
          console.log(response.data)
          
        }) 
      }

    return (
        <div className="cards" >
        {props.category &&
            props.category.map((item) => {
            return (
                <div >
                <Card className="cardItem border-light mb-3 style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}">
                <Card.Header>
                
                    <button onClick={()=>{setCartItem(item.id); addToCart()}} className="button">Add To Cart</button><> </>
                    <button className="button">Details</button>
                </Card.Header>
                <Card.Body className="card-body">
                    <Card.Img class="item" src={item.icon} />
                    
                    <Card.Title className="card-header">{item.name}</Card.Title>
                    <Card.Title className="card-header">{item.baseType}</Card.Title>
                    <Card.Text className="card-text">
                    {/* conditional rendering if item has mods below */}
                    {item.explicitMods ? <>
                    <h5>Explicit Modifiers:</h5> 
                    {item.explicitMods.split(',').map((mod)=>{ //maps through mods to display each (if they exist)
                        return(<>{mod.replace(/[\[\]']+/g,'')}<br/></>) //regex to remove brackets
                    })}
                    </>:<></>}
                    {item.implicitMods ? <>
                    <br/>
                    <h5>Implicit Modifiers:</h5>
                    {item.implicitMods.split(',').map((mod)=>{
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
export default CategoryItems;