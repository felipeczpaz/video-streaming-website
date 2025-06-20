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

// Logout.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    // Clear user authentication data (e.g., remove token from localStorage)
    localStorage.removeItem('token'); // Adjust based on your auth method

    setUser(null); // Clear user state
    window.dispatchEvent(new Event('authChange'));

    // Redirect to the login page or home page
    navigate('/login'); // Change to your desired route
  }, [setUser, navigate]);

  return null; // You can also return a loading spinner or message if desired
};

export default Logout;
