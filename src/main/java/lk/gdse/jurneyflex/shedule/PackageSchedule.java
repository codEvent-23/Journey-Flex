package lk.gdse.jurneyflex.shedule;

import lk.gdse.jurneyflex.service.PackageDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PackageSchedule {
    @Autowired
    private final PackageDetailsService packageDetailsService;
    @Scheduled(cron = "0 0 8 * * *") // Runs every day at 8 AM |||||||| cron = "0 10 17 * * *"  Runs every day at 5:10 PM
    public String expirePackageNotifyBeforeSevenDays() {
        return packageDetailsService.expirePackageNotifyBeforeSevenDays();
    }

    @Scheduled(cron = "0 10 0 * * *") // Runs every day at 12:10 AM
    public String expiredPackagesNotification() {
        return packageDetailsService.expiredPackagesNotification();
    }
}
