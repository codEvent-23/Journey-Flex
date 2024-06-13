package lk.gdse.jurneyflex.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "ownerDetails")
public class OwnerDetails implements SuperEntity{
    @Id
    private String ownerId;
    private String f_name;
    private String l_name;
    private String contactNo;
    private String email;
    @OneToMany(mappedBy = "ownerDetails", cascade = CascadeType.ALL)
    private List<Bus> busList;
}
