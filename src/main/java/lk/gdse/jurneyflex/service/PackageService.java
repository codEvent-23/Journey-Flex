package lk.gdse.jurneyflex.service;

import lk.gdse.jurneyflex.dto.PackageDTO;

public interface PackageService {
    void addCustomPackage(PackageDTO packageDTO, String id);
    void updateStatus(String id, String cusID);
    String generateNextPackageId();

    void addStaticPackage(PackageDTO packageDTO);
    PackageDTO getPackageById(String id);
}
