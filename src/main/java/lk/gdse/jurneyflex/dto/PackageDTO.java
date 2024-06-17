package lk.gdse.jurneyflex.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lk.gdse.jurneyflex.ENUM.BusType;
import lk.gdse.jurneyflex.ENUM.PackageType;
import lk.gdse.jurneyflex.ENUM.Status;
import lk.gdse.jurneyflex.entity.Bus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author Amil Srinath
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PackageDTO implements SuperDTO {
    private String packId;
    private String startLat;
    private String startLong;
    private String destinationLat;
    private String destinationLong;
    private int routePerDay;
    private double amount;
    private double kmAmountPerDay;
    private String activeDate;
    private String expireDate;
    private BusType busType;
    private PackageType packageType;
}
