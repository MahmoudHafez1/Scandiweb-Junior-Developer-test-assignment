import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Category from "./pages/Category/Category";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<p>Home</p>} />
        <Route path="/:category" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
