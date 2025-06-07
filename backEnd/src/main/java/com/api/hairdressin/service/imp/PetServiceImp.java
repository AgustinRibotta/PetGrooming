package com.api.hairdressin.service.imp;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.hairdressin.dto.PetDTO;
import com.api.hairdressin.entity.Owner;
import com.api.hairdressin.entity.Pet;
import com.api.hairdressin.repository.OwnerRepository;
import com.api.hairdressin.repository.PetRepository;
import com.api.hairdressin.service.PetService;


@Service
public class PetServiceImp implements PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private OwnerRepository ownerRepository;


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
                                pet.getObservations(),
                                pet.getOneOwner() != null ? pet.getOneOwner().getId() : null
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
                            p.getObservations(),
                            p.getOneOwner() != null ? p.getOneOwner().getId() : null

                         )).orElse(null);
    }

    @Override
    public Boolean existsById(Long id) {
        return petRepository.existsById(id);
    }

    @Override
    public PetDTO save(PetDTO petDTO) {
        Pet pet;

        if (petDTO.getId() != null) {
            // EDITAR: buscamos la mascota existente
            pet = petRepository.findById(petDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Pet with id " + petDTO.getId() + " not found"));
        } else {
            // CREAR: mascota nueva
            pet = new Pet();
        }

        // Seteamos los campos comunes
        pet.setName(petDTO.getName());
        pet.setRace(petDTO.getRace());
        pet.setColor(petDTO.getColor());
        pet.setAllergic(petDTO.getAllergic());
        pet.setSpecial_attention(petDTO.getSpecialAttention());
        pet.setObservations(petDTO.getObservations());

        // Cargamos el dueño si es necesario
        if (pet.getOneOwner() == null || !pet.getOneOwner().getId().equals(petDTO.getOwnerId())) {
            Owner owner = ownerRepository.findById(petDTO.getOwnerId())
                    .orElseThrow(() -> new RuntimeException("Owner with id " + petDTO.getOwnerId() + " not found"));
            pet.setOneOwner(owner);
        }

        Pet savedPet = petRepository.save(pet);

        return new PetDTO(
            savedPet.getId(),
            savedPet.getName(),
            savedPet.getRace(),
            savedPet.getColor(),
            savedPet.getAllergic(),
            savedPet.getSpecial_attention(),
            savedPet.getObservations(),
            savedPet.getOneOwner().getId()
        );
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        petRepository.deleteById(id);
    }

}
