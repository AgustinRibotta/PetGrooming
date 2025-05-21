package com.api.hairdressin.dto;

import java.util.List;

import com.api.hairdressin.entity.Pet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OwnerDTO {
    
    private Long id;
    private String name;
    private String phoneNumber;
    private List<Pet> pets;

}
