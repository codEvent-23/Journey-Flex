package lk.gdse.jurneyflex.service;

import lk.gdse.jurneyflex.dto.BusDTO;
import lk.gdse.jurneyflex.entity.Bus;

public interface BusService {
    void saveBus(BusDTO busDTO);
    Bus getBusById(String busId);
}
