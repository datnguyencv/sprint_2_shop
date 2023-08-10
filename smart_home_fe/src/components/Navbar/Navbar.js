import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

import {Link, useNavigate} from "react-router-dom";
import "./Navbar.css"
import Cart from "../Cart/Cart";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLogin, setIsLogin] = useState(false)
    const products = useSelector((state) => state.cart.products);
    const token = sessionStorage.getItem('TOKEN');
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getToken = async () => {
            setUsername(sessionStorage.getItem('USERNAME'));
        }
        getToken();
        if (token) {
            setIsLogin(true);
        } else {
        }
    }, [token]);
    const handlerLogout = () => {
        sessionStorage.removeItem("TOKEN");
        sessionStorage.removeItem("USERNAME");
        sessionStorage.removeItem("roles");
        setIsLogin(false);
        toast.success("Đăng xuất thành công !!");
        setShowDropdown(!showDropdown);
        navigate("/")
    };

    const handleUsernameClick = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="left">
                    <div className="item">
                        <img src="/img/vn.png" style={{width: "50px"}} alt=""/>
                        {/*<KeyboardArrowDownIcon/>*/}
                    </div>
                    <div className="item">
                        <span>VND</span>
                        {/*<KeyboardArrowDownIcon/>*/}
                    </div>
                    <div className="item">
                        <Link className="link" to="/products/1">Bán chạy</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/products/2">Đồ da dụng</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/products/3">Sp tiện ích
                        </Link>
                    </div>
                </div>
                <div className="center">
                    <Link className="link" to="/">
                        <img src="/img/logo.png" style={{width: "120px", marginTop: "-10px"}}
                             alt="SmartHome Gadgets Logo"/>
                    </Link>
                </div>
                <div className="right">
                    <div className="item">
                        <Link className="link" to="/">Trang chủ</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/">Về chúng tôi</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/">Liên hệ</Link>
                    </div>
                    <div className="icons">
                        <SearchIcon/>
                        <Link className="link" to="/form-login"> <PersonOutlineOutlinedIcon/>
                            <span className="box-text">
          <span className="txtnw" onClick={handleUsernameClick}>
            {username === "" || username == null ? "" : username}
          </span>
                                {showDropdown && (
                                    <div className="dropdown">
                                        {sessionStorage.getItem('roles') === 'ROLE_ADMIN' && (
                                            <Link to="/manage-customers" className="dropdown-link logout-button">
                                                Quản lý sản phẩm
                                            </Link>
                                        )}
                                        {token && (
                                            <button className="logout-button" onClick={handlerLogout}>
                                                <ExitToAppOutlinedIcon/>
                                                Đăng xuất
                                            </button>
                                        )}
                                    </div>
                                )}
        </span>
                        </Link>
                        {sessionStorage.getItem('roles') === 'ROLE_USER' && (
                            <div className="cartIcon" onClick={() => setOpen(!open)}>
                                <ShoppingCartOutlinedIcon/>
                                <span>{products.length}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {open && <Cart/>}
        </div>
    );
};

export default Navbar;
