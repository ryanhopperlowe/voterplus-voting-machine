import Axios from 'axios';
// import io from 'socket.io-client'

const BASE_URL = 'http://10.250.108.122:4000';


export const getAvailableIssues = () => {
  console.log('axios call');
  
  Axios.get(BASE_URL + '/issues')
  .then((issues) => {
    console.log(issues);
    
  })
  .catch(err => {
    console.log(err);
    
  })
}