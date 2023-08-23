import {makeRequest} from "../../makeRequest";
import {addToCart} from "../../redux/cartReducer";
import {useDispatch} from "react-redux";

export const FetchCartApi = async (dispatch) => {
    await makeRequest.get("cart/cart-detail/unpay/")
        .then((response) => {
            const cartItemsFromDatabase = response.data;
            cartItemsFromDatabase.forEach((item) => {
                dispatch(addToCart({
                    id: item.productId,
                    name: item.productName,
                    desc: item.description,
                    price: item.price,
                    img: item.imageList?.[0],
                    quantity: item.quantity
                }))
            });
        })
        .catch((error) => {
            console.error('Lỗi khi lấy thông tin giỏ hàng:', error);
        })
}