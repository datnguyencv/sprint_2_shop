package com.example.smart_home.serivce;

import com.example.smart_home.model.account.Account;

public interface IAccountService {
    Account findAccountByEmail(String email);
    Account findAccountById(Integer  accountId);
    boolean checkOldPassword(String oldPassword, String password);


}
