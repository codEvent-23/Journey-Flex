package lk.gdse.jurneyflex.service.impl;

import jakarta.transaction.Transactional;

import lk.gdse.jurneyflex.ENUM.Status;
import lk.gdse.jurneyflex.conversion.ConversionData;
import lk.gdse.jurneyflex.dto.PackageDTO;
import lk.gdse.jurneyflex.entity.Customer;
import lk.gdse.jurneyflex.entity.Package;
import lk.gdse.jurneyflex.exeption.NotFoundException;
import lk.gdse.jurneyflex.repository.CustomerServiceDao;
import lk.gdse.jurneyflex.repository.PackageServiceDao;
import lk.gdse.jurneyflex.service.CustomerService;
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

    @Autowired
    private CustomerServiceDao customerServiceDao;

    @Autowired
    private CustomerService customerService;

    @Override
    public void addPackage(PackageDTO packageDTO) {
        convert.packagetoPackageDto(packageServiceDao.save(convert.packageDtoToPackage(packageDTO)));
    }

    @Override
    public void updateStatus(String id, String cusID) {
        Package package1 = null;

        if (!packageServiceDao.existsById(id)) throw new NotFoundException("Package not found");
        Optional<Package> byId = packageServiceDao.findById(id);
        if(byId.isPresent()){
            package1 = byId.get();

            if (package1.getStatus().equals(Status.ACTIVE)) {
                package1.setStatus(Status.DEACTIVATE);
                setNullCustomer(cusID);
            }else {
                package1.setStatus(Status.ACTIVE);
                if (!customerServiceDao.existsById(cusID)) throw new NotFoundException("Customer not found");
                Optional<Customer> byCusId = customerServiceDao.findById(cusID);
                if(byCusId.isPresent()){
                    Customer customer = byCusId.get();
                    customer.setPackages(package1);
                }
            }
        }
    }

    private void setNullCustomer(String cusID) {
        Optional<Customer> byCusId = customerServiceDao.findById(cusID);
        if(byCusId.isPresent()){
            Customer customer = byCusId.get();
            customer.setPackages(null);
        }
    }
}



