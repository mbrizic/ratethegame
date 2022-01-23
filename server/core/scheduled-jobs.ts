import * as cron from 'cron';
import NotificationService from './notification-service';

const notificationService = new NotificationService()

// TODO async?
export function topRatedMailJob() {
    const job = new cron.CronJob({
        cronTime: '50 * * * *',
        onTick: function () {
            notificationService.sendTopRatedEvents()
        },
        start: false,
        timeZone: 'Europe/Zagreb'
    })
    
    job.start()
}