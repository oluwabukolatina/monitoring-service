import axios from 'axios';
import {GITHUB_TOKEN} from "../secret";
const API_URL = 'https://api.github.com/repos/';
const config = {
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
};

export async function fetchRepoDetails(owner: string, repo: string) {
  const url = `${API_URL}${owner}/${repo}`;
  const { data } = await axios.get(url, config);
  return data;
}
export async function fetchCommits(
  owner: string,
  repo: string,
  since?: string
) {
  let url = `${API_URL}${owner}/${repo}/commits?per_page=100`;
  if (since) {
    url += `?since=${encodeURIComponent(since)}`;
  }
  const { data } = await axios.get(url, config);
  return data;
}
