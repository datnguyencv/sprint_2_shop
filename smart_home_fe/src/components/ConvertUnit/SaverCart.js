// import React, { useEffect } from 'react';
// import {Axios as axios} from "axios";
//
// function BeforeUnloadComponent() {
//     useEffect(() => {
//         const handleBeforeUnload = (e) => {
//             e.preventDefault();
//             e.returnValue = ''; // Nếu bạn muốn hiển thị thông báo trước khi đóng trình duyệt
//             // Gọi API để lưu dữ liệu vào cơ sở dữ liệu
//             axios.post('/api/saveData', { data: yourData })
//         };
//
//         window.addEventListener('beforeunload', handleBeforeUnload);
//
//         return () => {
//             window.removeEventListener('beforeunload', handleBeforeUnload);
//         };
//     }, []);
//
//     return <></>;
// }
//
// export default BeforeUnloadComponent;
