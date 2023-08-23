import {makeRequest} from "../../makeRequest";
import Swal from "sweetalert2";

export const handleAddToCart = async (products) => {
    let res = null;
    try {
        for (const product of products) {
            const productId = product.id;
            const quantity = product.quantity;

            res = await makeRequest.post(`cart/addCart/${productId}/${quantity}`);
        }

        await Swal.fire({
            icon: 'success',
            title: 'Giỏ hàng đã được lưu thành công.',
            showConfirmButton: false,
            timer: 1000,
        });

    } catch
        (error) {
        const errorMessage = res?.data ? res.data : 'Lỗi khi thêm giỏ hàng.';
        console.log(errorMessage)
        await Swal.fire({
            icon: 'error',
            title: (errorMessage),
            text: "Quá số lượng sản phẩm trong kho",
            showConfirmButton: false,
            timer: 2000,
        });
        console.error('Lỗi khi thêm giỏ hàng:', error);
    }
};
