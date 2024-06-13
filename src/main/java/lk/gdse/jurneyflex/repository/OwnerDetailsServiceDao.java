package lk.gdse.jurneyflex.repository;

import lk.gdse.jurneyflex.entity.Customer;
import lk.gdse.jurneyflex.entity.OwnerDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerDetailsServiceDao extends JpaRepository<OwnerDetails, String> {
    OwnerDetails findFirstByOrderByOwnerIdDesc();
}
