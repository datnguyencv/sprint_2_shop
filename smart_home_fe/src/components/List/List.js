import React from "react";
import "./List.css";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const { data, loading, error } = useFetch(
    `product/list`
  );

  return (
    <div className="list">
      {loading
        ? "loading"
        : data?.map((item) => <Card item={item} key={item.productId} />)}
    </div>
  );
};

export default List;
