import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions";
import Layout from "../../Layout/Layout";

function Cart() {
  const productsInCart = useSelector(
    (state) => state.cart.uniqueProductsInCart
  );

  const productOccurrenceById = useSelector((state) => state.cart.productMap);

  const totalCartValue = useSelector((state) => state.cart.cartValue);

  const dispatchToReduxStore = useDispatch();

  useEffect(() => {}, [totalCartValue]);

  return (
    <div>
      <Layout />
      <h1>Total Cost : {totalCartValue}</h1>

      <div className="row">
        {productsInCart.map((product) => (
          <div
            className="col-lg-12 col-md-12 col-sm-12 paddingAllSides"
            key={product.id}
          >
            <div className="card ">
              <div className="card-body ">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 paddingAllSides">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.price}</p>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 paddingAllSides">
                    <p className="card-text">{`Quantity : ${product.quantity}`}</p>
                    <div
                      className="btn btn-success marginAllSides"
                      onClick={() => dispatchToReduxStore(addToCart(product))}
                    >
                      Add
                    </div>

                    <div
                      className="btn btn-danger marginAllSides"
                      onClick={() =>
                        dispatchToReduxStore(removeFromCart(product))
                      }
                    >
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
