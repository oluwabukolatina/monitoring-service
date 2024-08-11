# GitHub Repository Monitoring Service

## Overview
Build a service in Typescript that fetches data from GitHub's public APIs to retrieve repository information and commits, save the data in a persistent store, and continuously monitor the repository for changes. Additionally, document how to perform specific data retrieval actions as queries.


## Features

- **Fetch GitHub Repository Data:**
    - Retrieve commit information, including commit message, author, date, and URL.
    - Store repository metadata such as name, description, URL, language, forks count, stars count, open issues count, watchers count, and created/updated dates.

- **Monitoring:**
    - Monitor the repository for new commits at specified intervals (e.g., every hour).
    - Avoid pulling the same commit twice

- **Sync Start Date:**
    -Configurable date to start pulling commits .
    - reset the collection to start from a point in time

## Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)
- **GitHub Personal Access Token**

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/oluwabukolatina/monitoring-service.git
   cd monitoring-service
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` File:**
   Create a `.env` file in the root directory with the following content:
   ```plaintext
   DATABASE_TEST_URL=mongodb://localhost:27017/monitoring-service
   DATABASE_URL=mongodb://localhost:27017/monitoring-service
   NODE_ENV=test or development
   ```

## Usage

1. **Run the Service:**
   ```bash
   npm run dev
   ```

2**Reset Commits to a Specific Date:**
in server.ts
   ```typescript
   await Sync.resetCommitsToDate('owner', 'repository', '2023-01-01T00:00:00Z');
   ```

## Querying Data

### Get the Top N Commit Authors by Commit Count

You can retrieve the top N authors by commit count with the following function:

```typescript
const topAuthors = await CommitService.getTopAuthorsByCommitCount('chromium', 5);
console.log(topAuthors);
```

### Retrieve Commits by Repository Name

You can retrieve all commits for a specific repository with:

```typescript
const commits = await CommitService.getCommitsByRepositoryName('owner', 'repository_name');
console.log(commits);
```

## Unit Tests
 You can run the tests with:

```bash
npm run test
```
