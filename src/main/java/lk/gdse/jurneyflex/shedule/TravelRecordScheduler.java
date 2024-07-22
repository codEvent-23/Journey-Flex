package lk.gdse.jurneyflex.shedule;

import lk.gdse.jurneyflex.entity.TravelRecord;
import lk.gdse.jurneyflex.enumz.TravelRecordStatus;
import lk.gdse.jurneyflex.repository.TravelRecordServiceDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class TravelRecordScheduler {
    @Autowired
    private TravelRecordServiceDao travelRecordServiceDao;

    @Scheduled(fixedRate = 3600000) // Run every hour (3600000 milliseconds)
    public void updateUnfinishedTravelRecords() {
        LocalDateTime fiveHoursAgo = LocalDateTime.now().minusHours(5);
        List<TravelRecord> unfinishedRecords = travelRecordServiceDao.findUnfinishedRecordsOlderThan(fiveHoursAgo);

        for (TravelRecord record : unfinishedRecords) {
            record.setStatus(TravelRecordStatus.CARD_NOT_TAPPING);
            travelRecordServiceDao.save(record);
        }
    }
}
