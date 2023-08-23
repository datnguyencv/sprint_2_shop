import React, {useEffect, useState} from 'react';
import './Login.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useNavigate} from "react-router-dom";
import {postLogin} from "../../hooks/service";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {addToCart} from "../../redux/cartReducer";
import {makeRequest} from "../../makeRequest";
import {useDispatch} from "react-redux";


const FormLogin = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [failedAccount, setFailedAccount] = useState(null);

    const handleSignInClick = () => {
        setIsSignUp(false);
    };

    const shoppingCartApi = async () => {
        await makeRequest.get("cart/cart-detail/unpay/")
            .then((response) => {
                const cartItemsFromDatabase = response.data;
                cartItemsFromDatabase.forEach((item) => {
                    dispatch(addToCart({
                        id: item.productId,
                        name: item.productName,
                        desc: item.description,
                        price: item.price,
                        img: item.imageList?.[0],
                        quantity: +item.quantity
                    }))
                });
            })
            .catch((error) => {
                console.error('Lỗi khi lấy thông tin giỏ hàng:', error);
            })
    }

    // useEffect(async () => {
    //    document.title = "Trang đăng nhập";
    //    await window.scrollTo(0, 0);
    // }, []);

    return (
        <div className="datnt">
            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
                <Formik
                    initialValues={{
                        username: "",
                        password: ""
                    }}

                    validationSchema={Yup.object().shape({
                        username: Yup.string().required("Tên đăng nhập không được để trống"),

                        password: Yup.string()
                            .required("Mật khẩu không được dẻ trống")
                            // .matches(/^(?=.*\d)(?=.*[az])(?=.*[AZ]).{8,15}$/,"Mật khẩu trên 8 ký tự bao gồm chữ thường, INHOA, và số")
                    })}

                    onSubmit={(values) => {

                        postLogin(values)
                            .then((e) => {
                                sessionStorage.setItem('TOKEN', e.accessToken);
                                sessionStorage.setItem('USERNAME', e.username);
                                sessionStorage.setItem('roles', e.roles[0])
                                window.location.href = '/';
                                shoppingCartApi();
                            })
                            .catch(() => {
                                    setFailedAccount("Tên tài khoản hoặc mật khẩu không đúng")
                                }
                            );
                    }}
                >

                    {/* Form Sign In */}
                    <div className="form-container sign-in-container">
                        <Form>
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a href="/#" className="social"><FacebookIcon/></a>
                                <a href="/#" className="social"><GoogleIcon/></a>
                                <a href="/#" className="social"><LinkedInIcon/></a>
                            </div>
                            <div className="inputbox" style={{width:"100%"}}>
                                <ion-icon name="mail-outline"/>
                                <Field type="text" name="username" placeHolder="Username"/>
                                <ErrorMessage name="username" className="text-danger" component="span"/>
                            </div>

                            <div className="inputbox" style={{width:"100%"}}>
                                <Field
                                    className="input-field"
                                    type={!passwordVisible ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                />
                                <button className="password-icon"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                    {passwordVisible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                                </button>
                                <ErrorMessage name="password" className="text-danger" component="span" />
                            </div>
                            <div className="button-container">
                                <button type="submit">Log in</button>
                            </div>

                        </Form>
                    </div>
                </Formik>

                {/*/!* Form Sign Up *!/*/}
                {/*<div className="form-container sign-up-container">*/}
                {/*    <form action="#">*/}
                {/*        <h1>Create Account</h1>*/}
                {/*        <div className="social-container">*/}
                {/*            <Link href="#" className="social"><FacebookIcon/></Link>*/}
                {/*            <Link href="#" className="social"><GoogleIcon/></Link>*/}
                {/*            <Link href="#" className="social"><LinkedInIcon/></Link>*/}
                {/*        </div>*/}
                {/*        <span>or use your email for registration</span>*/}
                {/*        <input type="text" placeholder="Name" />*/}
                {/*        <input type="email" placeholder="Email" />*/}
                {/*        <input type="password" placeholder="Password" />*/}
                {/*        <button>Sign Up</button>*/}
                {/*    </form>*/}
                {/*</div>*/}
                {/* Overlay */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            {/*<button className="ghost" onClick={handleSignInClick}>Sign In</button>*/}
                        </div>
                        {/*<div className="overlay-panel overlay-right">*/}
                        {/*    <h1>Hello, Friend!</h1>*/}
                        {/*    <p>Enter your personal details and start journey with us</p>*/}
                        {/*    <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormLogin;