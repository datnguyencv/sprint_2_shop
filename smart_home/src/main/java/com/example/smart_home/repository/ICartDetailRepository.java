package com.example.smart_home.repository;

import com.example.smart_home.model.order.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ICartDetailRepository extends JpaRepository<CartDetail, Integer> {

}
