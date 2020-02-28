import React, { useState, useContext, useEffect } from 'react';
// import { getAvailableIssues } from '../../../backend/mock-server-calls';
// import { getAvailableIssues } from '../../../backend/server-calls';
import VoteContext from '../../../context/VoteContext';
import { voteSetIssue } from '../../../reducers/voteReducer';
import { getAvailableIssues } from '../../../backend/api';
import { FormControl } from 'baseui/form-control';
import { Select } from 'baseui/select';

const IssuesSelect = () => {

  const { voteDispatch } = useContext(VoteContext);

  const [choice, setChoice] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
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
    <FormControl
      label={() => "Select issue to vote on:"}
    >
      <Select
        value={choice}
        onChange={({ value, option: { value: iss} }) => {
          setChoice(value)
          voteDispatch(voteSetIssue(iss))
        }}
        placeholder="Select issue"
        valueKey="value"
        options={issues.map((iss) => ({ label: iss, value: iss }))}
        required
      />
    </FormControl>
  );
};

export default IssuesSelect;