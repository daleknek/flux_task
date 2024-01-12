import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout} style={{ color: "#fff", marginRight: 8 }}>
      Logout
    </Button>
  );
};

export default Logout;
