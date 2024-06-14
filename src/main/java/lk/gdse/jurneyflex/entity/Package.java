package lk.gdse.jurneyflex.entity;

import jakarta.persistence.*;
import lk.gdse.jurneyflex.ENUM.BusType;
import lk.gdse.jurneyflex.ENUM.PackageType;
import lk.gdse.jurneyflex.ENUM.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "package")
public class Package implements SuperEntity{
    @Id
    private String pacId;
    private String startLat;
    private String startLong;
    private String destinationLat;
    private String destinationLong;
    private int routePerDay;
    private double amount;
    private double kmAmount;
    private Date date;
    private Date expireDate;
    @Enumerated(EnumType.STRING)
    private BusType busType;
    @Enumerated(EnumType.STRING)
    private PackageType packageType;
    @Enumerated(EnumType.STRING)
    private Status status;
    @OneToMany(mappedBy = "packages", cascade = CascadeType.ALL)
    private List<Customer> customerList;
}