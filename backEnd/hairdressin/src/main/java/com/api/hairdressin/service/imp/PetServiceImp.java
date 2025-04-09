package com.api.hairdressin.service.imp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.hairdressin.entity.Pet;
import com.api.hairdressin.repository.PetRepository;
import com.api.hairdressin.service.PetService;

@Service
public class PetServiceImp implements PetService {

    @Autowired
    private PetRepository petRepository;

    @Override
    public List<Pet> finAll() {
        return (List<Pet>) petRepository.findAll();

    }

    @Override
    public Pet finById(Long id) {
        Optional<Pet> pet = petRepository.findById(id);
        return pet.orElse(null);
    }

    @Override
    public Boolean existsById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'existsById'");
    }

    @Override
    public Pet save(Pet pet) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    @Override
    public Boolean delteById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delteById'");
    }

    @Override
    public List<Pet> findByOneOwnerId(Long ownerid) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByOneOwnerId'");
    }

}
