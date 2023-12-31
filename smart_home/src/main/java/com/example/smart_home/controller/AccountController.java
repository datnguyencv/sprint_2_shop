package com.example.smart_home.controller;

import com.example.smart_home.model.account.Account;
import com.example.smart_home.serivce.IAccountService;
import com.example.smart_home.serivce.impl.AccountDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class AccountController {
    @Autowired
    private IAccountService accountService;
    @GetMapping("api/account/")
    public ResponseEntity<Account>findUserByEmail(){
        Integer userId = ((AccountDetails) (SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getId();
        Account account = accountService.findAccountById(userId);
        if (account == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(account,HttpStatus.OK);
        }
    }
}
