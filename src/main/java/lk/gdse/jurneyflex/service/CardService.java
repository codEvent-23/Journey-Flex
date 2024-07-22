package lk.gdse.jurneyflex.service;

import lk.gdse.jurneyflex.dto.CardDTO;
import lk.gdse.jurneyflex.entity.Card;

public interface CardService {
    void saveCard(CardDTO cardDTO);

    CardDTO getCardById(String id);

    Card getCardEntityById(String id);
}
