package com.uni.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.stereotype.Service;

import com.uni.backend.model.Item;
import com.uni.backend.model.ItemCreateRequest;

import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

@Service
public class ItemService {
    private final ObjectMapper objectMapper;
    private final Path filePath = Paths.get("data/items.json");

    public ItemService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<Item> getAll() throws IOException {
        ensureFile();
        return objectMapper.readValue(filePath.toFile(), new TypeReference<List<Item>>() {});
    }

    public Item create(ItemCreateRequest req) throws IOException {
        List<Item> items = getAll();
        long nextId = items.stream().mapToLong(i -> i.getId() == null ? 0 : i.getId()).max().orElse(0) + 1;
        Item nuevo = new Item(nextId, req.getNombre(), req.getGrupo());
        items.add(nuevo);
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(filePath.toFile(), items);
        return nuevo;
    }

    private void ensureFile() throws IOException {
        if (Files.notExists(filePath.getParent())) Files.createDirectories(filePath.getParent());
        if (Files.notExists(filePath) || Files.size(filePath) == 0) Files.writeString(filePath, "[]");
    }
}
