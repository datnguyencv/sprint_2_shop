import React from 'react';
import { format } from 'date-fns';

export function DateFormatter({ date }) {
    const formattedDate = format(new Date(date), 'dd-MM-yyyy');
    return <span>{formattedDate}</span>;
}
export function CurrencyFormatter({ amount }) {
    const formattedAmount = amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return <span>{formattedAmount}</span>;
}