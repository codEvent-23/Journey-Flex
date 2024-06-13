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
@Table(name = "card")
public class Card implements SuperEntity{
    @Id
    private String cardId;
    private String status;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "custId", nullable = false)
    private Customer customer;
    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL)
    private List<TravelRecord> travelRecordList;
}
