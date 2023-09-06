package com.example.smart_home.repository;

import com.example.smart_home.dto.ICartDetailDto;
import com.example.smart_home.dto.ICartDetailDtoCheck;
import com.example.smart_home.model.order.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public interface ICartDetailRepository extends JpaRepository<CartDetail, Integer> {
    @Modifying
    @Query(value = "SELECT c.carts_id as cartId, cd.cart_detail_id as cartDetailId, p.product_name as productName, p.description as description,\n" +
            "            p.price as price, cd.quantity as quantity, p.product_id as productId, p.inventory_level as inventoryLevel\n" +
            "            FROM cart_detail cd join cart c on cd.cart_id = c.carts_id\n" +
            "            join product p on p.product_id = cd.product_id\n" +
            "            where c.account_id = :id and cd.is_delete =0", nativeQuery = true)
    List<ICartDetailDto> findAllCartDetailByAccountId(@Param("id") Integer accountId);

    @Query(value = "SELECT c.carts_id as cartId, cd.cart_detail_id as cartDetailId, p.product_name as productName, p.description as `description`,\n" +
            "              p.price as price, cd.quantity as quantity, p.product_id as productId, p.inventory_level as inventoryLevel,\n" +
            "                 (SELECT pil.image_list FROM product_image_list pil WHERE pil.product_product_id = p.product_id LIMIT 1) as image\n" +
            "            FROM cart_detail cd\n" +
            "            JOIN cart c ON cd.cart_id = c.carts_id\n" +
            "            JOIN product p ON p.product_id = cd.product_id\n" +
            "            JOIN purchase_history ph ON ph.purchase_history_id = cd.purchase_history_id\n" +
            "            WHERE ph.purchase_history_id = :id and cd.is_delete = 1", nativeQuery = true)
    List<ICartDetailDtoCheck> findAllvCartDetailByPurchaseHistory(@Param("id") Integer purchaseHistory);

    @Query(value = "SELECT c.cart_id as cartId, cd.cart_detail_id as cartDetailId, p.product_name as productName, p.description as `description`,\n" +
            "       p.price as price, cd.quantity as quantity, p.product_id as productId, p.inventory_level as inventoryLevel,\n" +
            "       (SELECT pil.image_list FROM product_image_list pil WHERE pil.product_product_id = p.product_id LIMIT 1) as image\n" +
            "FROM cart_detail cd\n" +
            "JOIN cart c ON cd.cart_id = c.carts_id\n" +
            "JOIN product p ON p.product_id = cd.product_id\n" +
            "WHERE c.account_id = :id and cd.is_delete =0", nativeQuery = true)
    List<ICartDetailDtoCheck> findAllvCartDetailByAccountId(@Param("id") Integer accountId);

    @Query(value = "SELECT cd.cart_detail_id as cartDetailId  FROM cart_detail cd\n" +
            "JOIN cart c ON cd.cart_id = c.carts_id\n" +
            "LEFT JOIN purchase_history ph ON ph.purchase_history_id = cd.purchase_history_id\n" +
            "WHERE c.account_id = :id and cd.is_delete = 0 and cd.purchase_history_id is null", nativeQuery = true)
    List<Integer> findAllvCartDetailByAccountIdAndIsDelete(@Param("id") Integer accountId);

//    void deleteCartDetailByCartsIdAndProductId(Integer cartId, Integer productId);

    @Modifying
    @Query(value = "update cart_detail set quantity = :quantity where cart_detail_id = :id", nativeQuery = true)
    void updateQuantityOfCartDetail(@Param("quantity") int quantity, @Param("id") Integer cartDetailId);

    @Modifying
    @Query(value = "UPDATE cart_detail cd\n" +
            "JOIN cart c ON cd.cart_id = c.carts_id\n" +
            "SET cd.is_delete = 0\n" +
            "WHERE c.account_id = :id", nativeQuery = true)
    void deleteAllCartVDetail(@Param("id") Integer accountId);

    @Query(value = "select * from cart_detail cd where cd.cart_detail_id = :id and cd.is_delete = 0", nativeQuery = true)
    CartDetail findCartDetailVByIdAndIsDelete(@Param("id") Integer id);

    @Query(value = "SELECT * FROM cart_detail cd " +
            "JOIN cart c ON cd.cart_id = c.carts_id " +
            "WHERE c.account_id = :accountId AND cd.is_delete = 0 AND cd.purchase_history_id IS NULL", nativeQuery = true)
    List<ICartDetailDtoCheck> findAllvCartDetailByAccountIdUnPay(Integer accountId);

}
