import React, { useReducer, useContext } from "react";
import "./App.css";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { jobReducer } from "./reducer/jobReducer";
import Dashboard from "./components/Dashboard";
import JobForm from "./components/JobForm";
import TicTacToe from "./components/TicTacToe";
import Navbar from "./components/Navbar";

const AppContent = () => {
  const { dark } = useContext(ThemeContext); // 👈 GET DARK MODE

  const [page, setPage] = React.useState("dashboard");

  const [jobs, dispatch] = useReducer(jobReducer, [], () => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  return (
    <div className={`app-container ${dark ? "dark" : ""}`}>
      <Navbar setPage={setPage} />

      <div className="main-content">
        {page === "dashboard" && (
          <Dashboard jobs={jobs} dispatch={dispatch} />
        )}

        {page === "add" && (
          <JobForm dispatch={dispatch} />
        )}

        {page === "game" && <TicTacToe />}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}