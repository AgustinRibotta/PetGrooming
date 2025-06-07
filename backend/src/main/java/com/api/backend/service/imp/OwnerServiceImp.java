package com.api.backend.service.imp;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.backend.dto.OwnerDTO;
import com.api.backend.dto.OwnerDetailDTO;
import com.api.backend.dto.PetDTO;
import com.api.backend.entity.Owner;
import com.api.backend.repository.OwnerRepository;
import com.api.backend.service.OwnerService;

@Service
public class OwnerServiceImp implements OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;

    @Override
    public List<OwnerDTO> findAll() {
        Iterable<Owner> owners = ownerRepository.findAll();

        return StreamSupport.stream(owners.spliterator(), false)
            .map(owner -> new OwnerDTO(
                owner.getId(),
                owner.getName(),
                owner.getPhoneNumber(),
                owner.getPets() != null ? owner.getPets().size() : 0
            ))
            .collect(Collectors.toList());
        
    }

    @Override
    public OwnerDetailDTO findById(Long id) {
        return ownerRepository.findById(id).map(owner -> {
            List<PetDTO> petDTOs = owner.getPets().stream()
                .map(pet -> new PetDTO(
                    pet.getId(),
                    pet.getName(),
                    pet.getRace(),
                    pet.getColor(),
                    pet.getAllergic(),
                    pet.getSpecial_attention(),
                    pet.getObservations(),
                    owner.getId()
                ))
                .collect(Collectors.toList());

            return new OwnerDetailDTO(
                owner.getId(),
                owner.getName(),
                owner.getPhoneNumber(),
                petDTOs
            );
        }).orElse(null);
    }

    @Override
    public Boolean existsById(Long id) {

        return ownerRepository.existsById(id);
    }

    @Override
    public OwnerDTO save(OwnerDTO ownerDTO) {
        Owner owner;

        if (ownerDTO.getId() == null) {
            owner = new Owner();
        } else {
            owner = ownerRepository.findById(ownerDTO.getId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));
        }

        owner.setName(ownerDTO.getName());
        owner.setPhoneNumber(ownerDTO.getPhoneNumber());

        Owner savedOwner = ownerRepository.save(owner);

        return new OwnerDTO(
            savedOwner.getId(),
            savedOwner.getName(),
            savedOwner.getPhoneNumber(),
            savedOwner.getPets() != null ? savedOwner.getPets().size() : 0
        );
    }

    @Override
    public void deleteById(Long id) {
        ownerRepository.deleteById(id);
    }

    @Override
    public Boolean existsByPhoneNumberAndName(String phoneNumber, String name) {
        return ownerRepository.existsByPhoneNumberAndName(phoneNumber, name);
    }


}
