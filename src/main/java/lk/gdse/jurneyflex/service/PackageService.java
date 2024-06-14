package lk.gdse.jurneyflex.service;

import lk.gdse.jurneyflex.dto.PackageDTO;

public interface PackageService {
    void addPackage(PackageDTO packageDTO);
    void updateStatus(String id, String cusID);
}
