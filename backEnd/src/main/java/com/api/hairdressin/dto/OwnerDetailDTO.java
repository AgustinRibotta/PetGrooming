package com.api.hairdressin.dto;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OwnerDetailDTO {
    
    private Long id;

    @NotEmpty(message = "Name is mandatory")
    private String name;

    @NotEmpty(message = "Phone number is mandatory")
    private String phoneNumber;
    
    private List<PetDTO> pets;

    public OwnerDetailDTO(Long id, String name, String phoneNumber, List<PetDTO> pets) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.pets = pets;
    }

}
