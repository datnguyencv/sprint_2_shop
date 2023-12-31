import React, {useEffect, useState} from "react";
import "./Product.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useFetch from "../../hooks/useFetch";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/cartReducer";
import {CurrencyFormatter} from "../../components/Units/UnitPublic";
import * as Swal from "sweetalert2";

const Product = () => {
    const id = parseInt(useParams().id);
    const [selectedImg, setSelectedImg] = useState(0);
    const [quantity, setQuantity] = useState(1);
  const token = sessionStorage.getItem('roles');
  const navigate = useNavigate();

    useEffect(() => {
        document.title = "Chi tiết sản phẩm";
        window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();

    const {data, loading, error} = useFetch(
        `product-detail/${id}`
    );

    const addCart = () => {
        if (token==="ROLE_USER") {
            dispatch(
                addToCart({
                    id: data?.productId,
                    title: data?.productName,
                    desc: data?.description,
                    price: data?.price,
                    img: data?.imageList?.[0],
                    quantity,
                })
            )
            Swal.fire({
                icon: "success",
                title: "Thêm thành công",
                text: "Sản phẩm " + (data?.productName),
                showConfirmButton: false,
                timer: 1500,
            });

        } else {
            Swal.fire({
                icon: "error",
                title: "Yêu cầu đăng nhập",
                text: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.",
                showCancelButton: true,
                confirmButtonText: "Đăng nhập",
                cancelButtonText: "Đóng",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/form-login");
                }
            });
        }
    };

    return (
        <div className="product">
            {loading ? (
                "loading"
            ) : (
                <>
                    <div className="left">
                        <div className="images">
                            <img
                                src={data?.imageList?.[0]}
                                alt=""
                                onClick={() => setSelectedImg("0")}
                            />
                            <img
                                src={data?.imageList?.[1]}
                                alt=""
                                onClick={() => setSelectedImg("1")}
                            />
                        </div>
                        <div className="mainImg">
                            <img src={data?.imageList?.[selectedImg]} alt=""/>
                        </div>
                    </div>
                    <div className="right">
                        <h1>{data?.title}</h1>
                        <span className="price">
              VND <CurrencyFormatter amount={data?.price}/> đ
            </span>
                        <p>{data?.description}</p>
                        <div className="quantity">
                            <button
                                onClick={() =>
                                    setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}>
                                -
                            </button>
                            {quantity}
                            <button onClick={() =>
                                setQuantity((prev) => prev + 1)}>
                                +
                            </button>
                        </div>
                        <button
                            className="add"
                            onClick={addCart}
                        >
                            <AddShoppingCartIcon/> Thêm vào giỏ hàng
                        </button>
                        <div className="links">
                            <div className="item">
                                <FavoriteBorderIcon/> Thêm vào danh sách yêu thích
                            </div>
                        </div>
                        <div className="info">
                            <span>Xuất xứ: Quảng Châu</span>
                            <span>Loại sản phẩm: {data?.productType?.productTypeName}</span>
                            <span>Thẻ: {data?.productType?.productTypeName}, Top</span>
                        </div>
                        <hr/>
                        <div className="info">
                            <span>Thông tin chi tiết:</span>
                            <hr/>
                            <span>Sản phẩm đi kèm:</span>
                            <hr/>
                            <span>Điều khoản bảo hành: </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Product;
