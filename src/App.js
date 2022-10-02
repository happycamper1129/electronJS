import logo from './logo.svg';
import React from 'react';
import './App.css';

function App() {
  React.useEffect( () => {
        console.log("Resting")
   
            
}, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={()=>{
           window.api.send("GOTOFULLSCREEN", {
            "data":"Testing",
       
        });

        }}>Go To Full Screen</button>
        <button onClick={()=>{
          window.api.send("OFFTHEFULLSCREEN", {
            "data":"Testing",
        });
        }}>Exit Full Screen</button>
      </header>
    </div>
  );
}

export default App;
