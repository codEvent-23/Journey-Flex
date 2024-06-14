package lk.gdse.jurneyflex.dto;


import lk.gdse.jurneyflex.ENUM.BusType;
import lk.gdse.jurneyflex.ENUM.PackageType;
import lk.gdse.jurneyflex.ENUM.Status;
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
    private String pacId;
    private String startLat;
    private String startLong;
    private String destinationLat;
    private String destinationLong;
    private int routePerDay;
    private double amount;
    private double kmAmount;
    private Date date;
    private Date expire;
    private PackageType packageType;
    private Status status;
    private BusType busType;
}
