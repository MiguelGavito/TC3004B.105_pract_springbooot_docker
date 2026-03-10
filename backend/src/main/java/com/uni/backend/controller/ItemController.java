package com.uni.backend.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uni.backend.model.Item;
import com.uni.backend.model.ItemCreateRequest;
import com.uni.backend.service.ItemService;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public List<Item> getItems() throws IOException {
        return itemService.getAll();
    }

    @PostMapping
    public Item createItem(@RequestBody ItemCreateRequest request) throws IOException {
        return itemService.create(request);
    }
}