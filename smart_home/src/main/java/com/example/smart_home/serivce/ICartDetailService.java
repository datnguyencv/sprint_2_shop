package com.example.smart_home.serivce;

import com.example.smart_home.model.order.CartDetail;

public interface ICartDetailService {
    CartDetail findById(Integer cartDetailId);
}
