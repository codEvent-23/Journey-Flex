package lk.gdse.jurneyflex.service.impl;

import jakarta.transaction.Transactional;
<<<<<<< HEAD
=======
import lk.gdse.jurneyflex.conversion.ConversionData;
>>>>>>> e63abf6 (add packageService implementation)
import lk.gdse.jurneyflex.dto.PackageDTO;
import lk.gdse.jurneyflex.entity.Package;
import lk.gdse.jurneyflex.repository.PackageServiceDao;
import lk.gdse.jurneyflex.service.PackageService;
<<<<<<< HEAD
import org.springframework.stereotype.Service;

@Transactional
@Service
=======
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
@Transactional
>>>>>>> e63abf6 (add packageService implementation)
public class PackageServiceImpl implements PackageService {
    @Autowired
    private PackageServiceDao packageServiceDao;
    @Autowired
    private ConversionData convert;
    @Override
    public void addPackage(PackageDTO packageDTO) {
        convert.packagetoPackageDto(packageServiceDao.save(convert.packageDtoToPackage(packageDTO)));
    }
}
