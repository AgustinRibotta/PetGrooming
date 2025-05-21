package com.api.hairdressin.service.imp;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.hairdressin.dto.OwnerDTO;
import com.api.hairdressin.entity.Owner;
import com.api.hairdressin.repository.OwnerRepository;
import com.api.hairdressin.service.OwnerService;

@Service
public class OwnerServiceImp implements OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;

    @Override
    public List<OwnerDTO> finAll() {
        Iterable <Owner> owners = ownerRepository.findAll();

        return StreamSupport.stream(owners.spliterator(), false)
                            .map(owner -> new OwnerDTO(
                                owner.getId(), 
                                owner.getName(), 
                                owner.getPhoneNumber(), 
                                owner.getPets()
                                ))
                                .collect(Collectors.toList());
        
    }

    @Override
    public OwnerDTO finById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'finById'");
    }

    @Override
    public Boolean existsById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'existsById'");
    }

    @Override
    public OwnerDTO save(OwnerDTO owner) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    @Override
    public void deleteById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteById'");
    }


}
