import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import FormLogin from "./pages/LoginRegister/FormLogin";
import ScrollUpButton from 'react-scroll-up-button';


import "./app.css"
import BeforeUnloadComponent from "./hooks/SaverCart";
import {DetailProfile} from "./pages/Detail/DetailProfile";

const Layout = () => {
    return (
        <div className="app">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/" element={<Products />} />
                <Route path="/product-detail/:id" element={<Product />} />
                <Route path="/form-login" element={<FormLogin />} />
                <Route path="/detail" element={<DetailProfile />} />
            </Routes>
            {/* Nút Scroll Up */}
            <ScrollUpButton />

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
