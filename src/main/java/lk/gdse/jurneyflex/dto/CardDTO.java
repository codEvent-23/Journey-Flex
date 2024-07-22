package lk.gdse.jurneyflex.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lk.gdse.jurneyflex.enumz.CardStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CardDTO implements SuperDTO{
    @NotNull(message = "Card id required")
    private String cardId;
    @Null(message = "Card status set by the programme")
    private CardStatus status;
    @NotNull(message = "Customer id required")
    private String custId;
}
