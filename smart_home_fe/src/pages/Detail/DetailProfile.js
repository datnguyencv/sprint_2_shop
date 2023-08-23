import React, {useEffect, useState} from "react";
import {makeRequest} from "../../makeRequest";
import './DetailProfile.css'
import {Link} from "react-router-dom";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import {PurchaseHistoryDetailsTable} from "./PurchaseDetail";
import {CurrencyFormatter, DateFormatter} from "../../components/Units/UnitPublic";

export const DetailProfile = () => {
    const username = sessionStorage.getItem("USERNAME")
    const [customer, setCustomer] = useState();
    const [bill, setBill] = useState([]);
    const defaultAvatar = "https://politicalscience.columbian.gwu.edu/sites/g/files/zaxdzs4796/files/image/profile_graphic_1080x1080.png";

    const [selectedPurchaseHistoryId, setSelectedPurchaseHistoryId] = useState(null);
    const [selectedBillCode, setBillCode] = useState(null);
    console.log(selectedPurchaseHistoryId)

    const handleReadMoreClick = (purchaseHistoryId,billCode) => {
        setSelectedPurchaseHistoryId(purchaseHistoryId);
        console.log(purchaseHistoryId)
        setBillCode(billCode);
    };
    useEffect(() => {
        console.log(username)
        {
            username ? (async () => {
                const result = await makeRequest.get(`account/`);
                ;
                setCustomer(result.data);
            })() : setCustomer(null)
        }
        handleDisplayBill();
    }, []);
    const handleDisplayBill = async () => {
        const res = await makeRequest.get(`cart/cart-detail/purchaseHistory/list/`);
        setBill(res.data);
        console.log(res.data)
    };


    if (!customer || !bill) {
        return null
    }

    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="details-card">
                            <div className="details-card-body">
                                <div className="avatar">
                                    <img src={customer.avatar ? customer.avatar : defaultAvatar} alt="avatar"
                                         className="rounded-circle"/>
                                </div>
                                <p className="username">{customer.username}</p>
                                <div className="details-info">
                                    <div className="details-item">
                                        <span className="label">Họ và tên:</span>
                                        <span className="value">{customer.name}</span>
                                    </div>
                                    <div className="details-item">
                                        <span className="label">Email:</span>
                                        <span className="value">{customer.email}</span>
                                    </div>
                                    <div className="details-item">
                                        <span className="label">Số điện thoại:</span>
                                        <span className="value">{customer.phoneNumber}</span>
                                    </div>
                                    <div className="details-item">
                                        <span className="label">Địa chỉ:</span>
                                        <span className="value">{customer.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="purchase-history">
                            <h1 className="purchase-history-header">Lịch sử mua hàng</h1>
                            {bill?.length === 0 ? (
                                <p className="empty-cell">Không có dữ liệu</p>
                            ) : (
                                <table className="purchase-history-table">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Mã đơn hàng</th>
                                        <th>Ngày thanh toán</th>
                                        <th>Tổng tiền</th>
                                        <th>Chi tiết đơn hàng</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {bill?.map((value, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.billCode}</td>
                                            <td><DateFormatter dateString={value.dateOrder}/></td>
                                            <td><CurrencyFormatter amount={value.total}/> đ</td>
                                            <td>
                                                <div style={{textAlign:"center"}}>
                                                    <ReadMoreIcon onClick={() => handleReadMoreClick(value.purchaseHistoryId,value.billCode)} />
                                             </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                    <div>
                        {/*{chi tiet don hang}*/}
                        <div className="col-lg-12 mt-3">
                            {/* Render PurchaseHistoryDetailsTable here */}
                            {selectedPurchaseHistoryId !== null && (
                                <div style={{textAlign:"center"}}>
                                <h2>Chi tiết đơn hàng bill {selectedBillCode}</h2>
                                    <PurchaseHistoryDetailsTable purchaseHistoryId={selectedPurchaseHistoryId} />

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};