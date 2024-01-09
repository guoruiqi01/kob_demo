package com.example.backend.service.impl.user.bot;

import com.example.backend.mapper.BotMapper;
import com.example.backend.pojo.Bot;
import com.example.backend.pojo.User;
import com.example.backend.service.impl.utils.UserDetailsImpl;
import com.example.backend.service.user.bot.AddService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AddServiceImpl implements AddService {

    @Autowired
    private BotMapper botMapper;


    @Override
    public Map<String, String> add(Map<String, String> data) {
        Map<String, String> map = new HashMap<>();
        UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken)
                SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl loginuser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginuser.getUser();

        String title = data.get("title");
        String description = data.get("description");
        String content = data.get("content");

        if (title == null || title.length() == 0) {
            map.put("error_message", "标题不能为空");
            return map;
        }
        if (title.length() > 100) {
            map.put("error_message", "标题长度不能超过100");
            return map;
        }

        if (description == null) {
            map.put("error_message", "这个用户很懒，什么都没有留下~");
            return map;
        }

        if (description.length() > 300) {
            map.put("error_message", "Bot描述的长度不能大于300");
            return map;
        }

        if (content == null || content.length() == 0) {
            map.put("error_message", "代码不能为空");
            return map;
        }
        Date now = new Date();
        Bot bot = new Bot(null, user.getId(), title,
                content, description,1500, now, now);

        botMapper.insert(bot);

        map.put("error_message", "success");
        return map;
    }
}
