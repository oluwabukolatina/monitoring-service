import Sync from './sync';

export async function monitor(data: {
  owner: string;
  repo: string;
  since: string;
  interval: number;
}) {
  const { owner, repo, interval, since } = data;
  const sync = async () => {
    return Sync.syncRepository({ owner, repository: repo, since });
  };
  setInterval(sync, interval);
}
