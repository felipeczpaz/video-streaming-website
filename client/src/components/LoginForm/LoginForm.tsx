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
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import { useUser } from "../../context/UserContext";

interface LoginFormProps {
  onSubmit: (userId: string, username: string) => void; // Adjusted to match the expected parameters
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [login, setLogin] = useState<string>(""); // Changed state variable to 'login'
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { setUser } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(""); // Reset success message

    if (!login || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }), // Use 'login' for the request body
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        setSuccessMessage("Login successful!");

        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("authChange"));

        // Call the onSubmit prop with userId and username
        // onSubmit(data.userId, data.username);

        // Redirect to the root path upon success
        navigate("/"); // Use navigate to redirect
      } else {
        // Associative array for error messages
        const errorMessages: { [key: string]: string } = {
          invalid_credentials: "Invalid username/email or password.",
          error_logging_in: "There was an error logging in.",
        };

        // Set error message based on the error code
        setError(
          errorMessages[data.error] || "Login failed. Please try again.",
        );
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      {successMessage && (
        <p className="mb-4 text-green-600">{successMessage}</p>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <label className="block mb-2 font-semibold" htmlFor="login">
          Username or Email
        </label>
        <input
          id="login"
          type="text" // Keep as text to accommodate both username and email
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={login}
          onChange={(e) => setLogin(e.target.value)} // Update state with login
          placeholder="Username or Email"
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

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
