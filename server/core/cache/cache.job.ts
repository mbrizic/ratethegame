import * as cron from 'cron';
import { getAppConfig } from '../app.config';
import { purgeAllCaches } from './cache.service';

export function purgeAllCachesJob() {
    const cronTime = getAppConfig().isDebugMode 
        ? '* * * * *'   // every minute
        : '0 0,12 * * *'  // every day at 00:00 and 12:00

    const job = new cron.CronJob({
        cronTime: cronTime,
        onTick: () => {
            purgeAllCaches()
        },
        onComplete: () => (
            console.log('[PurgeAllCachesJob]: Done')
        ),
        start: false,
        timeZone: 'Europe/Zagreb'
    })
    
    job.start()
}