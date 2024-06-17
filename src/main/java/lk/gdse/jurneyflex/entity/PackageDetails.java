package lk.gdse.jurneyflex.entity;

import jakarta.persistence.*;
import lk.gdse.jurneyflex.ENUM.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class PackageDetails implements SuperEntity{
    @Id
    private String packDetailsId;
    private double amount;
    private String activeDate;
    private String expireDate;
    @Enumerated(EnumType.STRING)
    private Status status;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "packId")
    private Package packages;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "custId")
    private Customer customer;
}
