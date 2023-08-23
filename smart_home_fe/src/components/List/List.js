import React, {useState} from "react";
import "./List.css";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import {useSelector} from "react-redux";
import LoadingSpinner from "../Units/Spinner";

const List = () => {
    const {data, loading, error} = useFetch(
        `product/list`
    );
    const [isLoading, setIsLoading] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(6);
    const handleLoadMore = () => {
        setIsLoading(true);
        setTimeout(() => {
        setItemsToShow((prevItems) => prevItems + 3);
          setIsLoading(false);
        }, 2000);
    };

    const searchTerm = useSelector((state) => state.filter.searchTerm);
    const sortBy = useSelector((state) => state.filter.sortBy);

    console.log(data)
    const filteredData = data ? data
        .filter((item) => {
            if (!searchTerm || item.productName.toLowerCase().includes(searchTerm.toLowerCase())) {
                return true;
            }
            return false;
        })
        .sort((a, b) => {
            if (sortBy === "asc") {
                return a.price - b.price;
            } else if (sortBy === "desc") {
                return b.price - a.price;
            }
            return 0;
        }) : [];

    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <div className="list">
            {filteredData.slice(0, itemsToShow).map((item) => (
                <Card item={item} key={item.productId} />
            ))}

            {itemsToShow < filteredData.length && (
                <button onClick={handleLoadMore} disabled={isLoading}>
                    {isLoading ? <LoadingSpinner/> : "Load More"}
                </button>
            )}
        </div>
    );
};

export default List;

