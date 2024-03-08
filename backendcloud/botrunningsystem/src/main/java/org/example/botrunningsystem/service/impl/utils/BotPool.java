package org.example.botrunningsystem.service.impl.utils;

import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

public class BotPool extends Thread {
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition condition = lock.newCondition();
    private Queue<Bot> bots = new LinkedList<>();

    public void addBot(Integer userId, String botCode, String input) { // 往队列里插入一个Bot
        lock.lock();
        try {
            bots.add(new Bot(userId, botCode, input));
            condition.signalAll(); // 唤起另外一个线程
        } finally {
            lock.unlock();
        }
    }

    private void consume(Bot bot) { // 编译执行一段代码，比较耗时
        Consumer consumer = new Consumer();
        consumer.startTimeout(2000, bot);
    }

    @Override
    public void run() {
        while (true) {
            lock.lock();
            if (bots.isEmpty()) { // 为空时要阻塞住
                try {
                    condition.await(); // 让当前线程被阻塞住，直到被唤醒或中断为止，睡住后就会自动将锁释放
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    lock.unlock();
                    break;
                }
            } else { // 如果发现不空的话
                Bot bot = bots.remove(); // 将队头取出来
                lock.unlock();
                consume(bot); // 比较耗时
            }
        }
    }
}
