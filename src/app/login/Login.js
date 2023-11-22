import React, { useEffect, useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username.toLowerCase() === "admin" && password === "Admin123") {
      onLogin();
    } else {
      setError("invalid credentials. please try again");
    }
  };

  // Function to clear the error when username or password changes
  const handleInputChange = () => {
    setError("");
  };

  // Function to reset input fields and error message
  const handleReset = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  // Check if username or password is empty
  const isInputEmpty = username.trim() === "" || password.trim() === "";

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-full max-w-md p-6 rounded shadow-md">
        <h1 title="USERNAME AND PASSWORD ARE BOTH REQUIRED" className="text-3xl font-bold mb-3 text-center text-dark"><i class="fa-solid fa-unlock-keyhole"></i> Login</h1>
        <form>
          <div className="mb-4">
            <label className="block text-dark font-bold mb-1" htmlFor="username">
              Username:
            </label>
            <input
              className="w-full px-2 py-2 text-lg border rounded text-dark"
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                handleInputChange();
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-dark font-bold mb-1" htmlFor="password">
              Password:
            </label>
            <input
              className="w-full px-2 py-2 text-lg border rounded text-dark"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange();
              }}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-center text-lowercase mb-4">
              {error} <button type="button" onClick={handleReset} className="text-lowercase">or click to reset</button>
            </p>
          )}

          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${isInputEmpty ? 'bg-red-500 cursor-not-allowed' : ''}`}
            type="button"
            onClick={handleLogin}
            disabled={isInputEmpty}
          >
            <i class="fa-solid fa-key"></i> {isInputEmpty ? 'Locked' : 'Activate'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
