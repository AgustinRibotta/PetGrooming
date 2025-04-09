package com.api.hairdressin.dto;

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
    private String name;
    private String race;
    private String color;
    private String allergic;
    private String specialAttention;
    private String observations;

    @Override
    public String toString() {
        return "PetDTO{id=" + id + ", name='" + name + "', race='" + race + "', color='" + color + "', allergic='" + allergic + "', special_attention='" + specialAttention + "', observations='" + observations + "'}";
    }

}


