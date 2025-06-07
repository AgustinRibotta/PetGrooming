package com.api.backend.repository;

import org.springframework.data.repository.CrudRepository;

import com.api.backend.entity.Pet;

public interface PetRepository extends CrudRepository< Pet , Long >{


}
