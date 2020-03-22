import * as db from './server-calls';
import * as mock from './mock-server-calls';

const getServerCalls = (calls) => ({ ...calls });

const getEnvCalls = (env = process.env.NODE_ENV) => {
  switch (env) {
    case 'production':
      return getServerCalls(db);
    case 'development':
      return getServerCalls(mock);
    default:
      throw new Error('Could not retrieve server calls');
  }
};

const { getAvailableIssues, getRelevantOptions, sendVoteSubmission, loadKeys } = getEnvCalls();

export { getAvailableIssues, getRelevantOptions, sendVoteSubmission, loadKeys };