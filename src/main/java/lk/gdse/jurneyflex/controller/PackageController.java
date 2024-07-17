package lk.gdse.jurneyflex.controller;

import lk.gdse.jurneyflex.enumz.PackageType;
import lk.gdse.jurneyflex.dto.PackageDTO;
import lk.gdse.jurneyflex.service.PackageDetailsService;
import lk.gdse.jurneyflex.service.PackageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
        packageService.addStaticPackage(packageDTO);
        return ResponseEntity.ok("Static Package Added");
    }

    @PostMapping("/updatePackageStatus/{id}/{cusIID}")
    public ResponseEntity<?> updatePackageStatus(@PathVariable("id") String id, @PathVariable("cusIID") String cusIID){
        return ResponseEntity.ok("Package Updated");
    }

    @PostMapping(value = "/addCustomPackage/{custId}")
    public ResponseEntity<?> addCustomPackage(@RequestBody PackageDTO packageDTO, @PathVariable ("custId") String custId){
        packageService.addCustomPackage(packageDTO,custId);
        return ResponseEntity.ok("Custom Package Added");
    }

    @PostMapping(value = "/activeStaticPackage/{custId}/{packId}")
    public ResponseEntity<?> activeStaticPackage(@PathVariable("custId") String custId, @PathVariable("packId") String packId){
        packageDetailsService.activeStaticPackage(packId,custId);
        return ResponseEntity.ok("Static Package Activated");
    }

    @PostMapping("/deactivatePackage")
    public ResponseEntity deactivatePackage(@RequestParam String packId, @RequestParam String custId) {
        packageDetailsService.deactivatePackageBeforeMidnight(packId, custId);
        return ResponseEntity.ok("Package deactivated successfully before midnight");
    }

    @Scheduled(cron = "0 0 8 * * *") // Runs every day at 8 AM |||||||| cron = "0 10 17 * * *"  Runs every day at 5:10 PM
    public String expirePackageNotifyBeforeSevenDays() {
        return packageDetailsService.expirePackageNotifyBeforeSevenDays();
    }

    @Scheduled(cron = "0 10 0 * * *") // Runs every day at 12:10 AM
    public String expiredPackagesNotification() {
        return packageDetailsService.expiredPackagesNotification();
    }
}
