import Axios from 'axios';
import io from 'socket.io-client'

export const BASE_URL = 'http://10.251.16.171:4000';


export function getVoterIssues (ssn) {
  return Axios.post(BASE_URL + '/getIssues', {
    ssn: ssn
  });
}

export function getVotingRight (ssn, issue) {
  console.log(`getting voting right axios request for ${ssn} on ${issue}`);
  
  // return Axios.post(BASE_URL + '/getVotingRight', {
  //   ssn: ssn,
  //   issue: issue
  // })

  return new Promise((resolve, reject) => {
    // 
    // 1. (emit) template acquisition
    // 2. (recv)
    // 3. bSig_select
    // 3. bSig_reveal


    const socket = io(BASE_URL)
    socket.on('connect', () => {
      socket.emit('template_acquisition', { ssn, issue });

      socket.on('template_acquisition_response', (template) => {
        console.log(template);
        // generate correct number of votes based on template
        // blind the votes
        // create hashes for blinded votes
        // send all votes 

        // stop listening to template_acquisition_response here
        // check documentation

        socket.emit('blind_sig_select', { ssn, issue, blindVoteHashes: ['sldkflselke'] });

        socket.on('blind_sig_select_response', (selection) => {
          console.log(`Got blind signature selection. Server selected hash with index of ${selection.index}`);

          //stop listening to blind_sig_response here

          socket.emit('blind_sig_reveal', { ssn, issue, blindingFactors: [], votes: [], hashesOfNonBlindedVotes: [] });

          socket.on('blind_sig_reveal_response', (response) => {
            console.log(response.rtv);

            // disconnect socket here
            resolve({
              rtv: response.rtv
            });
          })

        })
      });
    })
  })
  
};