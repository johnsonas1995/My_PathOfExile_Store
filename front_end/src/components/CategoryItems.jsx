import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';

function CategoryItems(props) {
    return (
        <div className="cards" >
        {props.category &&
            props.category.map((item) => {
            return (
                <div >
                <Card className="cardItem border-light mb-3 style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}">
                <Card.Body className="card-body">
            
                    <Card.Img class="item" src={item.icon} />
                    
                    <Card.Title className="card-header">{item.name}</Card.Title>
                    <Card.Title className="card-header">{item.baseType}</Card.Title>
                    <Card.Text className="card-text">
                    <h6>Explicit Modifiers:</h6>
                    {item.explicitMods}
                    <h6>Implicit Modifiers:</h6>
                    {item.implicitMods}
                    <br/>
                    <button className="button">Add To Cart</button>
                    <br/>
                    <button className="button">Details</button>
                    </Card.Text>
                    </Card.Body>
                </Card>
                </div>
                
            );
            })}
            </div>)
}
export default CategoryItems;