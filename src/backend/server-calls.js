import Axios from 'axios';
// import io from 'socket.io-client'

const baseURL = 'http://10.250.108.122:60000';

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

    let data = voteIssues.find((i) => i.code_name === issueCodeName).options;

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