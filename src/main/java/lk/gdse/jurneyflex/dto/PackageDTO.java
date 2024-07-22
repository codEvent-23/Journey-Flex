package lk.gdse.jurneyflex.dto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
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
    @Null(message = "Package id generate by the programme")
    private String packId;
    @NotNull(message = "Package startLat cannot be blank")
    private String startLat;
    @NotNull(message = "Package startLong cannot be blank")
    private String startLong;
    @NotNull(message = "Package destinationLat cannot be blank")
    private String destinationLat;
    @NotNull(message = "Package destinationLong cannot be blank")
    private String destinationLong;
    @NotNull(message = "Package routePerDay cannot be blank")
    private int routePerDay;
    @NotNull(message = "Package kmAmountPerDay cannot be blank")
    private double kmAmountPerDay;
    private BusType busType;
    private PackageType packageType;
}
