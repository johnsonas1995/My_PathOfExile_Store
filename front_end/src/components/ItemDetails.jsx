import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react'
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';

function ItemDetails(props) {
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
        Item Details
        </div>)
}
export default ItemDetails;