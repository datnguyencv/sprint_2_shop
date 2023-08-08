import React, {useState} from "react";
import "./Cart.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {useDispatch, useSelector} from "react-redux";
import {removeItem, resetCart} from "../../redux/cartReducer";
import {Link} from "react-router-dom";
// import { makeRequest } from "../../makeRequest";
// import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    // const navigate = useNavigate();
    console.log(open)

    const handleClick = (e,id) => {
        // e.preventDefault();
        // navigate(`/product/${id}`);
        setOpen(false);
        console.log('open')
    };
    const totalPrice = () => {
        let total = 0;
        products.forEach((item) => {
            total += item.quantity * item.price;
        });
        return total.toFixed(2);
    };

    // const stripePromise = loadStripe(
    //   "pk_test_eOTMlr8usx1ctymXqrik0ls700lQCsX2UB"
    // );
    const handlePayment = async () => {
        //   try {
        //     const stripe = await stripePromise;
        //     const res = await makeRequest.post("/orders", {
        //       products,
        //     });
        //     await stripe.redirectToCheckout({
        //       sessionId: res.data.stripeSession.id,
        //     });
        //
        //   } catch (err) {
        //     console.log(err);
        //   }
    };
    return (
        <div className="cart" style={{ display: open ? 'block' : 'none' }}>
            <h1>Giỏ hàng của bạn</h1>
            {products?.map((item) => (
                <div className="item" key={item.id}>
                    <img src={item.img} alt=""/>
                    <div className="details">
                        <Link to={`/product/${item.id}`} onClick={(e) => handleClick()}>{item.title}</Link>
                        <p>{item.desc?.substring(0, 100)}</p>
                        <div className="price">
                            Số lượng {item.quantity} x VND {item.price} đ
                        </div>
                    </div>
                    <DeleteOutlinedIcon
                        className="delete"
                        onClick={() => dispatch(removeItem(item.id))}
                    />
                </div>
            ))}
            <div className="total">
                <span>Tổng tiền</span>
                <span>VND {totalPrice()} đ</span>
            </div>
            <button onClick={handlePayment}>Thanh toán</button>
            <span className="reset" onClick={() => dispatch(resetCart())}>
        Xoá giỏ hàng
      </span>
        </div>
    );
};

export default Cart;
