package lk.gdse.jurneyflex.service.impl;

import lk.gdse.jurneyflex.conversion.ConversionData;
import lk.gdse.jurneyflex.dto.CardDTO;
import lk.gdse.jurneyflex.entity.Card;
import lk.gdse.jurneyflex.enumz.CardStatus;
import lk.gdse.jurneyflex.exceptions.NotFoundException;
import lk.gdse.jurneyflex.repository.CardServiceDao;
import lk.gdse.jurneyflex.service.CardService;
import lk.gdse.jurneyflex.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class CardServiceImpl implements CardService {
    @Autowired
    private ConversionData convert;
    @Autowired
    private CardServiceDao cardServiceDao;
    @Autowired
    private CustomerService customer;
    @Override
    public void saveCard(CardDTO cardDTO) {
        Card card = new Card();
        card.setCardId(cardDTO.getCardId());
        card.setStatus(CardStatus.ACTIVE);
        card.setCustomer(convert.customerDtoToCustomer(customer.getCustomerById(cardDTO.getCustId())));
        cardServiceDao.save(card);  // convert cardDTO to Card entity and save it.  // Note: Card entity is assumed to have a default constructor and appropriate fields.  // You may need to change this according to your actual entity structure.   // Also, this method assumes that the Card entity has a unique identifier (e.g., cardId). If not, you may need to modify it accordingly.   // Also, this method assumes that the ConversionData class has appropriate methods for converting between CardDTO and Card entities. If not, you may need to modify it accordingly.   // Also, this method assumes that the CardServiceDao interface has a method for saving a Card entity. If not, you may need to modify it accordingly.   // Also, this method assumes that the generateNextCardId method is implemented to generate a unique identifier for each new Card entity. If not, you may need to modify it accordingly.
    }

    @Override
    public CardDTO getCardById(String id) {
        if (!cardServiceDao.existsById(id)) throw new NotFoundException("Card not found");
        Optional<Card> card = cardServiceDao.findById(id);
        if (card.isPresent()) {
            System.out.println("Card id");
            Card card1 = card.get();
            CardDTO cardDTO = new CardDTO();
            cardDTO.setCustId(card1.getCustomer().getCustId());
            cardDTO.setCardId(card1.getCardId());
            cardDTO.setStatus(card1.getStatus());
            System.out.println(cardDTO.getCustId());
            return cardDTO;
        }
        else throw new NotFoundException("Card not found");
    }

    @Override
    public Card getCardEntityById(String id) {
        if (!cardServiceDao.existsById(id)) throw new NotFoundException("Card not found");
        Optional<Card> card = cardServiceDao.findById(id);
        if (card.isPresent()){
            return card.get();
        }
        else throw new NotFoundException("Card not found");
    }
}
