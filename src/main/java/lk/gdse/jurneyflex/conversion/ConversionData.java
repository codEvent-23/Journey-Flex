package lk.gdse.jurneyflex.conversion;

import lk.gdse.jurneyflex.dto.*;
import lk.gdse.jurneyflex.entity.*;
import lk.gdse.jurneyflex.entity.Package;
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

    public PackageDTO packagetoPackageDto(Package pack){
        return modelMapper.map(pack, PackageDTO.class);
    }

    public Package packageDtoToPackage(PackageDTO packDTO){
        return modelMapper.map(packDTO, Package.class);
    }

    public List<PackageDTO> convertPackageDtoList(List<Package> packageList){
        return modelMapper.map(packageList, List.class);
    }

    public CardDTO cardtoCardDto(Card card){
        return modelMapper.map(card, CardDTO.class);
    }

    public Card cardDtoToCard(CardDTO cardDTO){
        return modelMapper.map(cardDTO, Card.class);
    }

    public List<CardDTO> convertCardDtoList(List<Card> cardList){
        return modelMapper.map(cardList, List.class);
    }

    public BusDTO busToBusDto(Bus bus){
        return modelMapper.map(bus, BusDTO.class);
    }

    public Bus convertBusDTOToBus(BusDTO busDTO){
        return modelMapper.map(busDTO, Bus.class);
    }

    public List<BusDTO> convertBusDtoList(List<Bus> busList){
        return modelMapper.map(busList, List.class);
    }
}
