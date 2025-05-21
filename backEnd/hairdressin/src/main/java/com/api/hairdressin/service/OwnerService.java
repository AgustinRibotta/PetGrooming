package com.api.hairdressin.service;

import java.util.List;

import com.api.hairdressin.dto.OwnerDTO;
import com.api.hairdressin.dto.OwnerDetailDTO;


public interface OwnerService {

    List <OwnerDTO> findAll();
    OwnerDetailDTO findById(Long id);
    Boolean existsById(Long id);
    OwnerDTO save(OwnerDTO owner);
    void deleteById (Long id);
    
}
