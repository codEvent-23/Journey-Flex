package lk.gdse.jurneyflex.controller;

import lk.gdse.jurneyflex.dto.OwnerDetailsDTO;
import lk.gdse.jurneyflex.service.OwnerDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/owner")
@AllArgsConstructor
public class OwnerDetailsController {
    private OwnerDetailsService ownerDetailsService;
    @GetMapping("/healthCheck")
    public String healthCheck(){
        return "Healthy";
    }

    @PostMapping
    public ResponseEntity<?> addOwnerDetails(@Validated @RequestBody OwnerDetailsDTO ownerDetailsDTO, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        try{
            ownerDetailsService.saveOwnerDetails(ownerDetailsDTO);
            return ResponseEntity.ok().body("OwnerDetails saved successfully");
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Internal server error | OwnerDetails saved Unsuccessfully.\nMore Details\n"+e);
        }
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllOwnerDetails(){
        return ResponseEntity.ok().body(ownerDetailsService.getAllOwnerDetails());
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getOwnerDetailsById(@PathVariable ("id") String id){
        return ResponseEntity.ok().body(ownerDetailsService.getOwnerDetailsById(id));
    }

    @PutMapping(value = "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateOwnerDetails(@Validated @PathVariable ("id") String id,  @RequestBody OwnerDetailsDTO ownerDetailsDTO, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        try{
            ownerDetailsService.updateOwnerDetails(id, ownerDetailsDTO);
            return ResponseEntity.ok().body("OwnerDetails updated successfully");
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Internal server error | OwnerDetails update Unsuccessfully.\nMore Details\n"+e);
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteOwnerDetails(@PathVariable ("id") String id){
        try{
            ownerDetailsService.deleteOwnerDetails(id);
            return ResponseEntity.ok().body("OwnerDetails deleted successfully");
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Internal server error | OwnerDetails deleted Unsuccessfully.\nMore Details\n"+e);
        }
    }
}
