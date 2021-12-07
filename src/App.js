import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Category from "./pages/Category/Category";
import Product from "./pages/Product/Product";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<p>Home</p>} />
        <Route path="/:category" element={<Category />} />
        <Route path="/:category/:productId" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
