package com.api.backend.controllers;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.backend.dto.OwnerDTO;
import com.api.backend.dto.OwnerDetailDTO;
import com.api.backend.service.OwnerService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/owners")

public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @GetMapping()
    private ResponseEntity<List<OwnerDTO>> findAllOwner () {
        List<OwnerDTO> owner = ownerService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(owner);
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> findOwnserById(@PathVariable Long id) {
        OwnerDetailDTO owner = ownerService.findById(id);

        if (owner == null) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Owner with id " + id + " not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
        return ResponseEntity.ok(owner);
    }

    @PostMapping()
    private ResponseEntity<?> saveOwner (@Valid @RequestBody OwnerDTO owner){
        
        if (ownerService.existsByPhoneNumberAndName(owner.getPhoneNumber(), owner.getName())) {
            return ResponseEntity.badRequest().body("Owner with same name and phone number already exists");
        }

        OwnerDTO saveOwner = ownerService.save(owner);
        URI location = URI.create("/api/owners/" + saveOwner.getId());
         

        return ResponseEntity.created(location).body(saveOwner);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<?> putOwner( @PathVariable Long id, @RequestBody OwnerDTO owner) {

        if (!ownerService.existsById(id)){
            Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("message", "Owner with id " + id + " does not exist.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        owner.setId(id); 
        OwnerDTO updatedOwner = ownerService.save(owner);

        return ResponseEntity.ok(updatedOwner);  
    }


    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteOwner (@PathVariable Long id) {
        if (!ownerService.existsById(id)) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Owner with id " + id + " does not exist.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    
        ownerService.deleteById(id);
    
        Map<String, String> deleteResponse = new HashMap<>();
        deleteResponse.put("message", "Owner with id " + id + " was deleted.");
    
        return ResponseEntity.accepted().body(deleteResponse);
    }

}
