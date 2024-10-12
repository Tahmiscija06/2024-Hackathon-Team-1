import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Details from './routs/Details';
import Home from './routs/home';
import List from './routs/List';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/list" element={<List/>}/>
      </Routes>
    </Router>
  );
};

export default App;
