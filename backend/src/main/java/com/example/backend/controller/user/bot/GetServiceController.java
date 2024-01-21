package com.example.backend.controller.user.bot;

import com.example.backend.pojo.Bot;
import com.example.backend.service.user.bot.GetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GetServiceController {
    @Autowired
    private GetService getService;

    @GetMapping("/user/bot/getlist/")
    public List<Bot> getlist() {
        return getService.getList();
    }
}
