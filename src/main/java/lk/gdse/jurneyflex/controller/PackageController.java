package lk.gdse.jurneyflex.controller;

import lk.gdse.jurneyflex.ENUM.PackageType;
import lk.gdse.jurneyflex.dto.PackageDTO;
import lk.gdse.jurneyflex.service.PackageDetailsService;
import lk.gdse.jurneyflex.service.PackageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;

@RestController
@RequestMapping("/api/v1/package")
@AllArgsConstructor
public class PackageController {
    private final PackageService packageService;
    private final PackageDetailsService packageDetailsService;

    @GetMapping("/healthCheck")
    public String healthCheck() {
        return "Healthy";
    }

    @PostMapping("/addStaticPackage")
    public ResponseEntity<?> addStaticPackage(@RequestBody PackageDTO packageDTO){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime newDateTime = now.plusDays(30);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String newDateTimeString = newDateTime.format(formatter);

        packageDTO.setActiveDate(now.format(formatter));
        packageDTO.setExpireDate(newDateTimeString);

        packageDTO.setPackageType(PackageType.STATIC_PACKAGE);
        packageService.addStaticPackage(packageDTO);
        return ResponseEntity.ok("Static Package Added");
    }

    @PostMapping("/updatePackageStatus/{id}/{cusIID}")
    public ResponseEntity<?> updatePackageStatus(@PathVariable("id") String id, @PathVariable("cusIID") String cusIID){

        return ResponseEntity.ok("Package Updated");
    }

    @PostMapping(value = "/addCustomPackage/{custId}")
    public ResponseEntity<?> addCustomPackage(@RequestBody PackageDTO packageDTO, @PathVariable ("custId") String custId){
        packageDTO.setPackageType(PackageType.CUSTOM_PACKAGE);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime newDateTime = now.plusDays(30);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String newDateTimeString = newDateTime.format(formatter);

        packageDTO.setActiveDate(now.format(formatter));
        packageDTO.setExpireDate(newDateTimeString);
        packageService.addCustomPackage(packageDTO,custId);
        return ResponseEntity.ok("Custom Package Added");
    }

    @PostMapping(value = "/activeStaticPackage/{custId}/{packId}")
    public ResponseEntity<?> activeStaticPackage(@PathVariable("custId") String custId, @PathVariable("packId") String packId){

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime newDateTime = now.plusDays(30);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String newDateTimeString = newDateTime.format(formatter);

        System.out.println("Original DateTime: " + now.format(formatter));
        System.out.println("New DateTime: " + newDateTimeString);

        packageDetailsService.activeStaticPackage(packId,custId,now.format(formatter), newDateTimeString);

        return ResponseEntity.ok("Static Package Activated");
    }

    @PostMapping("/deactivatePackage")
    public ResponseEntity<?> deactivatePackage(@RequestParam String packId, @RequestParam String custId) {
        packageDetailsService.deactivatePackageBeforeMidnight(packId, custId);
        return ResponseEntity.ok("Package deactivated successfully before midnight");
    }
}
