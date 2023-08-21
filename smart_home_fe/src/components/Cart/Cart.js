import React, {useState} from "react";
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


const Cart = () => {
        const products = useSelector((state) => state.cart.products);
        const dispatch = useDispatch();
        const [open, setOpen] = useState(true);
        const [total, setTotal] = useState(0);
        const navigate = useNavigate();

        const [productId, setProductId] = useState(0);
        const [quantity, setQuantity] = useState(1);

        const handleAddToCart = async () => {
            let res = null;
            try {
                for (const product of products) {
                    const productId = product.id;
                    const quantity = product.quantity;

                    res = await makeRequest.post(`cart/addCart/${productId}/${quantity}`);
                }

                    await Swal.fire({
                        icon: 'success',
                        title: 'Giỏ hàng đã được lưu thành công.',
                        showConfirmButton: false,
                        timer: 1000,
                    });

            } catch
                (error) {
                const errorMessage = res?.data ? res.data : 'Lỗi khi thêm giỏ hàng.';
                console.log(errorMessage)
                await Swal.fire({
                    icon: 'error',
                    title: (errorMessage),
                    showConfirmButton: false,
                    timer: 1000,
                });
                console.error('Lỗi khi thêm giỏ hàng:', error);
            }
        };


        const handleClick = (e, id) => {
            setOpen(false);
            console.log('open')
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

        const [paymentError, setPaymentError] = useState(null);

        const handleSuccessPayment = async (total) => {
            Swal.fire({
                icon: 'success',
                title: 'Thanh toán thành công.',
                showConfirmButton: false,
                timer: 1000,
            });
            await makeRequest.post(`cart-detail/purchaseHistory/${total}`).then(() => {
                navigate('/history');
            });
        };

        const handleFailurePayment = (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Thanh toán thất bại: ' + error.message,
                showConfirmButton: false,
                timer: 1000,
            });
            console.log(error);
            setPaymentError("Tài khoản PayPal của bạn không đủ tiền để thực hiện thanh toán.");
        };

        const handleApprove = async (data, actions) => {
            try {
                await actions.order.capture();
                console.log(actions.order.capture())
                const total = totalPrice();
                await handleSuccessPayment(total);
            } catch (error) {
                handleFailurePayment(error);
            }
        };

        return (
            <div className="cart" style={{display: open ? 'block' : 'none'}}>
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
                                    html: `Bạn có muốn xoá sản phẩm <span style="color: red">${item.title}</span> khỏi giỏ hàng không?`,
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
                <button className="btn btn-primary" onClick={() => handleAddToCart()}>Lưu giỏ hàng</button>
                <span className="reset btn btn-danger" onClick={() => dispatch(resetCart())}>
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
                        onApprove={handleApprove}
                    />
                </PayPalScriptProvider>
            </div>
        );
    }
;

export default Cart;
