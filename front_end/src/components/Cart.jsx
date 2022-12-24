import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';




function Cart(props) {

    const[cartItem, setCartItem] = useState('')
    const [cart, setCart] = useState([]);

    function getCart() {
        axios.get("cart/").then((response) => {
          console.log(response.data.response)
          setCart(response.data.response)
          console.log(cart)
          });
      }

    function removeFromCart(){
        axios.post('remove_from_cart/' , {'item_id': cartItem})
        .then( response => {
          console.log(response.data)
          window.location.reload()
          
        }) 
      }
    useEffect(()=>{
        getCart()
    }, [])

    return (
        <>
        {props.user ? <div>
        <h2>Your Cart</h2>
        <div className="cards" >
        {cart &&
            cart.map((item) => {
            return (
                <div >
                <Card className="cardCart border-light mb-3 style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}">
                <Card.Header>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-custom-2">
                        Options
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark"> 
                        {/* on hover of button, set id of item to send to cart, on click, send current id to cart */}
                        <button  style={{ width: "200px", height: "40px",}} className="button">More Details</button>
                        <button  onMouseEnter={()=>{setCartItem(item.id)}} onClick={()=>{removeFromCart()}} style={{ width: "200px", height: "40px",}} className="button">Remove From Cart</button>
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
            </div>
            </div> : <>
        <>You must be signed in to view this content.</> <br/>
        <> <a href='/signIn' >Click here to sign In</a><br/>
        <a href="/signUp" >Click here to create an account</a></>
        </>
        }
            </>)
}
export default Cart;