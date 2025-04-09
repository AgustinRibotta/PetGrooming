package com.api.hairdressin.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.api.hairdressin.entity.Pet;

public interface PetRepository extends CrudRepository< Pet , Long >{

    List<Pet> findByOneOwnerId(Long ownerid);
}
