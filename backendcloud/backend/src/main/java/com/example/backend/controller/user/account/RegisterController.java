package com.example.backend.controller.user.account;

import com.example.backend.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class RegisterController {
    @Autowired
    private RegisterService registerService;


    @PostMapping("/api/user/account/register/")
    Map<String, String> register(@RequestParam Map<String, String> user) {
        String username = user.get("username");
        String password = user.get("password");
        String confirmedPassword = user.get("confirmedPassword");

        return registerService.register(username, password, confirmedPassword);
    }
}
