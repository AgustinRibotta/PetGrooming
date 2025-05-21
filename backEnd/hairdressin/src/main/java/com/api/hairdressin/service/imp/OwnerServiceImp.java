package com.api.hairdressin.service.imp;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.hairdressin.dto.OwnerDTO;
import com.api.hairdressin.dto.OwnerDetailDTO;
import com.api.hairdressin.dto.PetDTO;
import com.api.hairdressin.entity.Owner;
import com.api.hairdressin.repository.OwnerRepository;
import com.api.hairdressin.service.OwnerService;

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

        Owner owner = new Owner();
        owner.setId(ownerDTO.getId());
        owner.setName(ownerDTO.getName());
        owner.setPhoneNumber(ownerDTO.getPhoneNumber());
        
        if (ownerRepository.existsByPhoneNumberAndName(ownerDTO.getPhoneNumber(),ownerDTO.getName())) {
            throw new RuntimeException("Owner with the same name and phone number exist");
        }

        Owner saveOwner = ownerRepository.save(owner);

        return null;

        
    }

    @Override
    public void deleteById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteById'");
    }


}
