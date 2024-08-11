import { connectToDatabase } from './db';
import Sync, { SEARCH_INTERVAL } from './sync';
import { monitor } from './monitor';

async function main() {
  try {
    await connectToDatabase();
    console.log('Database connection established.');
    console.log('Monitoring started');
    const startDate = '2024-01-01T00:00:00Z'; // start date
    return Sync.resetCommitsToDate('chromium', 'chromium', startDate);
    // return monitor({
    //   owner: 'chromium',
    //   repo: 'chromium',
    //   since: startDate,
    //   interval: SEARCH_INTERVAL,
    // });
  } catch (error) {
    console.error('Error starting the application:', error);
    process.exit(1); // Exit the process with an error code
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1); // Exit the process with an error code
});
