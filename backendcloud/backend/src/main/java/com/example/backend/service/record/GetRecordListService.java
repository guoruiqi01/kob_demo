package com.example.backend.service.record;

import com.alibaba.fastjson2.JSONObject;

public interface GetRecordListService {
    JSONObject getList(Integer page); // 需要传入一个页表的编号，返回第几页
}
