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

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    private PetService petService;

    @GetMapping()
    private ResponseEntity<List<PetDTO>> findAllPet () {
        List<PetDTO> pets = petService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(pets);
    };

    @GetMapping("/{id}")
    private ResponseEntity<?> findPetById(@PathVariable Long id) {
        PetDTO pet = petService.findById(id);
    
        if (pet == null) {
        Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Pet with id " + id + " not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
        return ResponseEntity.ok(pet);
    };

    @PostMapping()
    private ResponseEntity<?> savedPet (@Valid @RequestBody PetDTO pet ){
        
        PetDTO savedPet = petService.save(pet);
        
        URI location = URI.create("/api/pets/" + savedPet.getId());
        return ResponseEntity.created(location).body(savedPet);    

    };

    @PutMapping("/{id}")
    public ResponseEntity<?> putPet(@Valid @PathVariable Long id, @RequestBody PetDTO pet) {

        if (!petService.existsById(id)){
            Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("message", "Pet with id " + id + " does not exist.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        pet.setId(id); 
        PetDTO updatedPet = petService.save(pet);

        return ResponseEntity.ok(updatedPet);  
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePet(@PathVariable Long id) {
    
        if (!petService.existsById(id)) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Pet with id " + id + " does not exist.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    
        petService.deleteById(id);
    
        Map<String, String> deleteResponse = new HashMap<>();
        deleteResponse.put("message", "Pet with id " + id + " was deleted.");
    
        return ResponseEntity.accepted().body(deleteResponse);
    }

}
