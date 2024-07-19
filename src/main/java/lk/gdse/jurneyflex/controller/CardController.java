package lk.gdse.jurneyflex.controller;

import lk.gdse.jurneyflex.dto.CardDTO;
import lk.gdse.jurneyflex.service.CardService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/card")
@AllArgsConstructor
public class CardController {
    private CardService card;
    @GetMapping("/healthTest")
    public String healthTest(){
        return "Healthy";
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addCard(@Validated @RequestBody CardDTO cardDTO, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        card.saveCard(cardDTO);
        return ResponseEntity.ok().body("Card saved successfully");
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCardById(@PathVariable ("id") String id){
        return ResponseEntity.ok().body(card.getCardById(id));
    }
}
