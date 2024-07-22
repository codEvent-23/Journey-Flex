package lk.gdse.jurneyflex.dto;

import jakarta.persistence.*;
import lk.gdse.jurneyflex.entity.Bus;
import lk.gdse.jurneyflex.entity.Card;
import lk.gdse.jurneyflex.enumz.TravelRecordStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TravelRecordDTO implements SuperDTO{
    private Long travelRecordId;
    private LocalDateTime dateTime;
    private String latitude;
    private String longitude;
    private TravelRecordStatus status;
    private String cardId;
    private String busId;
}
