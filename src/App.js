//import logo from './logo.svg';
import React from 'react';
import './App.css';
import RegistrationForm from './compoments/RegistrationForm';

function App() {
  const handleForSubmit =(values) => {
   // console.log("Values :", values);
  };
  return (
    <div className="App">
     <h1>Registration Form</h1>
     <RegistrationForm onSubmit={handleForSubmit}/>
    </div>
  );
}

export default App;
