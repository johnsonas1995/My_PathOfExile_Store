import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';




function OtherGames(props) {

    const [games, setGames] = useState([]);

    function getGames() {
        axios.get("othergames/").then((response) => {
          console.log(response.data.response.results)
          setGames(response.data.response.results)
          });
      }

   
    useEffect(()=>{
        getGames()
    }, [])

    return (
        <>
        
        {props.user ? <div>
            
        <h2>Please Play Something Else.. Anything else.</h2>
    
        <div className="cards" >
        {games &&
            games.map((item) => {
            return (
                <div >
                <Card className="cardCart border-light mb-3 style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}">
                    <Card.Header>
                    {item.name}
                    </Card.Header>
                    <Card.Body className="card-body">
                        <Card.Img src={item.background_image} />
                        
                        <Card.Title className="card-header"></Card.Title>
                        <Card.Title className="card-header"></Card.Title>
                        <Card.Text className="card-text">
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
export default OtherGames;