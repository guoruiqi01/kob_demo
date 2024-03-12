package com.example.backend.service.impl.user.account;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.backend.pojo.User;
import com.example.backend.service.impl.utils.UserDetailsImpl;
import com.example.backend.service.user.account.LoginService;
import com.example.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private AuthenticationManager authenticationManager; // Spring Security 提供的身份验证管理器

    @Override
    public Map<String, String> getToken(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, password); // authenticationToken身份验证令牌
        Authentication authentication = authenticationManager.authenticate(authenticationToken); // 验证身份
        UserDetailsImpl loginUser = (UserDetailsImpl) authentication.getPrincipal(); // 成功后从认证对象中获取“被代理人”
        User user = loginUser.getUser();
        String jwt = JwtUtil.createJWT(user.getId().toString()); // jwt用于后续的身份验证

        Map<String, String> map = new HashMap<>();
        map.put("error_message", "success");
        map.put("token", jwt);
        return map;
    }
}
