import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = ({ setPage }) => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="sidebar">
      <h2>Job Tracker</h2>

      <button onClick={() => setPage("dashboard")}>Dashboard</button>
      <button onClick={() => setPage("add")}>Add Job</button>
      <button onClick={() => setPage("game")}>Tic Tac Toe</button>

      <hr style={{ margin: "20px 0" }} />

      <button onClick={toggleTheme}>
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default Navbar;