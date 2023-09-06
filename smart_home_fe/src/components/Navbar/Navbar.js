import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

import {Link, NavLink, useNavigate} from "react-router-dom";
import "./Navbar.css"
import Cart from "../Cart/Cart";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {handleAddToCart} from "../Units/AddCart";

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [detail, setDetail] = useState(false)
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
        if ((sessionStorage.getItem('roles') === 'ROLE_USER') &&
            products.length !== 0) {
            handleAddToCart(products)};
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light navba">
            <div className="container-fluid wrapper">
                <div className="left">
                    <div className="item">
                        <img src="/img/vn.png" style={{width: "50px"}} alt=""/>
                    </div>
                    <div className="item">
                        <span>VND</span>
                    </div>
                    <div className="item">
                        <NavLink className="link" to="/products/">Sản phẩm mới</NavLink>
                    </div>
                    <div className="item">
                        <NavLink className="link" to="/products/">Toàn bộ sản phẩm</NavLink>
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
                        <NavLink className="link" to="/">Trang chủ</NavLink>
                    </div>
                    <div className="item">
                        <NavLink className="link" to="/">Về chúng tôi</NavLink>
                    </div>
                    <div className="item">
                        <NavLink className="link" to="/">Liên hệ</NavLink>
                    </div>
                    <div className="icons">
                        <SearchIcon/>
                        <PersonOutlineOutlinedIcon/>
                        {!token && (<NavLink className="nav-link" to="/form-login">Đăng nhập</NavLink>)}

                        <span className="box-text">
          <span className="txtnw" onClick={handleUsernameClick}>
            {username === "" || username == null ? "" : username}
          </span>
                               <div className="dropdown">
  {showDropdown && (
      <div className="dropdown-content">
          {sessionStorage.getItem('roles') === 'ROLE_ADMIN' && (
              <NavLink to="/manage-customers" className="dropdown-link logout-button text-center">
                  Quản lý
              </NavLink>
          )}
          {token && (
              <div>
                  <NavLink className="detail-button btn" to="detail">
                      Chi tiết
                  </NavLink>
                  <button className="logout-button" onClick={handlerLogout}>
                      <ExitToAppOutlinedIcon/>
                      Đăng xuất
                  </button>
              </div>
          )}
      </div>
  )}
</div>

        </span>
                        {/*</Link>*/}
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
        </nav>

    );
};

export default Navbar;
