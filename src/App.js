import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListing from "./Pages/ProductsComponent/ProductListing";
import cart from "./Pages/CartComponent/Cart";
import { withAuthenticator } from "aws-amplify-react";

import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "./actions";
import ProductDetails from "./Pages/ProductsComponent/ProductDetails";

function App() {
  const dispatchToReduxStore = useDispatch();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log("user info: ", user);
        dispatchToReduxStore(
          storeUserInfo({ ...user.attributes, username: user.username })
        );
      })
      .catch((err) => console.log("error finding user: ", err));
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={ProductListing}></Route>
          <Route path="/cart" exact component={cart}></Route>
          <Route
            path="/productDetails/:name/:productId"
            exact
            component={ProductDetails}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

//export default App;
export default withAuthenticator(App, { includeGreetings: true });
