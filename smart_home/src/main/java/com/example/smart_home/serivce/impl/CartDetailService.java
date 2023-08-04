package com.example.smart_home.serivce.impl;

import com.example.smart_home.model.order.CartDetail;
import com.example.smart_home.repository.ICartDetailRepository;
import com.example.smart_home.serivce.ICartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartDetailService implements ICartDetailService {
    @Autowired
    private ICartDetailRepository cartDetailRepository;
    @Override
    public CartDetail findById(Integer cartDetailId) {
        return cartDetailRepository.findById(cartDetailId).orElse(null);
    }

}
