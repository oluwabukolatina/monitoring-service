import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
export const connectToDatabase = async () => {
    return connect(
     process.env.NODE_ENV  === 'test'?   String( process.env.DATABASE_TEST_URL):   String( process.env.DATABASE_URL));
};
