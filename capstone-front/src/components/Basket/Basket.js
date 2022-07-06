import React from 'react';
import PropTypes from 'prop-types';
import './Basket.css';
import BasketTable from './BasketTable';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserInfo } from '../../UserContext';
import {useContext} from 'react';
import { SERVER_URL } from '../../constants';

// function Basket ({basketItem}, {BuyBasket}) {
  function Basket ({basketItem}, {PurchaseAllItems}) {


  const {user, userId, setUserId, numItems, setNumItems, isAuthenticated} = useContext(UserInfo);

  const handleClick = () => {
    // BuyBasket()
    PurchaseAllItems()
    console.log("purchasing 2 basket");

  }


  // get the details of the user that is logged in
  const getUser = () => {
    // only do if authenticated
    const token = sessionStorage.getItem("jwt");
    fetch (SERVER_URL + 'users/username/' + user["username"], {
      method: 'GET',
      headers: {'Content-Type': 'application/json',
                'Authorization': token}
    })
    .then(response => response.json())
    .then(data => setUserId(data.id))
  }

  // get the user's basket
  async function getBasket() {
// only do if authenticated
    if (isAuthenticated) {
      await getUser();
    const token = sessionStorage.getItem("jwt");
    fetch (SERVER_URL + 'AppUser/get_basket/' + userId, {
      method: 'GET',
      headers: {'Content-Type': 'application/json',
                'Authorization': token}
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }
}



  return(
    <>
      <div className = "BasketPage">
        <h1 class = "name">Basket</h1>
        <BasketTable basketItem={basketItem}/>
        <button><Link to="/">Back</Link></button>
        <Button onClick={handleClick} className="purchase-btn">Purchase All</Button>
      </div>
      <button onClick = {getUser}>GetUser</button>
      <button onClick = {getBasket}>Basky</button>
    </>
  )
}

Basket.propTypes = {};

Basket.defaultProps = {};

export default Basket;
