import Axios from 'axios';
import io from 'socket.io-client'

const baseURL = 'http://10.250.108.122:4000';

// Aldrich's WiFi
// const baseURL = 'http://10.42.0.1:4000';

const instance = () => Axios.create({
  baseURL,
  timeout: 5000
});

let voteIssues = [];


export const getAvailableIssues = () => {
  console.log('axios call');

  return new Promise((resolve, reject) => {

    instance().get(baseURL + '/issues')
    .then((response) => {
      console.log(response);
      voteIssues = response.data;
      let issueList = [];
      response.data.forEach(iss => {
        issueList.push(iss.code_name);
      });
      
      resolve({
        data: issueList
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
      reject({
        ...(new Error('No issues to select options from!')),
        code: 1
      });
    }

    let data = voteIssues.find((iss) => iss.code_name === issueCodeName).options;

    if (!!data) {
      resolve({
        data
      });
    }

    reject({
      ...(new Error('Selected Issue not found!')),
      code: 2
    });

  });
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

      socket.off('get_ris');

      let data = 'some data';

      socket.emit('get_ris_response', data);

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