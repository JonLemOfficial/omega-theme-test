"use strict";

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./styles/app.scss";

import UserList from 'screens/UserList';
import Register from 'screens/Register';

const App = ( props ) => {

  return (
    <>
      <Routes>
        <Route strict exact path="/" element={<Register/>}/>
        <Route path="/userlist" element={<UserList/>}/>
      </Routes>
    </>
  );

};

export default App;