import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import { CurrencyFormatter } from '../Units/UnitPublic';

const Card = ({ item }) => {
  console.log(item);
  return (
    <Link className="link" to={`/product-detail/${item.productId}`}>
      <div className="card">
        <div className="image">
          <span>{item?.productUnit.name}</span>
          <img
            src={
              item?.imageList?.[0]
            }
            alt=""
            className="mainImg"
          />
          <img
            src={
              item?.imageList?.[1]
            }
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item?.productName}</h2>
        <div className="prices">
          <h3>VND {(item?.price)? <CurrencyFormatter amount={item.price} /> : <CurrencyFormatter amount={item?.price + 5000} />} đ</h3>
          <h3>VND <CurrencyFormatter amount={item?.price}/> đ</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
