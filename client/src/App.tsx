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
      <div className="my-4 pt-5">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
}

export default App;
