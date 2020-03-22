import uuid from "uuid";
import blindSigs from 'blind-signatures';

// eslint-disable-next-line
let pubKey;
export const loadKeys = async () => {
  return new Promise((resolve, reject) => {
    console.log('Loading Public key');


    let keyText = `-----BEGIN RSA PUBLIC KEY-----
    MIIBCgKCAQEAhCcaOOQuP9758rKmmtgyZcnDbOmj/aLVW5VJhg8oYrw6fDYwfA3k
    fzra/Q0JW7NIhUX6zJfKzxs3Me0kLVK3f3J0ztetZY7rApSIgggruF5qouK5GCcn
    C7PXZ5mGYIsqPz5ASLjSHqbqW81xK65Vk5iFUq8pA9WrmKXB4zFZ5sXohdieu3dy
    tInZXqbfD4+HJ6dkRo7tC3mmvH6aF2SXrasMRH5UiHe5zp509QWSgqz6gFQTL++9
    sTuZsyaH+NFluk5z17UqLr0cMHpUUulNMXqGONiqD5Ru3WH/773tJXpGDlNBADM4
    oI6SPNKu7qYguuNnkVoZWS8vJdXnaAL7TwIDAQAB
    -----END RSA PUBLIC KEY-----`;

    const pubKey1 = blindSigs.keyGeneration();
    const nPubKey = pubKey1.importKey(keyText, 'pkcs1-public-pem');

    if (!!nPubKey.keyPair.n) {
      console.log('loaded public key');
      console.log(`N: ${nPubKey.keyPair.n}`);

      pubKey = nPubKey;
      resolve(nPubKey);
    } else {
      reject(new Error("Failure to load public keys"));
    }
    
  });
};

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

export const sendVoteSubmission = (issue, choice, rtv) => {
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
          choice,
          receiptNo: uuid()
        }
      });
    }
  })
  
}