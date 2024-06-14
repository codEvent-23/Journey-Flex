package lk.gdse.jurneyflex.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "customer")
public class Customer implements SuperEntity{
    @Id
    private String custId;
    private String f_name;
    private String l_name;
    private String email;
    private double accountBalance;
    private String contactNo;
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Card> cardList;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "packId", nullable = false)
    private Package packages; // test
}
