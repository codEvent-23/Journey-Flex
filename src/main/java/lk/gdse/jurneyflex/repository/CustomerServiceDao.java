package lk.gdse.jurneyflex.repository;

import lk.gdse.jurneyflex.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerServiceDao extends JpaRepository<Customer, String> {
    Optional<Customer> findByEmail(String email);
    Customer findFirstByOrderByCustIdDesc();
}
