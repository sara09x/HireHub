package com.hirehub.adapter;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageAdapter {

    String saveFile(MultipartFile file);
}