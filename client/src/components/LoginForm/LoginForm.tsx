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

import React, { useState } from "react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    // Simple email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    onSubmit(email, password);
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <label className="block mb-2 font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@example.com"
          required
        />

        <label className="block mb-2 font-semibold" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition-colors"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
