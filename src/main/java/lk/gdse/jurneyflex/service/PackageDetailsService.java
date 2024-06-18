package lk.gdse.jurneyflex.service;

import lk.gdse.jurneyflex.dto.PackageDTO;

import java.util.Date;

public interface PackageDetailsService {
    void addPackageDetails(PackageDTO packageDTO,String custId);
    String generateNextPackageDetailsId();
    void activeStaticPackage(String packId, String custId, String activeDate, String expirationDate);
    void deactivatePackageBeforeMidnight(String packId, String custId);
    String expirePackageNotifyBeforeSevenDays();
    String expiredPackagesNotification();
}
