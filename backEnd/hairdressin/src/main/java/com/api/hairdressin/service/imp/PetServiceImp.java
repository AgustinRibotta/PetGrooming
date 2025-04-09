package com.api.hairdressin.service.imp;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.hairdressin.dto.PetDTO;
import com.api.hairdressin.entity.Pet;
import com.api.hairdressin.repository.PetRepository;
import com.api.hairdressin.service.PetService;

@Service
public class PetServiceImp implements PetService {

    @Autowired
    private PetRepository petRepository;

    @Override
    public List<PetDTO> findAll() {
        Iterable<Pet> pets = petRepository.findAll();  
        return StreamSupport.stream(pets.spliterator(), false)  
                            .map(pet -> new PetDTO(  
                                pet.getId(),
                                pet.getName(),
                                pet.getRace(),
                                pet.getColor(),
                                pet.getAllergic(),
                                pet.getSpecial_attention(),
                                pet.getObservations()
                            ))
                            .collect(Collectors.toList());  
    }
    

    @Override
    public PetDTO findById(Long id) {
        Optional<Pet> pet = petRepository.findById(id);
        return pet.map( p -> new PetDTO(
                             p.getId(), 
                             p.getName(), 
                             p.getRace(), 
                             p.getColor(), 
                             p.getAllergic(),
                             p.getSpecial_attention(), 
                             p.getObservations()
                         )).orElse(null);
    }

    @Override
    public Boolean existsById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'existsById'");
    }

    @Override
    public PetDTO save(PetDTO pet) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    @Override
    public Boolean delteById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delteById'");
    }

    @Override
    public List<PetDTO> findByOneOwnerId(Long ownerid) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByOneOwnerId'");
    }

}
