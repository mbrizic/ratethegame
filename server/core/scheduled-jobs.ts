import * as cron from 'cron';
import { getAppConfig } from './app.config';
import NotificationService from './notification-service';

const notificationService = new NotificationService()

// TODO async?
export function topRatedMailJob() {
    const cronTime = getAppConfig().isDebugMode ? '* * * * *' : '50 * * * *'

    const job = new cron.CronJob({
        cronTime: cronTime,
        onTick: function () {
            notificationService.sendTopRatedEvents()
        },
        start: false,
        timeZone: 'Europe/Zagreb'
    })
    
    job.start()
}