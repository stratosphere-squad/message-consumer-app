import React, {useState} from 'react';

import { Chat } from './components/Chat';
import './App.css';

const App = () => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="App">
      <h1>React hook SSE</h1>
    
        <div>
          <button onClick={() => setShowComments(previous => !previous)}>
            Toggle "Comments"
          </button>
          {showComments && <Chat id='a' />}
        </div>
      
    </div>
  );
};

export default App;