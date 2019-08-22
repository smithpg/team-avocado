import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";


import CheckoutPage from "./pages/CheckoutPage";
import ContextProvider from "./store/Provider";
import AuthPage from "./pages/AuthPage";
import ChefPage from "./pages/ChefProfilePage";
import CustomerPage from "./pages/CustomerProfilePage";
import "./App.css";
import BrowseChefsPage from "./pages/BrowseChefsPage";

//TODO: Implement this
function browserHasToken() {
  return false;
}

function App() {
  return (
    <StripeProvider apiKey="pk_test_QZuuqCt3IbDZJLInrdvBOs1u001H7Nw9LN">
      <ContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              {browserHasToken() ? null : <Redirect to="signup/customer" />}
            </Route>
            <Route path="/(signup||login)" component={AuthPage} />
            <Route path="/chef/:chef_id" component={ChefPage} />

            <Route path="/customer/:customer_id" component={CustomerPage} />
            <Route path="/browse/chefs" component={BrowseChefsPage} />
            <Route path="/checkout" component={CheckoutPage} />
          </Switch>
        </BrowserRouter>
      </ContextProvider>
    </StripeProvider>
  );
}

export default App;
