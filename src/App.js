import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListing from "./Pages/ProductsComponent/ProductListing";
import cart from "./Pages/CartComponent/Cart";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={ProductListing}></Route>
          <Route path="/cart" exact component={cart}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
