package com.hirehub.adapter;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.UUID;

@Component
public class LocalFileStorageAdapter implements FileStorageAdapter {

    @Override
    public String saveFile(MultipartFile file) {

        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path uploadPath = Paths.get("uploads");

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);

            Files.copy(file.getInputStream(), filePath);

            return filePath.toString();

        } catch (Exception e) {
            throw new RuntimeException("File upload failed");
        }
    }
}