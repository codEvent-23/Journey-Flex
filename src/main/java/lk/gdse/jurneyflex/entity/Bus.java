package lk.gdse.jurneyflex.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "bus")
public class Bus implements SuperEntity{
    @Id
    private String busId;
    private String route;
    private String schedule;
    @OneToMany(mappedBy = "bus", cascade = CascadeType.ALL)
    private List<TravelRecord> travelRecordList;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ownerId", nullable = false)
    private OwnerDetails ownerDetails;
}
