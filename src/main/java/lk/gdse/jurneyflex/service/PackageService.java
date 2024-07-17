package lk.gdse.jurneyflex.service;

import lk.gdse.jurneyflex.dto.PackageDTO;

public interface PackageService {
    void addCustomPackage(PackageDTO packageDTO, String id);
    String generateNextPackageId();
    void addStaticPackage(PackageDTO packageDTO);
    PackageDTO getPackageById(String id);
}
