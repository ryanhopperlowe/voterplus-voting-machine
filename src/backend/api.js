import * as db from './server-calls';
import * as mock from './mock-server-calls';

const getServerCalls = (calls) => ({ ...calls });

const getEnvCalls = (env) => {
  switch (env) {
    case 'production':
      return getServerCalls(db);
    case 'development':
      return getServerCalls(mock);
    default:
      throw new Error('Could not retrieve server calls');
  }
};

const { getAvailableIssues, getRelevantOptions, sendVoteSubmission } = getEnvCalls(process.env.NODE_ENV);

export { getAvailableIssues, getRelevantOptions, sendVoteSubmission };