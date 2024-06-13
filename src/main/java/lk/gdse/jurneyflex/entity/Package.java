package lk.gdse.jurneyflex.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "package")
public class Package implements SuperEntity{
    @Id
    private String pacId;
    private String startLocation;
    private String destinationLocation;
    private int routePerDay;
    private double amount;
    private double kmAmount;
    private Date date;
    private String expireStatus;
    @OneToOne
    private StaticPackage staticPackage;
    @OneToOne
    private CustomPackage customPackage;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "custId", nullable = false)
    private Customer customer;
}
