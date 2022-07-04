import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductList.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const ProductList = (props) => {

  const [products, setProducts] = useState([]);


  useEffect(() =>{
    axios.get(props.address)
      .then(response =>{
        setProducts(response.data);
      })
    }, [])
   
  const handleClickToDetailPage = () => {
    
  }

return(
  <>

    <Row xs={1} xl = {4} sm = {2} md={3} className="g-4 all-products">
    {Array.from(products, (product) => {

      let productCategoryLowerCase = product.category.toLowerCase();
      let productCategoryAfter = productCategoryLowerCase[0].toUpperCase() + productCategoryLowerCase.substr(1);

      return(
        
      

        <Col key= {product.id}>
        <Card style={{ width: '18rem'}} className = "each-card"  >
          <Card.Img variant="top" src= {product.pictureAddress} />
          <Card.Body>
                <Card.Title>{product.name}</Card.Title>
              <Card.Subtitle>{productCategoryAfter}</Card.Subtitle>
              <Card.Subtitle>{`£ ${product.price}`}</Card.Subtitle>
              <Card.Text>
                free-delivery
              </Card.Text>

              <Button variant="primary" className='btn' onClick = {handleClickToDetailPage}>purchase</Button>
            </Card.Body>
          </Card>
        </Col>)})}
    </Row>

  </>

)};


// ProductList.propTypes = {};

// ProductList.defaultProps = {};

export default ProductList;
