import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import { CurrencyFormatter } from '../ConvertUnit/UnitPublic';

const Card = ({ item }) => {
  console.log(item);
  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {item?.isNew && <span>Hàng mới về</span>}
          <img
            src={
              item?.img
            }
            alt=""
            className="mainImg"
          />
          <img
            src={
              item?.img2
            }
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item?.title}</h2>
        <div className="prices">
          <h3>VND {(item?.oldPrice)? <CurrencyFormatter amount={item.oldPrice} /> : <CurrencyFormatter amount={item?.price + 5000} />} đ</h3>
          <h3>VND <CurrencyFormatter amount={item?.price}/> đ</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
