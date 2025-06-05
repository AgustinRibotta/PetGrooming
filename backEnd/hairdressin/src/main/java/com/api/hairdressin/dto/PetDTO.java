package com.api.hairdressin.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PetDTO {

    private Long id;

    @NotEmpty(message = "Name is required.")
    private String name;

    @NotEmpty(message = "Race is required.")
    private String race;

    @NotEmpty(message = "Color is required.")
    private String color;

    @NotEmpty(message = "Allergic field is required.")
    private String allergic;

    @NotEmpty(message = "Special attention is required.")
    private String specialAttention;

    private String observations;

    @NotNull(message = "Owner ID is required.")
    private Long ownerId;

    @Override
    public String toString() {
        return "PetDTO{id=" + id + ", name='" + name + "', race='" + race + "', color='" + color + "', allergic='" + allergic + "', special_attention='" + specialAttention + "', observations='" + observations +   "', ownerId=" + ownerId + "}";
    }

}


