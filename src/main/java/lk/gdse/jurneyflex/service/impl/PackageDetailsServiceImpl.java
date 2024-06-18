package lk.gdse.jurneyflex.service.impl;

import jakarta.transaction.Transactional;
import lk.gdse.jurneyflex.ENUM.Status;
import lk.gdse.jurneyflex.conversion.ConversionData;
import lk.gdse.jurneyflex.dto.PackageDTO;
import lk.gdse.jurneyflex.entity.Customer;
import lk.gdse.jurneyflex.entity.Package;
import lk.gdse.jurneyflex.entity.PackageDetails;
import lk.gdse.jurneyflex.exeption.NotFoundException;
import lk.gdse.jurneyflex.repository.PackageDetailsServiceDao;
import lk.gdse.jurneyflex.repository.PackageServiceDao;
import lk.gdse.jurneyflex.service.CustomerService;
import lk.gdse.jurneyflex.service.PackageDetailsService;
import lk.gdse.jurneyflex.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Optional;

@Service
@Transactional
public class PackageDetailsServiceImpl implements PackageDetailsService {
    @Autowired
    private ConversionData convert;
    @Autowired
    private CustomerService customer;
    @Autowired
    private PackageService packageService;
    @Autowired
    private PackageDetailsServiceDao packageDetailsServiceDao;
    @Override
    public void addPackageDetails(PackageDTO packageDTO, String custId) {
        PackageDetails packageDetails = new PackageDetails();
        packageDetails.setPackages(convert.packageDtoToPackage(packageDTO));
        packageDetails.setCustomer(convert.customerDtoToCustomer(customer.getCustomerById(custId)));
        packageDetails.setPackDetailsId(generateNextPackageDetailsId());
        packageDetails.setAmount(packageDTO.getKmAmountPerDay() * packageDTO.getRoutePerDay() * 30);
        packageDetails.setActiveDate(packageDTO.getActiveDate());
        packageDetails.setExpireDate(packageDTO.getExpireDate());
        packageDetails.setStatus(Status.ACTIVE);
        packageDetailsServiceDao.save(packageDetails);
    }

    @Override
    public String generateNextPackageDetailsId() {
        PackageDetails lastPackageDetails = packageDetailsServiceDao.findFirstByOrderByPackDetailsIdDesc();
        if (lastPackageDetails == null) {
            return "PackDetails-001";
        }
        String lastPackageDetailsId = lastPackageDetails.getPackDetailsId();
        int lastId = Integer.parseInt(lastPackageDetailsId.split("-")[1]);
        int nextId = lastId + 1;
        return "PackDetails-" + String.format("%03d", nextId);
    }

    @Override
    public void activeStaticPackage(String packId, String custId, String activeDate, String expirationDate) {
        PackageDetails packageDetails = new PackageDetails();
        Package pack = convert.packageDtoToPackage(packageService.getPackageById(packId));
        packageDetails.setPackages(pack);
        packageDetails.setCustomer(convert.customerDtoToCustomer(customer.getCustomerById(custId)));
        packageDetails.setPackDetailsId(generateNextPackageDetailsId());

        System.out.println(pack.getKmAmountPerDay());
        System.out.println(pack.getRoutePerDay());

        packageDetails.setAmount(pack.getKmAmountPerDay() * pack.getRoutePerDay() * 30);
        packageDetails.setActiveDate(activeDate);
        packageDetails.setExpireDate(expirationDate);
        packageDetails.setStatus(Status.ACTIVE);
        packageDetailsServiceDao.save(packageDetails);
    }

    @Override
    public void deactivatePackageBeforeMidnight(String packId, String custId) {
        Optional<PackageDetails> packageDetailsOpt = packageDetailsServiceDao.findByPackagesPackIdAndCustomerCustId(packId, custId);
        if (packageDetailsOpt.isPresent()) {
            PackageDetails packageDetails = packageDetailsOpt.get();
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime activeDate = LocalDateTime.parse(packageDetails.getActiveDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            if (now.isBefore(activeDate.toLocalDate().atStartOfDay().plusDays(1))) {
                packageDetails.setStatus(Status.DEACTIVATE);
                packageDetailsServiceDao.save(packageDetails);
            }
        } else {
            throw new NotFoundException("Active package details not found for packId: " + packId + " and custId: " + custId);
        }
    }


}
