package com.api.hairdressin.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.hairdressin.dto.OwnerDTO;
import com.api.hairdressin.service.OwnerService;

@RestController
@RequestMapping("/api/owner")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @GetMapping()
    private ResponseEntity<List<OwnerDTO>> findAllOwner () {
        List<OwnerDTO> owner = ownerService.finAll();
        return ResponseEntity.status(HttpStatus.OK).body(owner);
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> findOwnserById(@PathVariable Long id) {
        OwnerDTO owner = ownerService.finById(id);

        if (owner == null) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Owner with id " + id + "not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
        return ResponseEntity.ok(owner);
    }

}
