package com.api.hairdressin.controllers;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.hairdressin.dto.PetDTO;
import com.api.hairdressin.service.PetService;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


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
    };

    @PostMapping("/{id}")
    private ResponseEntity<?> savedPet (@PathVariable Long id, @RequestBody PetDTO pet ){
        
        if (petservice.existsById(id)){
            Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("message", "Pet with id " + id + " already exists.");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
        
        PetDTO savedPet = petservice.save(pet);
        
        URI location = URI.create("/api/pets/" + id);
        return ResponseEntity.created(location).body(savedPet);    

    };

    
}
