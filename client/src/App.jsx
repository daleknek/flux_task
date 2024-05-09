import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import Board from "./components/Board.jsx";
import jwtDecode from "jwt-decode";
import Logout from "./components/Logout.jsx";

function App() {
  function RequireAuth({ children, redirectTo }) {
    //checks the existence of a token in localStorage to determine if the user is authenticated
    const token = localStorage.getItem("token");
    const isAuthenticated = token ? true : false;
    //decodes the token and checks its expiration time (exp) against the current time.
    const isTokenExpired = token
      ? jwtDecode(token).exp < Date.now() / 1000
      : true;
    //if the token is expired (isTokenExpired is true), the user is redirected to the login page using the Navigate component.
    return isAuthenticated && !isTokenExpired ? (
      children
    ) : (
      <Navigate to={redirectTo} />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/board"
        element={
          <RequireAuth redirectTo="/login">
            <Board />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
