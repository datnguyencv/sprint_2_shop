package com.example.smart_home.serivce.impl;

import com.example.smart_home.dto.ICartDetailDto;
import com.example.smart_home.dto.ICartDetailDtoCheck;
import com.example.smart_home.model.order.CartDetail;
import com.example.smart_home.repository.ICartDetailRepository;
import com.example.smart_home.serivce.ICartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartDetailService implements ICartDetailService {
    @Autowired
    private ICartDetailRepository cartDetailRepository;

    @Override
    public CartDetail save(CartDetail cartDetail) {
        return cartDetailRepository.save(cartDetail);
    }

    @Override
    public List<ICartDetailDtoCheck> findvAllByAccountId(Integer accountId) {
        return cartDetailRepository.findAllvCartDetailByAccountId(accountId);
    }

    @Override
    public List<Integer> findAllvCartDetailByAccountIdAndIsDelete(Integer accountId) {
        return cartDetailRepository.findAllvCartDetailByAccountIdAndIsDelete(accountId);
    }

    @Override
    public List<ICartDetailDto> findAllByAccountId(Integer accountId) {
        return cartDetailRepository.findAllCartDetailByAccountId(accountId);
    }

    @Override
    public CartDetail findById(Integer cartDetailId) {
        return cartDetailRepository.findById(cartDetailId).orElse(null);
    }

    @Override
    public void deleteByProductId(Integer cartId, Integer productId) {
        cartDetailRepository.deleteCartDetailByCartCartIdAndProductProductId(cartId, productId);
    }

    @Override
    public void updateQuantityOfCartDetail(int quantity, Integer cartDetailId) {
        cartDetailRepository.updateQuantityOfCartDetail(quantity, cartDetailId);
    }

    @Override
    public void deleteAllCartVDetail(Integer accountId) {
        cartDetailRepository.deleteAllCartVDetail(accountId);
    }

    @Override
    public CartDetail findByIdAnIsDelete(Integer cartDetailId) {
        return cartDetailRepository.findCartDetailVByIdAndIsDelete(cartDetailId);
    }

    @Override
    public List<ICartDetailDtoCheck> findAllvCartDetailByPurchaseHistory(Integer purchaseHistory) {
        return cartDetailRepository.findAllvCartDetailByPurchaseHistory(purchaseHistory);
    }

}
