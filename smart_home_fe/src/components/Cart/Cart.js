import React, {useEffect, useState} from "react";
import "./Cart.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {useDispatch, useSelector} from "react-redux";
import {removeItem, resetCart} from "../../redux/cartReducer";
import {Link, useNavigate} from "react-router-dom";
import {CurrencyFormatter} from "../Units/UnitPublic";
import * as Swal from "sweetalert2";
import * as Alert from "../Units/Alert";
import {PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js';
import {makeRequest} from "../../makeRequest";
import {handleAddToCart} from "../Units/AddCart";
import {FetchCartApi} from "../Units/FetchCart";


const Cart = () => {
        const products = useSelector((state) => state.cart.products);
    console.log(products)
        const [open, setOpen] = useState(true);
        const [total, setTotal] = useState(0);
        const navigate = useNavigate();

        const [productId, setProductId] = useState(0);
        const [quantity, setQuantity] = useState(1);
        const [paymentError, setPaymentError] = useState('');

        const dispatch = useDispatch();

        useEffect(() => {
            FetchCartApi(dispatch);
        }, [dispatch]);

        const handleClick = (e, id) => {
            setOpen(false);
        };
        const totalPrice = () => {
            let total = 0;
            products.forEach((item) => {
                total += item.quantity * item.price;

            });
            return total.toFixed(0);
        };

        const usd = () => {
            let total = 0;
            products.forEach((item) => {
                total += item.quantity * item.price / 24000;

            });
            return total.toFixed(2);
        };
        const handleSuccessPayment = async (total) => {
            await makeRequest.post(`cart-detail/purchaseHistory/${total}`)
            await Swal.fire({
                icon: 'success',
                title: 'Thanh toán thành công.',
                showConfirmButton: false,
                timer: 2000,
            });
            navigate('/detail');
        };

        const handleFailurePayment = (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Thanh toán thất bại: ' + error.message,
                showConfirmButton: false,
                timer: 1000,
            });
            setPaymentError("Tài khoản PayPal của bạn không đủ tiền để thực hiện thanh toán.");
        };


        return (
            <div className="cart" style={{display: open ? 'block' : 'none'}}>
                <button onClick={() => setOpen(false)} style={{
                    border: 'none',
                    color: 'red',
                    background: 'rgba(42,207,222,0.66)',
                    position: 'absolute',
                    right: '10px',
                    top: '10px'
                }}>
                    X
                </button>
                <h1>Giỏ hàng của bạn</h1>
                {products?.map((item) => (
                    <div className="item" key={item.id}>
                        <img src={item.img} alt=""/>
                        <div className="details">
                            <Link to={`/product-detail/${item.id}`} onClick={(e) => handleClick()}>{item.title}</Link>
                            <p>{item.desc?.substring(0, 100)}</p>
                            <div className="price">
                                Số lượng {item.quantity} x VND <CurrencyFormatter amount={item.price}/> đ
                            </div>
                        </div>
                        <DeleteOutlinedIcon
                            className="delete"
                            onClick={
                                () => Alert.swalWithBootstrapButtons.fire({
                                    icon: "warning",
                                    title: "Xác nhận xóa",
                                    html: `Bạn có muốn xoá sản phẩm <span style="color: red">${item.productName}</span> khỏi giỏ hàng không?`,
                                    showCancelButton: true,
                                    cancelButtonText: 'Không',
                                    confirmButtonText: 'Có',
                                    reverseButtons: true
                                }).then((res) => {
                                    if (res.isConfirmed) {
                                        dispatch(removeItem(item.id))
                                        Swal.fire({
                                            icon: "success",
                                            title: "Xóa thành công !",
                                            timer: 2000
                                        })
                                    }
                                })
                            }
                        />
                    </div>
                ))}
                <div className="total">
                    <span>Tổng tiền</span>
                    <span>VND <CurrencyFormatter amount={totalPrice()}/> đ</span>
                </div>
                <button className="btn btn-primary" onClick={() => handleAddToCart(products)}>Lưu giỏ hàng</button>
                <button className="btn btn-success" onClick={() => FetchCartApi()}>Cập nhật giỏ hàng</button>
                <span className="reset btn btn-danger" onClick={
                    () => Alert.swalWithBootstrapButtons.fire({
                        icon: "warning",
                        title: "Xác nhận xóa",
                        html: `Bạn muốn xoá toàn bộ giỏ hàng không?`,
                        showCancelButton: true,
                        cancelButtonText: 'Không',
                        confirmButtonText: 'Có',
                        reverseButtons: true
                    }).then((res) => {
                        if (res.isConfirmed) {
                            dispatch(resetCart())
                            Swal.fire({
                                icon: "success",
                                title: "Xóa thành công !",
                                timer: 2000
                            })
                        }
                    })}>
        Xoá giỏ hàng
      </span>
                {paymentError && <p style={{color: 'red'}}>{paymentError}</p>}
                <PayPalScriptProvider>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: usd(),
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            const total = totalPrice();
                            return actions.order.capture().then(async () => {
                                await makeRequest.post(`cart/cart-detail/purchaseHistory/${total}`)
                                await Swal.fire({
                                    icon: 'success',
                                    title: 'Thanh toán thành công.',
                                    showConfirmButton: false,
                                    timer: 2000,
                                });
                                dispatch(resetCart())
                                navigate('/detail');
                            });
                        }}
                    />
                </PayPalScriptProvider>
            </div>
        );
    }
;

export default Cart;
