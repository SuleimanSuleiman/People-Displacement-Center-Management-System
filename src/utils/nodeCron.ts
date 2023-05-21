import cron from 'node-cron';
import SessionEmail from "../models/Email.model";
import HelperModel from '../models/Helper.model';

export const  nodeCron = async() => {
    cron.schedule('*/10 * * * * *', async () => {
        const currentTime = Date.now();
        await SessionEmail.deleteMany({ expiresAt: { $lt: currentTime } });
    })
}
