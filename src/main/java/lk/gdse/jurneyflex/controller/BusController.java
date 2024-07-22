package lk.gdse.jurneyflex.controller;

import lk.gdse.jurneyflex.dto.BusDTO;
import lk.gdse.jurneyflex.service.BusService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bus")
@RequiredArgsConstructor
public class BusController {
    @Autowired
    private BusService busService;
    @GetMapping("/healthCheck")
    public String healthCheck(){
        return "Healthy";
    }
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addBus(@Validated@RequestBody BusDTO busDTO, BindingResult bindingResult){
        busService.saveBus(busDTO);
        return ResponseEntity.ok().body("Bus saved successfully");
    }
}
