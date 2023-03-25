import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/Context";

const SingleProduct = ({ prod }) => {
  const {
    state: { Cart },
    dispatch,
  } = CartState();

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={prod.image} alt={prod.name} />

        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span> Rs {prod.price.split(".")[0]}</span>
            {prod.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days Delivery</div>
            )}
            <Rating rating={prod.reting} />
          </Card.Subtitle>

        {Cart.some((p)=> p.id === prod.id) ? (<Button
            onClick={() => {
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: prod,
              });
            }}
            variant="danger"
          >
            Remove from Cart
          </Button>
          ) : (
            <Button onClick={() => { dispatch({
                type: "ADD_TO_CART",
                payload: prod,
              });
            }}
            disabled={!prod.instock}
          >
            {!prod.instock ? "Out Of Stock" : "Add To Cart"}
          </Button>)}
          
          
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
