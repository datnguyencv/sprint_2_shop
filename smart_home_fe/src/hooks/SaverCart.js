import React, { useEffect } from 'react';
import {makeRequest} from "../makeRequest";

function BeforeUnloadComponent() {
    useEffect( () => {
        const handleBeforeUnload = (e,productId,quantity) => {
            e.preventDefault();
            e.returnValue = '';
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
