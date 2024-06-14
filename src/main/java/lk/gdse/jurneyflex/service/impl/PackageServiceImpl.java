package lk.gdse.jurneyflex.service.impl;

import jakarta.transaction.Transactional;
import lk.gdse.jurneyflex.dto.PackageDTO;
import lk.gdse.jurneyflex.service.PackageService;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class PackageServiceImpl implements PackageService {
    @Override
    public void addPackage(PackageDTO packageDTO) {

    }
}
