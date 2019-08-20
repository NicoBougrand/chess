import cron, { CronJob } from "cron";

import Log from "../logs/log.utils";

export default class CronUtils {
    public static every5seconds: string = "*/5 * * * * *";
    public static launchAll(): void {
        // CronUtils.example();
    }

    public static example(cronTime?: string | Date): void {
        cronTime = cronTime || "0 0 */1 * * *"; // every hour at 0s 0min

        const job: CronJob = cron.job(cronTime, function() { Log.info("Nothing to do", this); });
        job.start();
    }

    /******************************************/
}
