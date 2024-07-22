package lk.gdse.jurneyflex.service.impl;

import lk.gdse.jurneyflex.conversion.ConversionData;
import lk.gdse.jurneyflex.dto.BusDTO;
import lk.gdse.jurneyflex.entity.Bus;
import lk.gdse.jurneyflex.entity.OwnerDetails;
import lk.gdse.jurneyflex.exceptions.NotFoundException;
import lk.gdse.jurneyflex.repository.BusServiceDao;
import lk.gdse.jurneyflex.service.BusService;
import lk.gdse.jurneyflex.service.OwnerDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BusServiceImpl implements BusService {
    @Autowired
    private ConversionData convert;
    @Autowired
    private OwnerDetailsService ownerDetailsService;
    @Autowired
    private BusServiceDao busServiceDao;
    @Override
    public void saveBus(BusDTO busDTO) {
        OwnerDetails ownerDetails = convert.ownerDetailsDtoToOwnerDetails(ownerDetailsService.getOwnerDetailsById(busDTO.getOwnerDetailsId()));
        Bus bus = new Bus();
        bus.setBusId(busDTO.getBusId());
        bus.setRoute(busDTO.getRoute());
        bus.setSchedule(busDTO.getSchedule());
        bus.setOwnerDetails(ownerDetails);
        System.out.println(bus.getBusId());
        busServiceDao.save(bus);
    }

    @Override
    public Bus getBusById(String busId) {
        if (!busServiceDao.existsById(Integer.valueOf(busId))) {
            throw new NotFoundException("Bus not found");
        }
        return busServiceDao.findById(Integer.valueOf(busId)).orElse(null);
    }


}
