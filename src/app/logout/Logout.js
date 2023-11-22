// Create a new Logout component (Logout.js)
import React from "react";
import { withRouter } from "react-router-dom";

const Logout = ({ onLogout, history }) => {
  const handleLogout = () => {
    onLogout(); // Call the onLogout callback passed from the parent component
    history.push("/"); // Redirect the user to the login page (adjust the path as needed)
  };

  return (
    <div>
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default withRouter(Logout);
