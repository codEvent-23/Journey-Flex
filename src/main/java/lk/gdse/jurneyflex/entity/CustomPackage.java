package lk.gdse.jurneyflex.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lk.gdse.jurneyflex.ENUM.BusType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "customPackage")
public class CustomPackage implements SuperEntity{
    @Id
    private String customPacId;
    private String startLocation;
    private String destinationLocation;
    private int routePerDay;
    private double amount;
    private BusType busType;
    private double kmAmount;
}
