package lk.gdse.jurneyflex.repository;

import lk.gdse.jurneyflex.entity.Card;
import lk.gdse.jurneyflex.entity.TravelRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TravelRecordServiceDao extends JpaRepository<TravelRecord, Long> {
    TravelRecord findByCardAndEndDateTimeIsNull(Card card);
    @Query("SELECT tr FROM TravelRecord tr WHERE tr.endDateTime IS NULL AND tr.startDateTime <= :timeLimit")
    List<TravelRecord> findUnfinishedRecordsOlderThan(@Param("timeLimit") LocalDateTime timeLimit);
}
