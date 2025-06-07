package com.api.backend.service;

import java.util.List;

import com.api.backend.dto.OwnerDTO;
import com.api.backend.dto.OwnerDetailDTO;


public interface OwnerService {

    List <OwnerDTO> findAll();
    OwnerDetailDTO findById(Long id);
    Boolean existsById(Long id);
    OwnerDTO save(OwnerDTO owner);
    void deleteById (Long id);
    Boolean existsByPhoneNumberAndName(String phoneNumber, String name);
    
}
