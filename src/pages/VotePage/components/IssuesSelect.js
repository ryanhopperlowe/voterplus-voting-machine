import React, { useState, useContext, useEffect } from 'react';
import { getAvailableIssues } from '../../../backend/mock-server-calls';
import VoteContext from '../../../context/VoteContext';
import { voteSetIssue } from '../../../reducers/voteReducer';

const IssuesSelect = () => {

  const { voteDispatch } = useContext(VoteContext);

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    console.log('got available issues');
    getAvailableIssues(null)
    .then((response) => {
      setIssues(response.issues);
    })
    .catch(err => {
      console.error(err);
    });
  }, []);

  return (
    <div>
      <label>Select the issue you'd like to vote on!</label><br />
      <select onChange={(e) => voteDispatch(voteSetIssue(e.target.value))}>
        <option value="">Select an issue to vote on</option>
        {issues.map((iss) => (
          <option
            key={iss} value={iss}
          >{iss}</option>
        ))}
      </select>
    </div>
  );
};

export default IssuesSelect;