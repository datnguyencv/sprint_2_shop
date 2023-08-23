import React, {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import './PurchaseDetail.css'
import {CurrencyFormatter} from "../../components/Units/UnitPublic";

export const PurchaseHistoryDetailsTable = ({ purchaseHistoryId }) => {
    const [selectId, setSelectId] = useState(purchaseHistoryId);
    console.log("id mua"+selectId)
    useEffect(() => {
        setSelectId(purchaseHistoryId);
    }, [purchaseHistoryId]);

            const { data, loading, error } = useFetch(
                `cart/cart-detail/purchaseHistory/detail/${selectId}`
            );

    return (
        <table className="purchase-history-details-table">
            <thead>
            <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
            </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr>
                    <td colSpan="6">Loading...</td>
                </tr>
            ) : (
                data?.map((value, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <img src={value.image} width="80" height="80" alt="Product" />
                        </td>
                        <td>{value.productName}</td>
                        <td>{value.quantity}</td>
                        <td> <CurrencyFormatter amount={value.price}/> đ</td>
                        <td><CurrencyFormatter amount={value.price * value.quantity}/> đ</td>
                    </tr>
                ))
            )}
            </tbody>
        </table>

    );
};