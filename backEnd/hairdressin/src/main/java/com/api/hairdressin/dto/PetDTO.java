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
    private String special_attention;
    private String observations;

}
