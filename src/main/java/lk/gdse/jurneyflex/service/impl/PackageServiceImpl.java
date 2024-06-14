package lk.gdse.jurneyflex.service.impl;

import jakarta.transaction.Transactional;

import lk.gdse.jurneyflex.ENUM.Status;
import lk.gdse.jurneyflex.conversion.ConversionData;
import lk.gdse.jurneyflex.dto.PackageDTO;
import lk.gdse.jurneyflex.entity.Package;
import lk.gdse.jurneyflex.exeption.NotFoundException;
import lk.gdse.jurneyflex.repository.PackageServiceDao;
import lk.gdse.jurneyflex.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author Amil Srinath
 */

@Service
@Transactional
public class PackageServiceImpl implements PackageService {
    @Autowired
    private PackageServiceDao packageServiceDao;
    @Autowired
    private ConversionData convert;
    @Override
    public void addPackage(PackageDTO packageDTO) {
        convert.packagetoPackageDto(packageServiceDao.save(convert.packageDtoToPackage(packageDTO)));
    }

    @Override
    public void updateStatus(String id) {
        if (!packageServiceDao.existsById(id)) throw new NotFoundException("Package not found");
        Optional<Package> byId = packageServiceDao.findById(id);
        if(byId.isPresent()){
            Package package1 = byId.get();
            package1.setStatus(Status.ACTIVE);
        }
    }
}