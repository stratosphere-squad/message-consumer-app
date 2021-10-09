import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { sendMessage } from '../services/MessageService';

const ChatDeco = styled.div`
  width: 100%;
`;

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  height: ${({ page }) => (page === 'local' ? '90vh' : '76vh')};
  padding-bottom: 15px;
`;

export const Message = styled.div`
  background: ${({ type }) =>
    type == 'server'
      ? 'linear-gradient(60deg,rgba(247, 185, 17, 1) 0%,rgba(255, 214, 102, 1) 100%);'
      : 'linear-gradient(60deg,rgba(255,255,255, 1) 0%,rgba(211,211,211, 1) 100%);'};
  color: ${({ type }) => (type == 'server' ? 'white' : 'black')};
  border-radius: 10px;
  padding: 6px 10px;
  margin: ${({ type }) =>
    type == 'server' ? '3px 20px 3px 10px' : '3px 10px 3px 20px'};
  align-self: ${({ type }) => (type == 'server' ? 'flex-start' : 'flex-end')};
  display: block;
  word-wrap: break-word;
  text-overflow: ellipsis;
  max-width: 85%;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
`;

const Input = styled.input`
  padding: 10px;
  width: 96vw;
  text-align: left;
`;

export const Chat = ({userId}) => {
  // Use ref to messages div
 
  const [messages, setMessages] = useState([{type: 'server', value:`Welcome ${userId}`}])
  const [msgToSend, setMsgToSend] = useState('');
  const [eventSource, setEventSource] = useState(() => new EventSource(process.env.REACT_APP_BACK_URL+'/consume'))

  useEffect(() => {
    if (eventSource) {
      eventSource.onmessage = (e) => {
        console.log('Previous messages', messages)
        setMessages((currentState) => [{type: 'server', value: e.data}, ...currentState])
      }
      eventSource.onerror = () => {
        eventSource.close();
      }
    }
    return () => {
      if (eventSource) {
        eventSource.close()
      }
    }
  }, [eventSource]);

  

  

  const handleSend = () => {
    sendMessage({id: userId, msg: msgToSend})
    .then(() => {
      setMessages((currentState) => [{type: 'local', value: msgToSend}, ...currentState])
      setMsgToSend('')
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  } 

  return (
    <ChatDeco>
      <MessagesWrapper>
        {messages.map((message, i) => (
          <Message key={i} type={message.type}>
            {message.value}
          </Message>
        ))}
      </MessagesWrapper>
      <Input
        placeholder='Write a Message'
        value={msgToSend}
        onChange={(e) => setMsgToSend(e.target.value)}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            handleSend()
          }
        }}
      />
    </ChatDeco>
  );
};

