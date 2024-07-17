package lk.gdse.jurneyflex.controller;

import lk.gdse.jurneyflex.dto.CustomerDTO;
import lk.gdse.jurneyflex.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer")
@AllArgsConstructor
public class CustomerController {
    private CustomerService customer;
    @GetMapping("/healthTest")
    public String healthTest(){
        return "Healthy";
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addCustomer(@Validated @RequestBody CustomerDTO customerDTO, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        customer.saveCustomer(customerDTO);
        return ResponseEntity.ok().body("Customer saved successfully");
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllCustomers(){
        return ResponseEntity.ok().body(customer.getAllCustomers());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable ("id") String id){
        return ResponseEntity.ok().body(customer.getCustomerById(id));
    }

    @PutMapping(value = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateCustomer(@Validated @PathVariable ("id") String id,  @RequestBody CustomerDTO customerDTO, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        customer.updateCustomer(id, customerDTO);
        return ResponseEntity.ok().body("Customer updated successfully");
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable ("id") String id){
        customer.deleteCustomer(id);
        return ResponseEntity.ok().body("Customer deleted successfully");
    }
}
