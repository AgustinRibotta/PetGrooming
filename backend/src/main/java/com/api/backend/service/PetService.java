package com.api.backend.service;

import java.util.List;

import com.api.backend.dto.PetDTO;

public interface PetService {
    
    List<PetDTO> findAll();
    PetDTO findById(Long id);
    Boolean existsById(Long id);
    PetDTO save(PetDTO pet);
    void deleteById(Long id);
    
}
