package com.example.smart_home.serivce.impl;

import com.example.smart_home.model.order.Cart;
import com.example.smart_home.repository.ICartRepository;
import com.example.smart_home.serivce.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService implements ICartService {
    @Autowired
    private ICartRepository cartRepository;
    @Override
    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart findById(Integer accountId) {
        return null;
    }

    @Override
    public void deleteByCartId(Integer cartId) {

    }

}
