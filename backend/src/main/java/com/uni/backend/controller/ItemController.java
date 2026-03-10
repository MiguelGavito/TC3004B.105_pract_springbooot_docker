package com.uni.backend.controller;

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