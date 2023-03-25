import React from "react";
import {
  Badge,
  Container,
  Dropdown,
  FormControl,
  Navbar,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";

const Header = () => {
  const {
    state: { Cart },
    dispatch,
    productDispatch
  } = CartState();

 

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping App</Link>
        </Navbar.Brand>

        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="search a product"
            className="m-auto"
            onChange={(e) => {
                productDispatch({type: "FILTER_BY_SEARCH", payload: e.target.value,});
            }}
          />
        </Navbar.Text>

        <nav>
          <Dropdown alighRight>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{Cart.length}</Badge>
            </Dropdown.Toggle>
            <div className="cartmanu">
              <Dropdown.Menu style={{ minWidth: 370 }}>
                {Cart.length > 0 ? (
                  <>
                    {Cart.map((prod) => (
                      <span className="cartitem" key={prod.id}>
                        <img
                          src={prod.image}
                          className="cartitemimg"
                          alt={prod.name}
                        />
                        <div className="cartitemDetail">
                          <span>{prod.name}</span>
                          <span> Rs {prod.price.split(".")[0]}</span>
                        </div>
                        <AiFillDelete
                          fontSize="20px"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: prod,
                            })
                          }
                        />
                      </span>
                    ))}

                    <Link to="/cart">
                      <button style={{ width: "95%", margin: "0 10px" }}>
                        Go To Cart
                      </button>
                    </Link>
                  </>
                ) : (
                  <span style={{ padding: 20 }}> Cart is Empty!</span>
                )}
              </Dropdown.Menu>
            </div>
          </Dropdown>
        </nav>
      </Container>
    </Navbar>
  );
};

export default Header;
