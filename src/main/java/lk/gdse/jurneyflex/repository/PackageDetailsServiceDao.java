package lk.gdse.jurneyflex.repository;

import lk.gdse.jurneyflex.entity.PackageDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PackageDetailsServiceDao extends JpaRepository<PackageDetails, String> {
    PackageDetails findFirstByOrderByPackDetailsIdDesc();
    Optional<PackageDetails> findByPackagesPackIdAndCustomerCustId(String packId, String custId);
}
