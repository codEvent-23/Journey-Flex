package lk.gdse.jurneyflex.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lk.gdse.jurneyflex.ENUM.BusType;
import lk.gdse.jurneyflex.ENUM.Status;
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
    private BusType busType;
}
