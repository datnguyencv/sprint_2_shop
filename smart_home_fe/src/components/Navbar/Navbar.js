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
        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //     <div className="container-fluid">
        //         <div className="navbar-brand">
        //             <Link to="/">
        //                 <img src="/img/logo.png" style={{width: "120px", marginTop: "-10px"}}
        //                      alt="SmartHome Gadgets Logo"/>
        //             </Link>
        //         </div>
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        //                 aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav ms-auto">
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/">Trang chủ</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/">Về chúng tôi</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/">Liên hệ</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     {!token?  <Link className="nav-link" to="/form-login"/>:null}
        //
        //                         <div className="icons">
        //                             <SearchIcon/>
        //                             <PersonOutlineOutlinedIcon/>
        //                             <span className="box-text">
        //                         <span className="txtnw" onClick={handleUsernameClick}>
        //                             {username === "" || username == null ? "" : username}
        //                         </span>
        //                                 {showDropdown && (
        //                                     <div className="dropdown">
        //                                         {sessionStorage.getItem('roles') === 'ROLE_ADMIN' && (
        //                                             <Link to="/manage-customers"
        //                                                   className="dropdown-link logout-button">
        //                                                 Quản lý sản phẩm
        //                                             </Link>
        //                                         )}
        //                                         {token && (
        //                                             <div>
        //                                                 <button className="logout-button" onClick={handlerLogout}>
        //                                                     <ExitToAppOutlinedIcon/>
        //                                                     Đăng xuất
        //                                                 </button>
        //                                                 <button className="detail-button"
        //                                                         onClick={(e) => e.preventDefault(setDetail(true)) }>
        //                                                     Chi tiết
        //                                                 </button>
        //                                             </div>
        //                                         )}
        //                                     </div>
        //                                 )}
        //                     </span>
        //                             {detail && <DetailProfile/>}
        //
        //                         </div>
        //
        //                 </li>
        //                 {sessionStorage.getItem('roles') === 'ROLE_USER' && (
        //                     <li className="nav-item">
        //                         <div className="cartIcon" onClick={() => setOpen(!open)}>
        //                             <ShoppingCartOutlinedIcon/>
        //                             <span>{products.length}</span>
        //                         </div>
        //                     </li>
        //                 )}
        //
        //             </ul>
        //             {open && <Cart/>}
        //         </div>
        //     </div>
        // </nav>

        // gốc
        <nav className="navbar navbar-expand-lg navbar-light bg-light navba">
            <div className="container-fluid wrapper">
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
                        {!token && (<NavLink className="nav-link" to="/form-login">Login</NavLink>)}

                        <span className="box-text">
          <span className="txtnw" onClick={handleUsernameClick}>
            {username === "" || username == null ? "" : username}
          </span>
                               <div className="dropdown">
  {showDropdown && (
      <div className="dropdown-content">
          {sessionStorage.getItem('roles') === 'ROLE_ADMIN' && (
              <NavLink to="/manage-customers" className="dropdown-link logout-button">
                  Quản lý sản phẩm
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

        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //     <div className="container-fluid">
        //         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav mr-auto">
        //                 <li className="nav-item dropdown">
        //                     <a className="nav-link dropdown-toggle" href="#" id="currencyDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //                         <img src="/img/vn.png" width="50px" alt="" /> VND
        //                     </a>
        //                     <div className="dropdown-menu" aria-labelledby="currencyDropdown">
        //                         <a className="dropdown-item" href="#">Option 1</a>
        //                         <a className="dropdown-item" href="#">Option 2</a>
        //                     </div>
        //                 </li>
        //                 <li className="nav-item">
        //                     <NavLink className="nav-link" to="/products/">Sản phẩm mới</NavLink>
        //                 </li>
        //                 <li className="nav-item">
        //                     <NavLink className="nav-link" to="/products/">Toàn bộ sản phẩm</NavLink>
        //                 </li>
        //             </ul>
        //             <Link className="navbar-brand mx-auto" to="/">
        //                 <img src="/img/logo.png" alt="SmartHome Gadgets Logo"/>
        //             </Link>
        //             <ul className="navbar-nav ml-auto">
        //                 <li className="nav-item">
        //                     <NavLink className="nav-link" to="/">Trang chủ</NavLink>
        //                 </li>
        //                 <li className="nav-item">
        //                     <NavLink className="nav-link" to="/">Về chúng tôi</NavLink>
        //                 </li>
        //                 <li className="nav-item">
        //                     <NavLink className="nav-link" to="/">Liên hệ</NavLink>
        //                 </li>
        //                 <li className="nav-item">
        //                     <SearchIcon/>
        //                 </li>
        //                 <li className="nav-item">
        //                     <PersonOutlineOutlinedIcon/>
        //                 </li>
        //                 <li className="nav-item">
        //                     {!token && (<NavLink className="nav-link" to="/form-login">Login</NavLink>)}
        //                 </li>
        //                 {/* Add more icons and dropdowns similar to the above format */}
        //                 {sessionStorage.getItem('roles') === 'ROLE_USER' && (
        //                     <li className="nav-item cartIcon" onClick={() => setOpen(!open)}>
        //                         <ShoppingCartOutlinedIcon/>
        //                         <span className="cart-count">{products.length}</span>
        //                     </li>
        //                 )}
        //                 {open && (
        //                     <div className="modal fade show d-block" tabindex="-1">
        //                         <div className="modal-dialog modal-lg">
        //                             <div className="modal-content">
        //                                 <Cart/>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 )}
        //
        //             </ul>
        // {/*        </div>*/}
        // {/*    </div>*/}
        // {/*</nav>*/}
    );
};

export default Navbar;
