package lk.gdse.jurneyflex.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "staticPackage")
public class StaticPackage implements SuperEntity{
    @Id
    private String staticPacId;
    private String startLocation;
    private String destinationLocation;
    private int routePerDay;
    private double amount;
}
