import config from 'config';
import mongoose from 'mongoose';
import { logger } from './logger';


export default async function connect() {
    const urlDatabase = config.get<string>('urlDatabase');
    try {
        await mongoose.connect(urlDatabase)
        let message = `connect with database`;
        console.log(message);
        logger.info(message)
    } catch (err) {
        let message = `error when connect with database ${err}`;
        console.log(message);
        logger.error(message);   
    }
}
