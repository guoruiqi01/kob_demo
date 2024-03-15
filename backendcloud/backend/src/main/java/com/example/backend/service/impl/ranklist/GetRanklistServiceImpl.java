package com.example.backend.service.impl.ranklist;

import com.alibaba.fastjson2.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.backend.mapper.UserMapper;
import com.example.backend.pojo.User;
import com.example.backend.service.ranklist.GetRanklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GetRanklistServiceImpl implements GetRanklistService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public JSONObject getRanklist(Integer page) {
        IPage<User> userIPage = new Page<>(page, 10); // 每页展示10名用户
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("rating");
        List<User> users = userMapper.selectPage(userIPage, queryWrapper).getRecords();
        JSONObject resp = new JSONObject();

        for (User user: users) { // 清空密码
            user.setPassword("");
        }

        resp.put("users", users);
        resp.put("users_count", userMapper.selectCount(null));

        return resp;
    }
}
