import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  console.log(item);
  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {item?.isNew && <span>New Season</span>}
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
          <h3>VND {item?.oldPrice || item?.price + 2} đ</h3>
          <h3>VND {item?.price} đ</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
