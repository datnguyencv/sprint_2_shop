import React from 'react';
import { format } from 'date-fns';

export function DateFormatter({ dateString }) {
    const formattedDate = format(new Date(dateString), 'dd-MM-yyyy   HH:mm:ss');
    return <span>{formattedDate}</span>;
}
export function CurrencyFormatter({ amount }) {
    const formattedAmount = amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return <span>{formattedAmount}</span>;
}