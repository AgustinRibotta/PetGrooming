package com.api.hairdressin.service;

import java.util.List;

import com.api.hairdressin.dto.PetDTO;

public interface PetService {
    
    List<PetDTO> findAll();
    PetDTO findById(Long id);
    Boolean existsById(Long id);
    PetDTO save(PetDTO pet);
    void deleteById(Long id);
    
}
