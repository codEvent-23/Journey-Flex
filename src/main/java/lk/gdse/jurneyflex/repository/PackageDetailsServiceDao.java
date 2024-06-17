package lk.gdse.jurneyflex.repository;

import lk.gdse.jurneyflex.entity.PackageDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageDetailsServiceDao extends JpaRepository<PackageDetails, String> {
    PackageDetails findFirstByOrderByPackDetailsIdDesc();
}
