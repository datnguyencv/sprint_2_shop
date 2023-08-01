import React, { useState } from 'react';
import './Login.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Link} from "react-router-dom";

const FormLogin = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    const handleSignInClick = () => {
        setIsSignUp(false);
    };

    return (
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
            {/* Form Sign Up */}
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <Link href="#" className="social"><FacebookIcon/></Link>
                        <Link href="#" className="social"><GoogleIcon/></Link>
                        <Link href="#" className="social"><LinkedInIcon/></Link>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            </div>
            {/* Form Sign In */}
            <div className="form-container sign-in-container">
                <form action="#">
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <Link href="#" className="social"><FacebookIcon/></Link>
                        <Link href="#" className="social"><GoogleIcon/></Link>
                        <Link href="#" className="social"><LinkedInIcon/></Link>
                    </div>
                    <span>or use your account</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <Link href="#">Forgot your password?</Link>
                    <button>Sign In</button>
                </form>
            </div>
            {/* Overlay */}
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" onClick={handleSignInClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormLogin;
