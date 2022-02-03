import * as cron from 'cron';
import { getAppConfig } from '../core/app.config';
import NotificationsService from './notifications.service';

const notificationService = new NotificationsService()

export function topRatedMailJob() {
    const cronTime = getAppConfig().isDebugMode 
        ? '* * * * *'   // every minute
        : '50 * * * *'  // at minute 50

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