package com.example.smart_home.controller;

import com.example.smart_home.config.JwtUserDetails;
import com.example.smart_home.dto.ICartDetailDto;
import com.example.smart_home.dto.ICartDetailDtoCheck;
import com.example.smart_home.model.account.Account;
import com.example.smart_home.model.order.Cart;
import com.example.smart_home.model.order.CartDetail;
import com.example.smart_home.model.order.PurchaseHistory;
import com.example.smart_home.model.product.Product;
import com.example.smart_home.serivce.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Random;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/cart/")
public class RestCartDetailController {
    @Autowired
    private IAccountService accountService;
    @Autowired
    private ICartService cartService;
    @Autowired
    private ICartDetailService cartDetailService;
    @Autowired
    private IProductService productService;
    @Autowired
    private IPurchaseService purchaseService;

        @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("product-detail/addCart/{productId}/{quantity}")
    public ResponseEntity<CartDetail> saveCartDetailByUserIdAndProductId(@PathVariable Integer productId,
                                                                         @PathVariable int quantity) {
        Product product = productService.findById(productId);
            Integer userId = ((JwtUserDetails) (SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getId();
        Account account = accountService.findAccountById(userId);

        List<ICartDetailDto> cartDetailDtoList = cartDetailService.findAllByAccountId(userId);
        for (ICartDetailDto cartDetailDto : cartDetailDtoList) {
            if (Objects.equals(cartDetailDto.getProductId(), productId)) {
                CartDetail cartDetail = cartDetailService.findById(cartDetailDto.getCartDetailId());
                int quantity1 = cartDetail.getQuantity() + quantity;
                if (quantity1 > cartDetailDto.getInventoryLevel()) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                } else {
                    cartDetail.setQuantity(quantity1);
                    cartDetailService.save(cartDetail);
                    return new ResponseEntity<>(cartDetail, HttpStatus.OK);
                }
            }
        }
        Cart cart = new Cart();
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String dateNow = simpleDateFormat.format(date);
        cart.setDateOrder(dateNow);
        cart.setAccount(account);
        cartService.save(cart);
        CartDetail cartDetail = new CartDetail();
        cartDetail.setCart(cart);
        cartDetail.setProduct(product);
        cartDetail.setQuantity(quantity);
        CartDetail cartDetail1 = cartDetailService.save(cartDetail);
        return new ResponseEntity<>(cartDetail1, HttpStatus.CREATED);
    }
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("{accountId}")
    public ResponseEntity<List<ICartDetailDtoCheck>> findAllCartByAccountId(@PathVariable Integer accountId) {
        List<ICartDetailDtoCheck> cartDetailDtoList = cartDetailService.findvAllByAccountId(accountId);
        return new ResponseEntity<>(cartDetailDtoList, HttpStatus.OK);
    }
}
