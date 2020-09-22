import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../actions";
import Layout from "../../Layout/Layout";

function Cart() {
  const productsInCart = useSelector((state) => state.cart);

  const [productsToShow, setproductsToShow] = useState([]);
  const [productOccurrenceById, setproductOccurrenceById] = useState({});

  const [totalCartValue, settotalCartValue] = useState(0);
  const dispatchToReduxStore = useDispatch();

  useEffect(() => {
    calculatePriceOfCart();
    getUniqueCartProducts();
  }, [productsInCart]);

  const calculatePriceOfCart = () => {
    let total = 0;

    productsInCart.forEach((currentItem) => {
      total = total + parseInt(currentItem.price);
    });

    settotalCartValue(total);
  };

  const getUniqueCartProducts = () => {
    let trackOccurenceOfProduct = [];
    let productMap = {};

    productsInCart.forEach((currentItem) => {
      console.log(currentItem.name);

      if (productMap[currentItem.id] == undefined) {
        trackOccurenceOfProduct.push(currentItem);
        productMap[currentItem.id] = 1;
      } else {
        productMap[currentItem.id] = productMap[currentItem.id] + 1;
      }
    });

    console.log(productMap);
    console.log(trackOccurenceOfProduct);

    setproductsToShow(trackOccurenceOfProduct);
    setproductOccurrenceById(productMap);
    //WHY IS THIS NOT GETTING SET .... ASK MENTOR
    console.log(productsToShow);
    console.log(productOccurrenceById);
  };

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
