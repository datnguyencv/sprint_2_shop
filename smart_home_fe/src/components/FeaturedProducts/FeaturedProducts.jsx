import React from "react";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";
import useFetch from "../../hooks/useFetch";

const FeaturedProducts = ({type}) => {
    const {data, loading, error} = useFetch(
        `/products?populate=*&[filters][type][$eq]=${type}`
    );

    return (
        <div className="featuredProducts">
            <div className="top">
                <h1>{type} products</h1>
                <p>
                    Chúng tôi vui mừng giới thiệu đến bạn bộ sưu tập sản phẩm nổi bật tại cửa hàng của chúng tôi! Với
                    hơn một thập kỷ kinh nghiệm trong ngành, chúng tôi tự hào là địa chỉ tin cậy để tìm kiếm những sản
                    phẩm chất lượng và đáng tin cậy nhất trên thị trường.
                    <br/>
                    <br/>
                    Tại cửa hàng của chúng tôi, bạn sẽ khám phá một thế giới đa dạng về công nghệ, điện tử, gia dụng và
                    nhiều mặt hàng hữu ích khác, được lựa chọn cẩn thận để đáp ứng mọi nhu cầu của bạn. Chúng tôi luôn
                    đảm bảo chất lượng và tính tiện ích của từng sản phẩm, mang đến sự hài lòng tuyệt đối cho khách
                    hàng.
                </p>
            </div>
            <div className="bottom">
                {error
                    ? "Something went wrong!"
                    : loading
                        ? "loading"
                        : data?.map((item) => <Card item={item} key={item.id}/>)}
            </div>
        </div>
    );
};

export default FeaturedProducts;
