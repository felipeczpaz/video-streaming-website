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
// src/components/Footer/Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-center pt-8">
      <div className="container mx-auto pb-1">
        <div className="text-center">
          <h5 className="text-xl font-semibold mb-1">Video Streaming Site</h5>
          <p className="text-gray-700">
            Developed by Felipe Cezar Paz (
            <a
              href="mailto:contact@felipecezar.com"
              className="underline hover:text-blue-600"
            >
              contact@felipecezar.com
            </a>
            ).
          </p>
        </div>
      </div>
      <div className="text-center mb-8 text-gray-600">
        &copy; {new Date().getFullYear()} FlowHooks Software. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
