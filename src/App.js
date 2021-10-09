import React, { useState } from 'react';
import styled from 'styled-components';

import { Chat } from './components/Chat';
import './App.css';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 300px;
  width: 50%;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: ${({ inChat }) =>
  (inChat ? '90%' : '50%')};
  text-align: center;
`;

const Input = styled.input`
  text-align: center;
  
`

const App = () => {
  const [showMessages, setShowMessages] = useState(false);
  const [userId, setUserId] = useState('');


  return (
    <div className="App">
        <Wrapper inChat={showMessages}>
          {!showMessages && <Input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}></Input>}
          <button onClick={() => setShowMessages(previous => !previous)}>
            {showMessages ? `End chat` : `Enter the group chat`}
          </button>
          </Wrapper>
          
          {showMessages && <Chat userId={userId} />}
        
      
    </div>
  );
};

export default App;