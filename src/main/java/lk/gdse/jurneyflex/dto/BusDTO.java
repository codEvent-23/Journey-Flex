package lk.gdse.jurneyflex.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BusDTO {
    @Null(message = "Bus id generate by the programme")
    private Integer busId;
    @NotNull(message = "Route cannot be blank")
    private String route;
    @NotNull(message = "Schedule cannot be blank")
    private String schedule;
    @NotNull(message = "Owner details id cannot be blank")
    private String ownerDetailsId;
}
