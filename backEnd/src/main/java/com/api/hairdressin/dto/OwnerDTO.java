package com.api.hairdressin.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OwnerDTO {
    
    private Long id;

    @NotEmpty(message = "Name is mandatory")
    private String name;

    @NotEmpty(message = "Phone number is mandatory")
    private String phoneNumber;

    private int petCount;

    public OwnerDTO(Long id, String name, String phoneNumber, int petCount) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber; 
        this.petCount = petCount;
    }

}
