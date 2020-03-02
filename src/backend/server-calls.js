import Axios from 'axios';
import io from 'socket.io-client';
import blindSigs from 'blind-signatures';
import { Vote } from '../structures/Vote';

const baseURL = 'http://10.250.108.122:4000';

// Aldrich's WiFi
// const baseURL = 'http://10.42.0.1:4000';

const instance = () => Axios.create({
  baseURL
});

let voteIssues = [];

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

    console.log('loaded public key');
    console.log(`N: ${nPubKey.keyPair.n}`);
    
    pubKey = nPubKey;
    resolve(nPubKey);
    
  });
};


export const getAvailableIssues = () => {
  console.log('axios call');

  return new Promise((resolve, reject) => {

    instance().get(baseURL + '/issues')
    .then((response) => {
      console.log(response);
      voteIssues = response.data;
      let data = [];
      response.data.forEach(iss => {
        data.push(iss.code_name);
      });
      
      resolve({
        data
      });
    })
    .catch(err => {
      reject(err);
    });
  })
  
};

export const getRelevantOptions = (issueCodeName) => {
  return new Promise((resolve, reject) => {
    if (voteIssues.length <= 0) {
      reject(new Error('No issues to select options from!'));
      return;
    }

    let data = voteIssues.find((iss) => iss.code_name === issueCodeName).options;

    if (!!data) {
      resolve({
        data
      });
    }

    reject(new Error('Selected Issue not found!'));

  });
};

export const votingRightIsValid = () => {
  // todo
};

export const sendVoteSubmission = (issue, choice, votingRight) => new Promise((resolve, reject) => {
  console.log('submit vote');

  const [ rtv, signature ] = votingRight.split('|');
  
  
  const socket = io(baseURL);

  const handleError = (sock, eventString, err = new Error('Problem submitting vote, please try again')) => {
    sock.off(eventString);
    sock.disconnect();
    console.error(err);
    reject({
      message: 'Problem submitting vote, please try again'
    });
  }
  
  socket.on('connect', () => {
    
    
    socket.emit('vote', { issue, choice, rtv, signature });
    
    socket.on('get_ris', ({ ris_req, error: rtvError = undefined }) => {
      console.log(`This is the RIS: ${ris_req}`);
      
      if (!!rtvError) {
        handleError(socket, 'get_ris', rtvError);
        return;
      }
      
      //
      // Do stuff with ris
      //

      let { guid, issue: voteIssue, E: voteE, N: voteN, idenHashes: [ leftHash, rightHash ] } = Vote.parseVote(rtv);
      let currentVote = new Vote(null, null, null, null, signature, rtv, leftHash, rightHash);

      const constructedRisArray = []
      for (let i in ris_req) {
        let tempRis = currentVote.getRis(ris_req[i], i);        
        constructedRisArray.push(tempRis);
      }

      console.log(`Here is the constructed RIS array: ${constructedRisArray}`);

      socket.off('get_ris');

      socket.emit('get_ris_response', constructedRisArray);

      socket.on('receipt', ({ receipt, error: receiptError = null }) => {
        if (!!receiptError) {
          handleError(socket, 'receipt', receiptError);
          return;
        }

        console.log('Here is the receipt from the server: ', receipt);

        //
        // do stuff with receipt
        //

        socket.off('receipt');
        socket.disconnect();

        resolve({
          message: 'Receipt received',
          receipt
        });
      });
    });
  });
}); 