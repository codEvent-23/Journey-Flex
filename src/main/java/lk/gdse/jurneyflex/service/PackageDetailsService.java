package lk.gdse.jurneyflex.service;

import lk.gdse.jurneyflex.dto.PackageDTO;

import java.util.Date;
import java.util.List;

public interface PackageDetailsService {
    void addPackageDetails(PackageDTO packageDTO,String custId);
    String generateNextPackageDetailsId();
    void activeStaticPackage(String packId, String custId);
    void deactivatePackageBeforeMidnight(String packId, String custId);
    String expirePackageNotifyBeforeSevenDays();
    String expiredPackagesNotification();

    List<PackageDTO> getPackageByCustId(String custId);
}
