package com.example.smart_home.serivce;

import com.example.smart_home.dto.ICartDetailDto;
import com.example.smart_home.dto.ICartDetailDtoCheck;
import com.example.smart_home.model.order.CartDetail;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICartDetailService {
    CartDetail save(CartDetail cartDetail);
    List<ICartDetailDtoCheck> findvAllByAccountId(Integer accountId);
    List<ICartDetailDtoCheck> findvAllByAccountIdUnPay(Integer accountId);
    List<Integer> findAllvCartDetailByAccountIdAndIsDelete(Integer accountId);
    List<ICartDetailDto> findAllByAccountId(Integer accountId);
    CartDetail findById(Integer cartDetailId);

//    void deleteByProductId(Integer cartId, Integer productId);
    void updateQuantityOfCartDetail( int quantity,  Integer cartDetailId);
    CartDetail findByIdAnIsDelete(Integer cartDetailId);
    List<ICartDetailDtoCheck> findAllvCartDetailByPurchaseHistory(@Param("id") Integer purchaseHistory);
}
