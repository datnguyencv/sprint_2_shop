package com.example.smart_home.serivce;

import com.example.smart_home.model.order.Cart;

public interface ICartService {
    Cart save(Cart cart);
    Cart findById(Integer accountId);
    void deleteByCartId(Integer cartId);
}
