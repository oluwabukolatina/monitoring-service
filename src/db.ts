import { connect } from 'mongoose';
import {DATABASE_URL, DATABASE_TEST_URL} from "../secret";
export const connectToDatabase = async () => {
    return connect(
     process.env.NODE_ENV  === 'test'?   DATABASE_TEST_URL:  DATABASE_URL);
};
