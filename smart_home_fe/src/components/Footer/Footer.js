import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="top">
                <div className="item">
                    <h1>Mục lục</h1>
                    <span>Bán chạy</span>
                    <span>Đồ da dụng</span>
                    <span>SP tiện ích</span>
                    <span>Giỏ hàng</span>
                    <span>Thanh toán</span>
                </div>
                <div className="item">
                    <h1>Trang chủ</h1>
                    <span>Điều khoản</span>
                    <span>Đăng nhập</span>
                    <span>Đăng ký</span>
                </div>
                <div className="item">
                    <h1>Về chúng tôi</h1>
                    <span>
           Với cam kết về chất lượng và giá trị, chúng tôi mong muốn mang lại trải nghiệm mua sắm tuyệt vời và đáng nhớ cho bạn. Hãy đến và khám phá những sản phẩm độc đáo và tiện lợi tại cửa hàng của chúng tôi, và chắc chắn bạn sẽ tìm thấy những giải pháp hoàn hảo cho cuộc sống hàng ngày của mình.
          </span>
                </div>
                <div className="item">
                    <h1>Liên hệ</h1>
                    <p>
                        Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào, xin hãy liên hệ với chúng tôi qua thông tin bên
                        dưới:
                    </p>
                    <ul>
                        <li>Địa chỉ: 123 Lê Duẩn, Thành phố Đà Nẵng</li>
                        <li>Số điện thoại: (070) 271-2217</li>
                        <li>Email: nguyendat.cvqb@gmail.com</li>
                    </ul>
                    <p>
                        Chúng tôi sẽ phản hồi bạn sớm nhất có thể. Xin cảm ơn!
                    </p>
                </div>
            </div>
            <div className="bottom">
                <div className="left">
          <span className="logo">SmartHome <br/>
                    Gadgets</span>
                    <span className="copyright">
            © Copyright 2023. All Rights Reserved
          </span>
                </div>
                <div className="right">
                    <img src="/img/payment.png" alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Footer;
