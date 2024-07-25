package lk.gdse.jurneyflex.controller;

import lk.gdse.jurneyflex.dto.TravelRecordDTO;
import lk.gdse.jurneyflex.service.TravelRecordService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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
    @ResponseStatus(HttpStatus.OK)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addTravelRecord(@Validated @RequestBody TravelRecordDTO travelRecordDTO, BindingResult bindingResult){
//        System.out.println(travelRecordDTO.getCardId());
        System.out.println(travelRecordDTO);
        travelRecordService.handleAddTravelRecord(travelRecordDTO);
        return ResponseEntity.ok().body("Travel record saved successfully");
    }
}
