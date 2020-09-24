import React, { useEffect, useState, useReducer } from "react";

import { listProducts as ListProducts } from "../../graphql/queries";
import { onCreateProduct, onDeleteProduct } from "../../graphql/subscriptions";

import { API, graphqlOperation } from "aws-amplify";

import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions";
import Layout from "../../Layout/Layout";
import { useHistory } from "react-router-dom";

const CLIENT_ID = uuid();

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return action.payLoad;

    case "ADD_PRODUCT":
      return [...state, action.payLoad];

    case "REMOVE_PRODUCT":
      return state.filter((p) => p.id != action.payLoad.id);

    default:
      return state;
  }
}

function ProductListing() {
  //const [products, updateProducts] = useState([]);
  const [products, dispatch] = useReducer(reducer, initialState);
  const dispatchToReduxStore = useDispatch();
  let history = useHistory();

  useEffect(() => {
    getProductsData();

    //subscription to new product creation
    const subscription = API.graphql(
      graphqlOperation(onCreateProduct)
    ).subscribe({
      next: (eventData) => {
        const newProduct = eventData.value.data.onCreateProduct;
        if (newProduct.clientId === CLIENT_ID) return;
        console.log(newProduct);

        dispatch({
          type: "ADD_PRODUCT",
          payLoad: newProduct,
        });
      },
    });

    //subscription to  product deletion
    const deleteSubscription = API.graphql(
      graphqlOperation(onDeleteProduct)
    ).subscribe({
      next: (eventData) => {
        const deletedProduct = eventData.value.data.onDeleteProduct;

        if (deletedProduct.clientId === CLIENT_ID) return;
        console.log(deletedProduct);

        dispatch({
          type: "REMOVE_PRODUCT",
          payLoad: deletedProduct,
        });
      },
    });
  }, []);

  const getProductsData = async () => {
    try {
      const productData = await API.graphql(graphqlOperation(ListProducts));
      console.log("Product Data :", productData);
      //updateProducts(productData.data.listProducts.items);
      dispatch({
        type: "SET_PRODUCTS",
        payLoad: productData.data.listProducts.items,
      });
    } catch (err) {
      console.log("error fetching Products...", err);
    }
  };

  return (
    <div>
      <Layout />

      <div className="row">
        {products.map((product) => (
          <div
            className="col-lg-4 col-md-6 col-sm-12 paddingAllSides"
            key={product.id}
          >
            <div className="card ">
              <div className="card-body ">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}</p>
                <div
                  className="btn btn-success marginAllSides"
                  onClick={() => dispatchToReduxStore(addToCart(product))}
                >
                  Add To Cart
                </div>
                <div
                  className="btn btn-primary marginAllSides"
                  onClick={() =>
                    history.push(
                      `/productDetails/${product.name}/${product.id}`
                    )
                  }
                >
                  View Details
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListing;
