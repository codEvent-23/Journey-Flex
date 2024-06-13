package lk.gdse.jurneyflex.dto;


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
    private String startLocation;
    private String destinationLocation;
    private int routePerDay;
    private double amount;
    private double kmAmount;
    private Date date;
    private String expireStatus;
    private String staticPacId;
    private String customPacId;
}
