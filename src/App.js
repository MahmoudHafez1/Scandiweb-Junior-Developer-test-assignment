import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import store from "./store/store";
import Header from "./components/Header/Header";
import Category from "./pages/Category/Category";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/:category" element={<Category />} />
          <Route path="/:category/:productId" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
