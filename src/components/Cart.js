import React, { useState, useEffect } from 'react'
import { CartState } from '../context/Context';
import {Button, ListGroup, Row, Col, Form, Image} from "react-bootstrap"
import  Rating  from './Rating'
import { AiFillDelete } from 'react-icons/ai';

const Cart = () => {
  const{
    state: {Cart},
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      Cart.reduce((acc, curr)=> acc + Number(curr.price)* curr.qty, 0)
    )
  }, [Cart]);  


  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {Cart.map((prod)=>(
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>Rs {prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.rating} />
                </Col>
                <Col md={2}>
                  <Form.Control as="select" value={prod.qty}
                  onChange = {(e) => 
                  dispatch({
                    type : "CHANGE_CART_QTY",
                     payload:{id: prod.id, qty: e.target.value,},
                  })
                  }
                  >
                  {
                    [...Array(prod.instock).keys()].map((x) => (<option key={x + 1} > {x + 1} </option> ))}

                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button type='button' variant='light' onClick={() => dispatch({type: "REMOVE_FROM_CART", payload: prod})}>
                    <AiFillDelete fontSize="20" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
            ))}
        </ListGroup>
      </div>

      <div className="filters summary">
        <span className="title">Subtotal ({Cart.length}) Items</span>

        <span style={{ fontWeight: 700, fontSize: 20}}>Total: Rs{total}</span>

        <Button type='button' disabled={Cart.length === 0}>Proceed To </Button>
      </div>
    </div>
  )
}

export default Cart