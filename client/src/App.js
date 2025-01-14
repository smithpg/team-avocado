import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { StripeProvider } from "react-stripe-elements";

import CheckoutPage from "./pages/CheckoutPage";
import ContextProvider from "./store/Provider";
import AuthPage from "./pages/AuthPage";
import LogoutPage from "./pages/LogoutPage";
import ChefPage from "./pages/ChefProfilePage";
import CustomerPage from "./pages/CustomerProfilePage";
import BrowseChefsPage from "./pages/BrowsePage";

import "./App.css";

//TODO: Implement this
function browserHasToken() {
  return false;
}

function App() {
  // index.js
  console.log(process.env);
  return (
    <StripeProvider apiKey="pk_test_QZuuqCt3IbDZJLInrdvBOs1u001H7Nw9LN">
      <ContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              {browserHasToken() ? null : <Redirect to="signup/customer" />}
            </Route>
            <Route path="/(signup||login)" component={AuthPage} />
            <Route
              path="/chef/:chef_id"
              render={({ match }) => <ChefPage chefId={match.params.chef_id} />}
            />
            <Route
              path="/customer/:customer_id"
              render={({ match }) => (
                <CustomerPage customerId={match.params.customer_id} />
              )}
            />
            <Route path="/browse/chefs" component={BrowseChefsPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/logout" component={LogoutPage} />
          </Switch>
        </BrowserRouter>
      </ContextProvider>
    </StripeProvider>
  );
}

export default App;
