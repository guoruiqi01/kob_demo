package com.example.backend.controller.pk;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pk/")
public class BoxInfoController {
    @RequestMapping("getbotinfo/")
    public Map<String, String> getbotinfo() {
        Map<String, String> botinfo = new HashMap<>();
        botinfo.put("name", "bob");
        botinfo.put("rating", "1500");
        return botinfo;
    }

}
