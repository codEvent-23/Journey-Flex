package lk.gdse.jurneyflex.service.impl;

import jakarta.transaction.Transactional;

import lk.gdse.jurneyflex.conversion.ConversionData;
import lk.gdse.jurneyflex.dto.PackageDTO;
import lk.gdse.jurneyflex.entity.Package;
import lk.gdse.jurneyflex.enumz.PackageType;
import lk.gdse.jurneyflex.exceptions.NotFoundException;
import lk.gdse.jurneyflex.repository.CustomerServiceDao;
import lk.gdse.jurneyflex.repository.PackageServiceDao;
import lk.gdse.jurneyflex.service.CustomerService;
import lk.gdse.jurneyflex.service.PackageDetailsService;
import lk.gdse.jurneyflex.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

    @Autowired
    private CustomerServiceDao customerServiceDao;

    @Autowired
    private CustomerService customerService;

    private final PackageDetailsService packageDetailsService;

    @Autowired
    public PackageServiceImpl(@Lazy PackageDetailsService packageDetailsService) {
        this.packageDetailsService = packageDetailsService;
    }

    @Override
    public void addCustomPackage(PackageDTO packageDTO, String id) {
        Package packages = new Package();
        if (customerServiceDao.existsById(id)) {
            packages.setPackId(generateNextPackageId());
            packages.setPackageType(PackageType.CUSTOM_PACKAGE);
            packages.setStartLat(packageDTO.getStartLat());
            packages.setStartLong(packageDTO.getStartLong());
            packages.setDestinationLat(packageDTO.getDestinationLat());
            packages.setDestinationLong(packageDTO.getDestinationLong());
            packages.setRoutePerDay(packageDTO.getRoutePerDay());
            packages.setKmAmountPerDay(packageDTO.getKmAmountPerDay());
            packages.setBusType(packageDTO.getBusType());
            packageServiceDao.save(packages);
            packageDetailsService.addPackageDetails(packageDTO,id);
        }
    }

    @Override
    public String generateNextPackageId() {
        Package lastPackage = packageServiceDao.findFirstByOrderByPackIdDesc();
        if (lastPackage == null) {
            return "Pack-001";
        }
        String lastPackId = lastPackage.getPackId();
        int lastId = Integer.parseInt(lastPackId.split("-")[1]);
        int nextId = lastId + 1;
        return "Pack-" + String.format("%03d", nextId);
    }

    @Override
    public void addStaticPackage(PackageDTO packageDTO) {
        packageDTO.setPackageType(PackageType.STATIC_PACKAGE);
        packageDTO.setPackId(generateNextPackageId());
        packageServiceDao.save(convert.packageDtoToPackage(packageDTO));
    }

    @Override
    public PackageDTO getPackageById(String id) {
        if (!packageServiceDao.existsById(id)) {
            throw new NotFoundException("Package not found");
        }
        return convert.packagetoPackageDto(packageServiceDao.findById(id).orElse(null));
    }

}



