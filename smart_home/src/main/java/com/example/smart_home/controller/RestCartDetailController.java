package com.example.smart_home.controller;

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
    @GetMapping("product-detail/addCart/{productId}/{accountId}/{quantity}")
    public ResponseEntity<CartDetail> saveCartDetailByUserIdAndProductId(@PathVariable Integer productId,
                                                                         @PathVariable Integer accountId, @PathVariable int quantity) {
        Product product = productService.findById(productId);
        Account account = accountService.findAccountById(accountId);

        List<ICartDetailDto> cartDetailDtoList = cartDetailService.findAllByAccountId(accountId);
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
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @DeleteMapping("cart-detail/{cartId}/{productId}")
    public ResponseEntity<?> deleteCartDetailByProductId(@PathVariable Integer cartId, @PathVariable Integer productId) {
        cartDetailService.deleteByProductId(cartId, productId);
        this.cartService.deleteByCartId(cartId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @DeleteMapping("deleteAll/cart-detail/{accountId}")
    public ResponseEntity<?> deleteAllCartDetailByAccountId(@PathVariable Integer accountId) {
        this.cartDetailService.deleteAllCartVDetail(accountId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("cart-detail/updateQuantity/{cartDetailId}/{quantity}")
    public ResponseEntity<?> updateQuantityOfCartDetailByCartDetailId(@PathVariable Integer cartDetailId, @PathVariable int quantity) {
        this.cartDetailService.updateQuantityOfCartDetail(quantity, cartDetailId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("cart-detail/purchaseHistory/list/{accountId}")
    public ResponseEntity<?> findAllPurchaseHistoryByAccountId(@PathVariable Integer accountId) {
        List<PurchaseHistory> purchaseHistories = this.purchaseService.findAllByAccount_AccountId(accountId);
        return new ResponseEntity<>(purchaseHistories, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("cart-detail/purchaseHistory/detail/{purchaseHistoryId}")
    public ResponseEntity<List<ICartDetailDtoCheck>> findAllPurchaseHistoryByPurchaseHistoryId(@PathVariable Integer purchaseHistoryId) {
        List<ICartDetailDtoCheck> purchaseHistoriesDetail = this.cartDetailService.findAllvCartDetailByPurchaseHistory(purchaseHistoryId);
        return new ResponseEntity<>(purchaseHistoriesDetail, HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("cart-detail/purchaseHistory/{accountId}/{total}")
    public ResponseEntity<?> AddNewPurchaseHistory(
            @PathVariable Integer accountId,
            @PathVariable int total) {
        List<Integer> cartDetailDto2s = this.cartDetailService.findAllvCartDetailByAccountIdAndIsDelete(accountId);
        Account account = this.accountService.findAccountById(accountId);
        PurchaseHistory purchaseHistory = new PurchaseHistory();
        Random random = new Random();
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String formattedDate = dateFormat.format(date);
        purchaseHistory.setDateOrder(formattedDate);
        purchaseHistory.setBillCode(String.valueOf(random.nextInt(90000) + 10000));
        purchaseHistory.setAccount(account);
        purchaseHistory.setTotal(total);
        System.out.println(formattedDate);
        this.purchaseService.save(purchaseHistory);
        for (Integer num : cartDetailDto2s) {
            CartDetail cartDetail = cartDetailService.findByIdAnIsDelete(num);
            cartDetail.setPurchaseHistory(purchaseHistory);
            this.cartDetailService.save(cartDetail);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
