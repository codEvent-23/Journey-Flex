package lk.gdse.jurneyflex.entity;

import jakarta.persistence.*;
import lk.gdse.jurneyflex.enumz.TravelRecordStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "travelRecord")
public class TravelRecord implements SuperEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long travelRecordId;
    private LocalDateTime startDateTime;
    private String startLatitude;
    private String startLongitude;
    private String endLatitude;
    private String endLongitude;
    private LocalDateTime endDateTime;
    @Enumerated(EnumType.STRING)
    private TravelRecordStatus status;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cardId", nullable = false)
    private Card card;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "busId", nullable = false)
    private Bus bus;
}
