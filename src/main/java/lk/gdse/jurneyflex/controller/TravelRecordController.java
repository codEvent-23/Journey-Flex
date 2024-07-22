package lk.gdse.jurneyflex.controller;

import lk.gdse.jurneyflex.dto.TravelRecordDTO;
import lk.gdse.jurneyflex.service.TravelRecordService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/travelRecord")
@AllArgsConstructor
public class TravelRecordController {
    private TravelRecordService travelRecordService;
    @GetMapping("/healthCheck")
    public String healthCheck(){
        return "Healthy";
    }
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addTravelRecord(@Validated @RequestBody TravelRecordDTO travelRecordDTO, BindingResult bindingResult){
        travelRecordService.handleAddTravelRecord(travelRecordDTO);
        return ResponseEntity.ok().body("Travel record saved successfully");
    }
}
