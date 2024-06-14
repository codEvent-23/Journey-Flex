package lk.gdse.jurneyflex.controller;

import lk.gdse.jurneyflex.ENUM.PackageType;
import lk.gdse.jurneyflex.dto.PackageDTO;
import lk.gdse.jurneyflex.service.PackageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/package")
@AllArgsConstructor
public class PackageController {
    private final PackageService packageService;

    @GetMapping("/healthCheck")
    public String healthCheck() {
        return "Healthy";
    }

    @PostMapping("/addPackage")
    public ResponseEntity<?> addPackage(@RequestBody PackageDTO packageDTO){
        packageService.addPackage(packageDTO);
        return ResponseEntity.ok("Package Added");
    }

    @PostMapping("/updatePackageStatus/{id}/{cusIID}")
    public ResponseEntity<?> updatePackageStatus(@PathVariable("id") String id, @PathVariable("cusIID") String cusIID){
        packageService.updateStatus(id,cusIID);
        return ResponseEntity.ok("Package Updated");
    }

    @PostMapping("/addCustomPackage")
    public ResponseEntity<?> addCustomPackage(@RequestBody PackageDTO packageDTO){
        packageDTO.setPackageType(PackageType.CUSTOM_PACKAGE);
        packageService.addPackage(packageDTO);
        return ResponseEntity.ok("Custom Package Added");
    }
}
