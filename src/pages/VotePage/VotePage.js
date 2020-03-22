import React from 'react';
import { Block } from 'baseui/block';
import VoteComponent from './components/VoteComponent';

const VotePage = () => {

  return (
    <Block
      width="80%"
      margin="auto"
    >
      <VoteComponent />
    </Block>
  );
};

export default VotePage;