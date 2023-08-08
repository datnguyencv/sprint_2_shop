import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {Link, useNavigate} from "react-router-dom";
import "./Navbar.css"
import Cart from "../Cart/Cart";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const products = useSelector((state) => state.cart.products);
    const token = localStorage.getItem('token');
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getToken = async () => {
            setUsername(localStorage.getItem('username'));
        }
        getToken();
        if (token) {
            setIsLogin(true);
        } else {
        }
    }, [token]);
    const handlerLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setIsLogin(false);
        toast.success("Đăng xuất thành công !!");
        navigate("/")
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
<span className="txtnw">{username === "" || username === null ? "Đăng nhập" : username
}</span></span>
                        </Link>
                        {/*<PersonOutlineOutlinedIcon/>*/}
                        <FavoriteBorderOutlinedIcon/>
                        <div className="cartIcon" onClick={() => setOpen(!open)}>
                            <ShoppingCartOutlinedIcon/>
                            <span>{products.length}</span>
                        </div>
                    </div>
                </div>
            </div>
            {open && <Cart/>}
        </div>
    );
};

export default Navbar;
