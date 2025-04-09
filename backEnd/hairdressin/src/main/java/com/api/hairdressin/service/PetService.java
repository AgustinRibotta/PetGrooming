package com.api.hairdressin.service;

import java.util.List;

import com.api.hairdressin.entity.Pet;

public interface PetService {
    
    List<Pet> finAll();
    Pet finById(Long id);
    Boolean existsById(Long id);
    Pet save(Pet pet);
    Boolean delteById(Long id);
    List<Pet> findByOneOwnerId(Long ownerid);
    
}
