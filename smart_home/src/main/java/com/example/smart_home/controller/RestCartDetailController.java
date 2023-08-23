package com.example.smart_home.controller;

import com.example.smart_home.dto.ICartDetailDto;
import com.example.smart_home.dto.ICartDetailDtoCheck;
import com.example.smart_home.model.account.Account;
import com.example.smart_home.model.order.Cart;
import com.example.smart_home.model.order.CartDetail;
import com.example.smart_home.model.order.PurchaseHistory;
import com.example.smart_home.model.product.Product;
import com.example.smart_home.serivce.*;
import com.example.smart_home.serivce.impl.AccountDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("addCart/{productId}/{quantity}")
    public ResponseEntity<?> saveCartDetailByUserIdAndProductId(@PathVariable Integer productId,
                                                                @PathVariable int quantity) {
        Product product = productService.findById(productId);
        Integer userId = ((AccountDetails) (SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getId();
        Account account = accountService.findAccountById(userId);
        System.out.println(account);
        List<ICartDetailDto> cartDetailDtoList = cartDetailService.findAllByAccountId(userId);
        for (ICartDetailDto cartDetailDto : cartDetailDtoList) {
            if (Objects.equals(cartDetailDto.getProductId(), productId)) {
                CartDetail cartDetail = cartDetailService.findById(cartDetailDto.getCartDetailId());
                int quantity1 = cartDetail.getQuantity() + quantity;
                if (quantity1 > cartDetailDto.getInventoryLevel()) {
                    String errorMessage = "Quá số lượng sản phẩm trong kho. Vui lòng kiểm tra lại số lượng sản phẩm";
                    return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
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

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public ResponseEntity<List<ICartDetailDtoCheck>> findAllCartByAccountId() {
        Integer userId = ((AccountDetails) (SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getId();
        List<ICartDetailDtoCheck> cartDetailDtoList = cartDetailService.findvAllByAccountId(userId);
        return new ResponseEntity<>(cartDetailDtoList, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("cart-detail/{cartId}/{productId}")
    public ResponseEntity<?> deleteCartDetailByProductId(@PathVariable Integer cartId, @PathVariable Integer productId) {
        this.cartService.deleteByCartId(cartId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("cart-detail/unpay/")
    public ResponseEntity<?> updateCartDetailByCartDetailId() {
        Integer userId = ((AccountDetails) (SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getId();
        List<ICartDetailDtoCheck> cartDetailDtoList = cartDetailService.findvAllByAccountIdUnPay(userId);
        return new ResponseEntity<>(cartDetailDtoList, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("cart-detail/purchaseHistory/list/")
    public ResponseEntity<?> findAllPurchaseHistoryByAccountId() {
        Integer userId = ((AccountDetails) (SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getId();
        List<PurchaseHistory> purchaseHistories = this.purchaseService.findAllByAccount_AccountId(userId);
        return new ResponseEntity<>(purchaseHistories, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("cart-detail/purchaseHistory/detail/{purchaseHistoryId}")
    public ResponseEntity<List<ICartDetailDtoCheck>> findAllPurchaseHistoryByPurchaseHistoryId(@PathVariable Integer purchaseHistoryId) {
        List<ICartDetailDtoCheck> purchaseHistoriesDetail = this.cartDetailService.findAllvCartDetailByPurchaseHistory(purchaseHistoryId);
        return new ResponseEntity<>(purchaseHistoriesDetail, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("cart-detail/purchaseHistory/{total}")
    public ResponseEntity<?> addNewPurchaseHistory(
            @PathVariable double total) {
        Integer userId = ((AccountDetails) (SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getId();
        Account account = accountService.findAccountById(userId);
        List<Integer> cartDetailDto2s = this.cartDetailService.findAllvCartDetailByAccountIdAndIsDelete(userId);
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
            cartDetail.setDelete(true);
            cartDetail.setPurchaseHistory(purchaseHistory);
            this.cartDetailService.save(cartDetail);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
