import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import FormLogin from "./pages/LoginRegister/FormLogin";

import "./app.css"
import BeforeUnloadComponent from "./hooks/SaverCart";

const Layout = () => {
    return (
        <div className="app">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:id" element={<Products />} />
                <Route path="/product-detail/:id" element={<Product />} />
                <Route path="/form-login" element={<FormLogin />} />
            </Routes>
            <Footer/>
        </div>
    );
};

function App() {
    return (
        <div>
            <BrowserRouter>
                <Layout />
                {/*<BeforeUnloadComponent/>*/}
            </BrowserRouter>
        </div>
    );
}

export default App;
