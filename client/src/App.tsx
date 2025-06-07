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

import { useState } from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar"; // Import the Navbar component
import Footer from "./components/Footer/Footer"; // Import the Footer component
import LoginForm from "./components/LoginForm/LoginForm"; // Import the Footer component
import RegisterForm from "./components/RegisterForm/RegisterForm"; // Import the Footer component

function App() {
  return (
    <div>
      <NavigationBar />
      <div className="pt-14">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
}

export default App;
