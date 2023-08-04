package com.example.smart_home.repository;

import com.example.smart_home.model.order.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ICartRepository extends JpaRepository<Cart,Integer> {

}
