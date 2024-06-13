package lk.gdse.jurneyflex.service;

import lk.gdse.jurneyflex.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {
    CustomerDTO saveCustomer(CustomerDTO customerDTO);

    List<CustomerDTO> getAllCustomers();

    CustomerDTO getCustomerById(String id);

    void updateCustomer(String id, CustomerDTO customerDTO);

    void deleteCustomer(String id);

    String generateNextCustomerId();
}
