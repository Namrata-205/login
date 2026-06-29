import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("password123");
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setMessage("Loading...");

    const endpoint = mode === "login" ? "api/login" : "api/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Request failed");
      }

      setMessage(`${data.message}: ${data.email}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main>
      <section className="panel">
        <h1>{mode === "login" ? "Login" : "Create Account"}</h1>

        <div className="tabs">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setMessage("");
            }}
          >
            Login
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => {
              setMode("register");
              setMessage("");
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={submit}>
          <label>Email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
          />

          <label>Password</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
          />

          <button className="submit" type="submit">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </section>
    </main>
  );
}