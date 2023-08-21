import React, {useEffect, useState} from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
} from 'mdb-react-ui-kit';
import {makeRequest} from "../../makeRequest";

export const DetailProfile = () => {
    const username = sessionStorage.getItem("USERNAME")
    const token = sessionStorage.getItem("TOKEN")
    const [customer, setCustomer] = useState();
    const [bill, setBill] = useState([]);
    const defaultAvatar = "https://politicalscience.columbian.gwu.edu/sites/g/files/zaxdzs4796/files/image/profile_graphic_1080x1080.png";

    useEffect(() => {
        {
            username ? (async () => {
                const result = await makeRequest.get(`account/`);;
                setCustomer(result.data);
                console.log(result.data)
            })() : setCustomer(null)
        }
        handleDisplayBill();
    }, []);
    const handleDisplayBill = async (username) => {

        const res = await makeRequest.get(`cart/`);
        console.log(res)
        setBill(res);
    };


    if (!customer || !bill) {
        return null
    }
    return (
            <section style={{backgroundColor: '#eee'}}>
                <MDBContainer className="py-5">

                    <MDBRow>
                        <MDBCol lg="4">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center">
                                    <MDBCardImage
                                    src={customer.avatar ? customer.avatar : defaultAvatar}
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{width: '100px'}}
                                        fluid/>
                                    <p className="text-muted mb-1">{customer.username}</p>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        <MDBCol lg="8">
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Họ và tên</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{customer.name}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{customer.email}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Số điện thoại</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{customer.phoneNumber}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Địa chỉ</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{customer.address}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBCol lg="12">
                        <h1 style={{textAlign: "center"}}>Lịch sử mua hàng</h1>
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>.....................</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">...........</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBContainer>
            </section>
    );
};