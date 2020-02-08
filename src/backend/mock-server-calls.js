import uuid from "uuid";

function generateReceiptMappings (count = 5) {
  let mappings = [];
  let rtvs = [];
  let issues = [];
  let options = [];
  for (let i = 0; i < count; i++) {
    let rtv = uuid();

    issues.push('Issue #' + i);
    options.push('Option ' + (i + 1));

    rtvs.push(rtv);

    mappings.push({
      rtv,
      issue: issues[i]
    });
  }  

  console.log({ issues, rtvs, options, mappings });
  

  return [issues, rtvs, options, mappings];
}

const [ISSUES, RTVS, OPTIONS, MAPPINGS] = generateReceiptMappings();

export { ISSUES, RTVS, OPTIONS, MAPPINGS };

export const getAvailableIssues = (vmId) => {
  return new Promise((resolve, reject) => {
    resolve({
      issues: ISSUES
    });
  });
};

export const getRelevantOptions = (issue) => {
  return new Promise((resolve, reject) => {
    resolve({
      options: OPTIONS
    });
  });
};

export const sendVoteSubmission = (issue, selection, rtv) => {
  return new Promise((resolve, reject) => {
    let mapping = MAPPINGS.find(({ rtv: mappedRtv }) => rtv === mappedRtv);

    if (typeof mapping !== 'object') {
      reject({
        code: 1,
        message: 'The given Right to Vote is not valid'
      });
    } else if (mapping.issue !== issue) {
      reject({
        code: 2,
        message: `The given Right to Vote cannot be used to vote on ${issue}`
      });
    } else {
      resolve({
        message: 'Vote Submission Successful!',
        receipt: {
          issue,
          selection,
          receiptNo: uuid()
        }
      });
    }
  })
  
}