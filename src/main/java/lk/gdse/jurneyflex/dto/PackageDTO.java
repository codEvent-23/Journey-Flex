package lk.gdse.jurneyflex.dto;


import lk.gdse.jurneyflex.enumz.BusType;
import lk.gdse.jurneyflex.enumz.PackageType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private double kmAmountPerDay;
    private BusType busType;
    private PackageType packageType;
}
