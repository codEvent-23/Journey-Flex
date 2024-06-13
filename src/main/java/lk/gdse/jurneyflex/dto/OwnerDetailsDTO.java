package lk.gdse.jurneyflex.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OwnerDetailsDTO implements SuperDTO{
    @NotNull(message = "Owner id generate by the programme")
    private String ownerId;
    @NotBlank(message = "owner name cannot be blank")
    @Size(min = 2, max = 100, message = "Owner name must be between 2 and 100 characters")
    private String f_name;
    @NotBlank(message = "owner name cannot be blank")
    @Size(min = 2, max = 100, message = "Owner name must be between 2 and 100 characters")
    private String l_name;
    @NotBlank(message = "Contact No cannot be blank")
    @Pattern(regexp = "^\\+?[0-9\\-\\s]+$", message = "Invalid contact number format")
    private String contactNo;
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Invalid email format")
    private String email;
}
