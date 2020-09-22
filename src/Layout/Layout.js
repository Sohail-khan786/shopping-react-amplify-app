import React from "react";
import ProductListing from "../Pages/ProductsComponent/ProductListing";
import { Link, useHistory } from "react-router-dom";

function Layout() {
  let history = useHistory();

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-primary">
        <div class="navbar-brand">
          <Link to={`/`} className="linkStyle">
            {" "}
            GeekStore{" "}
          </Link>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li
              class="nav-item active paddingAllSides"
              onClick={() => history.push("/")}
            >
              Home
            </li>
            <li
              class="nav-item active paddingAllSides"
              onClick={() => history.push("/cart")}
            >
              Cart
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Layout;
