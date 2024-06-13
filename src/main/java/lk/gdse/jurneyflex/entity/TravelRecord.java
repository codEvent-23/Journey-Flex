package lk.gdse.jurneyflex.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "travelRecord")
public class TravelRecord implements SuperEntity{
    @Id
    private String travelRecordId;
    private Timestamp travelDateTime;
    private String latitude;
    private String longitude;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cardId", nullable = false)
    private Card card;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "busId", nullable = false)
    private Bus bus;
}
