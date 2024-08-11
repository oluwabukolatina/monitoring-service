import fs from "fs";
import dotenv from "dotenv";

if (fs.existsSync('.env')) {
    console.log('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
}
function throwIfUndefined<T>(secret: T | undefined, name?: string): T {
    if (!secret) {
        console.log(`${name} must not be undefined`);
        return process.exit(1);
    }
    return secret;
}
export const DATABASE_URL= throwIfUndefined(process.env.DATABASE_URL, 'DATABASE_URL');
export const DATABASE_TEST_URL=  throwIfUndefined(process.env.DATABASE_TEST_URL, 'DATABASE_TEST_URL');
export const GITHUB_TOKEN=  throwIfUndefined(process.env.GITHUB_TOKEN, 'GITHUB_TOKEN');
