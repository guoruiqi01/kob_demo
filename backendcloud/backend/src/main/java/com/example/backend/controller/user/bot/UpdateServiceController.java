package com.example.backend.controller.user.bot;

import com.example.backend.service.user.bot.UpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UpdateServiceController {
    @Autowired
    private UpdateService updateService;

    @PostMapping("/api/user/bot/update/")
    private Map<String, String> update(@RequestParam Map<String, String> data) {
        return updateService.update(data);
    }
}
