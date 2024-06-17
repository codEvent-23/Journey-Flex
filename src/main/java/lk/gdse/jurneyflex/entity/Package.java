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
    private String packId;
    private String startLat;
    private String startLong;
    private String destinationLat;
    private String destinationLong;
    private int routePerDay;
    private double kmAmountPerDay;
    @Enumerated(EnumType.STRING)
    private BusType busType;
    @Enumerated(EnumType.STRING)
    private PackageType packageType;
    @OneToMany(mappedBy = "packages", cascade = CascadeType.ALL)
    private List<PackageDetails> packageDetailsList;
}