package lk.gdse.jurneyflex.service;

import lk.gdse.jurneyflex.dto.OwnerDetailsDTO;

import java.util.List;

public interface OwnerDetailsService {
    void saveOwnerDetails(OwnerDetailsDTO ownerDetailsDTO);

    List<OwnerDetailsDTO> getAllOwnerDetails();

    OwnerDetailsDTO getOwnerDetailsById(String id);

    void updateOwnerDetails(String id, OwnerDetailsDTO ownerDetailsDTO);

    void deleteOwnerDetails(String id);

    String generateNextOwnerId();
}
