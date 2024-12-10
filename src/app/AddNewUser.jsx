"use client";

import React, { useState } from "react";

function AddUser() {
  const [wid, setWid] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/timesheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wid, email, name }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      setSuccessMessage("User added successfully");
      setErrorMessage("");
      setWid("");
      setEmail("");
      setName("");
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleAddUser}>
        <div>
          <label>
            WID:
            <input
              type="text"
              value={wid}
              onChange={(e) => setWid(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Add User</button>
      </form>
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
}

export default AddUser;