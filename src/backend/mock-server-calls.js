import uuid from "uuid";

function generateReceiptMappings (count = 5) {
  let mappings = [];
  let rtvs = [];
  let issues = [];
  for (let i = 0; i < count; i++) {
    let rtv = uuid();

    let code_name = 'Issue #' + i;

    issues.push({
      code_name,
      options: [1, 2, 3, 4].map((opt) => `Option ${opt} for ${code_name}`)
    });

    rtvs.push(rtv);

    mappings.push({
      rtv,
      issue: issues[i].code_name
    });
  }  

  console.log({ issues, rtvs, mappings });
  

  return [issues, rtvs, mappings];
}

const [ISSUES, RTVS, MAPPINGS] = generateReceiptMappings();

export { ISSUES, RTVS, MAPPINGS };

export const getAvailableIssues = (vmId) => {
  return new Promise((resolve, reject) => {
    let data = ISSUES.map((iss) => iss.code_name.toString());    
    resolve({
      data
    });
  });
};

export const getRelevantOptions = (issue) => {  
  return new Promise((resolve, reject) => {
    let data = ISSUES.find((iss) => iss.code_name === issue).options;
    resolve({
      data
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