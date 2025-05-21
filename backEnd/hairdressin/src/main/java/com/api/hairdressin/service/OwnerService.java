package com.api.hairdressin.service;

import java.util.List;

import com.api.hairdressin.dto.OwnerDTO;


public interface OwnerService {

    List <OwnerDTO> finAll();
    OwnerDTO finById(Long id);
    Boolean existsById(Long id);
    OwnerDTO save(OwnerDTO owner);
    void deleteById (Long id);
    
}
