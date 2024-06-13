package lk.gdse.jurneyflex.conversion;

import lk.gdse.jurneyflex.dto.*;
import lk.gdse.jurneyflex.entity.*;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ConversionData {
    private final ModelMapper modelMapper;
    public CustomerDTO customerToCustomerDto(Customer customer){
        return modelMapper.map(customer, CustomerDTO.class);
    }
    public Customer customerDtoToCustomer(CustomerDTO customerDTO){
        return modelMapper.map(customerDTO, Customer.class);
    }
    public List<CustomerDTO> convertCustomerDtoList(List<Customer> customerList){
        return modelMapper.map(customerList, List.class);
    }

    public OwnerDetailsDTO ownerDetailsToOwnerDetailsDto(OwnerDetails ownerDetails){
        return modelMapper.map(ownerDetails, OwnerDetailsDTO.class);
    }

    public OwnerDetails ownerDetailsDtoToOwnerDetails(OwnerDetailsDTO ownerDetailsDTO){
        return modelMapper.map(ownerDetailsDTO, OwnerDetails.class);
    }

    public List<OwnerDetailsDTO> convertToOwnerDetailsDtoList(List<OwnerDetails> ownerDetailsList){
        return modelMapper.map(ownerDetailsList, List.class);
    }
}
