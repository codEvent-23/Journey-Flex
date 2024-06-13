package lk.gdse.jurneyflex.service.impl;

import jakarta.transaction.Transactional;
import lk.gdse.jurneyflex.conversion.ConversionData;
import lk.gdse.jurneyflex.dto.OwnerDetailsDTO;
import lk.gdse.jurneyflex.entity.Customer;
import lk.gdse.jurneyflex.entity.OwnerDetails;
import lk.gdse.jurneyflex.exeption.NotFoundException;
import lk.gdse.jurneyflex.repository.OwnerDetailsServiceDao;
import lk.gdse.jurneyflex.service.OwnerDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class OwnerDetailsServiceImpl implements OwnerDetailsService {
    @Autowired
    private ConversionData convert;
    @Autowired
    private OwnerDetailsServiceDao ownerDetailsServiceDao;
    @Override
    public void saveOwnerDetails(OwnerDetailsDTO ownerDetailsDTO) {
        ownerDetailsDTO.setOwnerId(generateNextOwnerId());
        convert.ownerDetailsToOwnerDetailsDto(ownerDetailsServiceDao.save(convert.ownerDetailsDtoToOwnerDetails(ownerDetailsDTO)));
    }

    @Override
    public List<OwnerDetailsDTO> getAllOwnerDetails() {
        return convert.convertToOwnerDetailsDtoList(ownerDetailsServiceDao.findAll());
    }

    @Override
    public OwnerDetailsDTO getOwnerDetailsById(String id) {
        if (!ownerDetailsServiceDao.existsById(id)) throw new NotFoundException("Owner not found");
        return convert.ownerDetailsToOwnerDetailsDto(ownerDetailsServiceDao.findById(id).orElse(null));
    }

    @Override
    public void updateOwnerDetails(String id, OwnerDetailsDTO ownerDetailsDTO) {
        if (!ownerDetailsServiceDao.existsById(id)) throw new NotFoundException("Owner not found");
        ownerDetailsServiceDao.save(convert.ownerDetailsDtoToOwnerDetails(ownerDetailsDTO));
    }

    @Override
    public void deleteOwnerDetails(String id) {
        if (!ownerDetailsServiceDao.existsById(id)) throw new NotFoundException("Owner not found");
        ownerDetailsServiceDao.deleteById(id);
    }

    @Override
    public String generateNextOwnerId() {
        OwnerDetails lastOwner = ownerDetailsServiceDao.findFirstByOrderByOwnerIdDesc();
        if (lastOwner == null) {
            return "Owner-001";
        }
        String lastOwnerId = lastOwner.getOwnerId();
        int lastId = Integer.parseInt(lastOwnerId.split("-")[1]);
        int nextId = lastId + 1;
        return "Owner-" + String.format("%03d", nextId);
    }
}
