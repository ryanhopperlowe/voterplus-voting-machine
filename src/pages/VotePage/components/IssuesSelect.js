import React, { useState, useContext, useEffect } from 'react';
// import { getAvailableIssues } from '../../../backend/mock-server-calls';
// import { getAvailableIssues } from '../../../backend/server-calls';
import VoteContext from '../../../context/VoteContext';
import { voteSetIssue } from '../../../reducers/voteReducer';
import { getAvailableIssues } from '../../../backend/api';

const IssuesSelect = () => {

  const { voteDispatch } = useContext(VoteContext);

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    setIssues([]);
    getAvailableIssues()
    .then(({ data }) => {
      setIssues(data);      
      console.log('got available issues');
    })
    .catch(err => {
      console.error(err);
    });
  }, []);

  return (
    <div>
      <label>Select the issue you'd like to vote on!</label><br />
      <select onChange={(e) => voteDispatch(voteSetIssue(e.target.value.toString()))}>
        <option value="">Select an issue to vote on</option>
        {issues.length > 0 && issues.map((iss) => (
          <option
            key={iss} 
            value={iss}
          >{iss}</option>
        ))}
      </select>
    </div>
  );
};

export default IssuesSelect;