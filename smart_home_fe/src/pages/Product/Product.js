import React, {useEffect, useState} from "react";
import "./Product.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useFetch from "../../hooks/useFetch";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/cartReducer";

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.title = "Chi tiết sản phẩm"; // Thay đổi title
    window.scrollTo(0,0)
  }, []);

  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(`/products/${id}`);
  console.log(data)
  return (
    <div className="product">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            <div className="images">
              <img
                src={
                  data?.img
                }
                alt=""
                onClick={(e) => setSelectedImg("img")}
              />
              <img
                src={
                  data?.img2
                }
                alt=""
                onClick={(e) => setSelectedImg("img2")}
              />
            </div>
            <div className="mainImg">
              <img
                src={
                 data?.[selectedImg]
                }
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <h1>{data?.title}</h1>
            <span className="price">VND {data?.price} đ</span>
            <p>{data?.desc}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: data.id,
                    title: data.title,
                    desc: data.desc,
                    price: data.price,
                    img: data.img,
                    quantity,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> Thêm vào giỏ hàng
            </button>
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> Thêm vào danh sách yêu thích
              </div>
            </div>
            <div className="info">
              <span>Xuất xứ: Quảng Châu</span>
              <span>Loại sản phẩm: Thiết bị tiện ích</span>
              <span>Thẻ: Smart-Home, Top</span>
            </div>
            <hr />
            <div className="info">
              <span>Thông tin chi tiết:</span>
              <hr />
              <span>Sản phẩm đi kèm:</span>
              <hr />
              <span>Điều khoản bảo hành: </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
