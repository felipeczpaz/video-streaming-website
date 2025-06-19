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

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from './context/UserContext.tsx'; // Adjust the import path as necessary
import { DarkModeProvider } from "./context/DarkModeContext"; // Import the DarkModeProvider
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </UserProvider>
  </StrictMode>
);
