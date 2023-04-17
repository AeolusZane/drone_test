import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [count,setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {count}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={()=>{
          setCount(count=>count+1);
        }}>click</button>
      </header>
    </div>
  );
}

export default App;
