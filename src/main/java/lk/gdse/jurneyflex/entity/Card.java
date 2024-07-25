package lk.gdse.jurneyflex.entity;

import jakarta.persistence.*;
import lk.gdse.jurneyflex.enumz.CardStatus;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "card")
public class Card implements SuperEntity{
    @Id
    private String cardId;
    @Enumerated(EnumType.STRING)
    private CardStatus status;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "custId", nullable = false)
    private Customer customer;
    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL)
    private List<TravelRecord> travelRecordList;
}
