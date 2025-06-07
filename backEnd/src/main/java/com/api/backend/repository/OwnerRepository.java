package com.api.backend.repository;

import org.springframework.data.repository.CrudRepository;

import com.api.backend.entity.Owner;

public interface OwnerRepository extends CrudRepository < Owner, Long > {

    Boolean existsByPhoneNumberAndName(String phoneNumber, String name);
}
