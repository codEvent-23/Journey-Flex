package lk.gdse.jurneyflex.repository;

import lk.gdse.jurneyflex.entity.Customer;
import lk.gdse.jurneyflex.entity.Package;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageServiceDao extends JpaRepository<Package, String> {
    Package findFirstByOrderByPackIdDesc();
}
