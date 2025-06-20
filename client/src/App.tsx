/*
************************************************************
*                                                          *
*   Flowhooks Software - Open Source License               *
*                                                          *
*  This software is licensed under the GNU Affero General   *
*  Public License v3. You may use, modify, and distribute   *
*  this code under the terms of the AGPLv3.                *
*                                                          *
*  This program is distributed in the hope that it will be  *
*  useful, but WITHOUT ANY WARRANTY; without even the       *
*  implied warranty of MERCHANTABILITY or FITNESS FOR A     *
*  PARTICULAR PURPOSE. See the GNU AGPLv3 for more details. *
*                                                          *
*  Author: Felipe Cezar Paz (git@felipecezar.com)          *
*  File:                                                   *
*  Description:                                            *
*                                                          *
************************************************************
*/

import React from "react"; // Import React
import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // Import the Home component
import About from "./pages/About"; // Import the About component
import NavigationBar from "./components/NavigationBar/NavigationBar"; // Import the NavigationBar component
import Footer from "./components/Footer/Footer"; // Import the Footer component
import LoginForm from "./components/LoginForm/LoginForm"; // Import the LoginForm component
import RegisterForm from "./components/RegisterForm/RegisterForm"; // Import the RegisterForm component
import Logout from './components/Logout/Logout'; // Import the Logout component

const App: React.FC = () => {
  return (
    <Router>
      <NavigationBar />
      <div className="mb-4 p-5">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Set up the home route */}
          <Route path="/about" element={<About />} /> {/* Set up the about route */}
          <Route path="/register" element={<RegisterForm />} /> {/* Set up the register route */}
          <Route path="/login" element={<LoginForm />} /> {/* Set up the login route */}
          <Route path="/logout" element={<Logout />} /> {/* Set up the logout route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
