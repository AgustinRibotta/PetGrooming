package com.api.hairdressin.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.hairdressin.dto.PetDTO;
import com.api.hairdressin.entity.Pet;
import com.api.hairdressin.service.PetService;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    private PetService petservice;

    @GetMapping()
    private ResponseEntity<List<PetDTO>> findAllPet () {
        List<PetDTO> pets = petservice.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(pets);
    };

    @GetMapping("/{id}")
    private ResponseEntity<?> findPetById(@PathVariable Long id) {
        PetDTO pet = petservice.findById(id);
    
        if (pet == null) {
        Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Pet with id " + id + " not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
            return ResponseEntity.ok(pet);
        }
    
}
