package lk.gdse.jurneyflex.repository;

import lk.gdse.jurneyflex.entity.TravelRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelRecordServiceDao extends JpaRepository<TravelRecord, String> {
}
