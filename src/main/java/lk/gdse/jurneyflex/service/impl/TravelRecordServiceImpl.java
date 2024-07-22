package lk.gdse.jurneyflex.service.impl;

import lk.gdse.jurneyflex.conversion.ConversionData;
import lk.gdse.jurneyflex.dto.TravelRecordDTO;
import lk.gdse.jurneyflex.entity.Card;
import lk.gdse.jurneyflex.entity.TravelRecord;
import lk.gdse.jurneyflex.enumz.TravelRecordStatus;
import lk.gdse.jurneyflex.repository.TravelRecordServiceDao;
import lk.gdse.jurneyflex.service.BusService;
import lk.gdse.jurneyflex.service.CardService;
import lk.gdse.jurneyflex.service.TravelRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class TravelRecordServiceImpl implements TravelRecordService {
    @Autowired
    private ConversionData conversionData;
    @Autowired
    private TravelRecordServiceDao travelRecordServiceDao;
    @Autowired
    private CardService cardService;
    @Autowired
    private BusService busService;
    @Override
    public void handleAddTravelRecord(TravelRecordDTO travelRecordDTO) {
        TravelRecord exitingCard = travelRecordServiceDao.findByCardAndEndDateTimeIsNull(conversionData.cardDtoToCard(cardService.getCardById(travelRecordDTO.getCardId())));
        if (exitingCard == null) {
            Card card = cardService.getCardEntityById(travelRecordDTO.getCardId());
            TravelRecord travelRecord = new TravelRecord();
            travelRecord.setTravelRecordId(travelRecordDTO.getTravelRecordId());
            travelRecord.setCard(card);
            System.out.println(travelRecord.getCard().getCardId());
            System.out.println(travelRecord.getCard().getStatus());
            travelRecord.setBus(busService.getBusById(travelRecordDTO.getBusId()));
            travelRecord.setStartLatitude(travelRecordDTO.getLatitude());
            travelRecord.setStartLongitude(travelRecordDTO.getLongitude());
            travelRecord.setStartDateTime(LocalDateTime.now());
            travelRecord.setStatus(TravelRecordStatus.INCOMPLETE);
            travelRecordServiceDao.save(travelRecord);
        }else{
            exitingCard.setEndLatitude(travelRecordDTO.getLatitude());
            exitingCard.setEndLongitude(travelRecordDTO.getLongitude());
            exitingCard.setEndDateTime(LocalDateTime.now());
            exitingCard.setStatus(TravelRecordStatus.COMPLETE);
            travelRecordServiceDao.save(exitingCard);
        }
    }
}
