package lk.gdse.jurneyflex.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

public class PackageController {
    @GetMapping("/healthCheck")
    public String healthCheck(){
        return "Healthy";
    }

    @PostMapping("/addStaticPackage")
    public String addStaticPackage(){
        return "Add Static Package";
    }

    @PostMapping("/addCustomPackage")
    public String addCustomPackage(){
        return "Add Custom Package";
    }

}
