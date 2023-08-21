import React, { useEffect } from 'react';
import {makeRequest} from "../makeRequest";

function BeforeUnloadComponent() {
    useEffect( () => {
        const handleBeforeUnload = (e,productId,quantity) => {
            e.preventDefault();
            e.returnValue = ''; // Nếu bạn muốn hiển thị thông báo trước khi đóng trình duyệt
            // Gọi API để lưu dữ liệu vào cơ sở dữ liệu
            makeRequest.post(`cart/addCart/${productId}/${quantity}`)
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return <></>;
}

export default BeforeUnloadComponent;
