import React, { useEffect, useState } from "react";
import "./Product.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import { CurrencyFormatter } from "../../components/Units/UnitPublic";

const Product = () => {
  const id = parseInt(useParams().id);
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  console.log(id);

  useEffect(() => {
    document.title = "Chi tiết sản phẩm";
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

    const { data, loading, error } = useFetch(
        `product-detail/${id}`
    );

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
                  <img src={data?.imageList?.[selectedImg]} alt="" />
                </div>
              </div>
              <div className="right">
                <h1>{data?.title}</h1>
                <span className="price">
              VND <CurrencyFormatter amount={data?.price} /> đ
            </span>
                <p>{data?.description}</p>
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
                              id: data?.productId,
                              title: data?.productName,
                              desc: data?.description,
                              price: data?.price,
                              img: data?.imageList?.[0],
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
                  <span>Loại sản phẩm: {data?.productType?.productTypeName}</span>
                  <span>Thẻ: {data?.productType?.productTypeName}, Top</span>
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
