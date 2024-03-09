package com.example.backend.service.impl.pk;

import com.example.backend.consumer.WebSocketServer;
import com.example.backend.consumer.utils.Game;
import com.example.backend.service.pk.ReceiveBotMove;
import org.springframework.stereotype.Service;

@Service
public class ReceiveBotMoveImpl implements ReceiveBotMove {
    @Override
    public String receiveBotMove(Integer userId, Integer direction) {
        System.out.println("receivce bot move: " + userId + " " + direction);
        if (WebSocketServer.users.get(userId) != null) {
            Game game = WebSocketServer.users.get(userId).game;
            if (game != null) {
                if (game.getPlayerA().getId().equals(userId)) { // 判断当前连接是玩家A还是B
                    game.setNextStepA(direction);
                } else if (game.getPlayerB().getId().equals(userId)) {
                    game.setNextStepB(direction);
                }
            }
        }
        return "receive bot move success";
    }
}
