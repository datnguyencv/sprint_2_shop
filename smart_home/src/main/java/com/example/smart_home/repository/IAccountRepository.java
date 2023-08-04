package com.example.smart_home.repository;

import com.example.smart_home.model.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IAccountRepository extends JpaRepository<Account,Integer> {
    @Query(value = "select a.* from  User as a where a.username= :email", nativeQuery = true)
    Account findAccountByEmail(@Param("email") String email);
}
