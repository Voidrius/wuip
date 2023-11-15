import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Redux Shop App</h1>
        <Products />
        <ShoppingCart />
      </div>
    </Provider>
  );
}

export default App;
