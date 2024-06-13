package lk.gdse.jurneyflex.service.impl;

import jakarta.transaction.Transactional;
import lk.gdse.jurneyflex.conversion.ConversionData;
import lk.gdse.jurneyflex.dto.CustomerDTO;
import lk.gdse.jurneyflex.entity.Customer;
import lk.gdse.jurneyflex.exeption.NotFoundException;
import lk.gdse.jurneyflex.repository.CustomerServiceDao;
import lk.gdse.jurneyflex.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private ConversionData convert;
    @Autowired
    private CustomerServiceDao customerServiceDao;
    @Override
    public CustomerDTO saveCustomer(CustomerDTO customerDTO) {
        customerDTO.setCustId(generateNextCustomerId());
        return convert.customerToCustomerDto(customerServiceDao.save(convert.customerDtoToCustomer(customerDTO)));
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return convert.convertCustomerDtoList(customerServiceDao.findAll());
    }

    @Override
    public CustomerDTO getCustomerById(String id) {
        if (!customerServiceDao.existsById(id)) throw  new NotFoundException("Customer not found");
        return convert.customerToCustomerDto(customerServiceDao.findById(id).orElse(null));
    }

    @Override
    public void updateCustomer(String id, CustomerDTO customerDTO) {
        if (!customerServiceDao.existsById(id)) throw  new NotFoundException("Customer not found");
        customerServiceDao.save(convert.customerDtoToCustomer(customerDTO));
    }

    @Override
    public void deleteCustomer(String id) {
        if (!customerServiceDao.existsById(id)) throw  new NotFoundException("Customer not found");
        customerServiceDao.deleteById(id);
    }

    @Override
    public String generateNextCustomerId() {
        Customer lastCustomer = customerServiceDao.findFirstByOrderByCustIdDesc();
        if (lastCustomer == null) {
            return "Cust-001";
        }
        String lastCustomerId = lastCustomer.getCustId();
        int lastId = Integer.parseInt(lastCustomerId.split("-")[1]);
        int nextId = lastId + 1;
        return "Cust-" + String.format("%03d", nextId);
    }
}
