package com.api.hairdressin.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class TestControler {

    @GetMapping("/")
    public String getMethodName() {
        return new String("Se actualiza solo!!!!");
    }
    


}
