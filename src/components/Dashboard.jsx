import React, { useMemo } from "react";
import JobCard from "./JobCard";

const Dashboard = ({ jobs, dispatch }) => {

  const total = jobs.length;

  const applied = useMemo(
    () => jobs.filter(j => j.status === "Applied").length,
    [jobs]
  );

  const interview = useMemo(
    () => jobs.filter(j => j.status === "Interview").length,
    [jobs]
  );

  const offer = useMemo(
    () => jobs.filter(j => j.status === "Offer").length,
    [jobs]
  );

  const successRate = total > 0 ? ((offer / total) * 100).toFixed(1) : 0;

  const recentJobs = [...jobs].reverse().slice(0, 3);

  return (
    <div style={{ width: "100%", maxWidth: "900px" }}>

      <h1 style={{ marginBottom: "30px" }}>Dashboard Overview</h1>

      {/* Stats Section */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "20px",
        marginBottom: "40px"
      }}>
        <div className="card"><h3>Total</h3><h1>{total}</h1></div>
        <div className="card"><h3>Applied</h3><h1>{applied}</h1></div>
        <div className="card"><h3>Interview</h3><h1>{interview}</h1></div>
        <div className="card"><h3>Offers</h3><h1>{offer}</h1></div>
        <div className="card"><h3>Success Rate</h3><h1>{successRate}%</h1></div>
      </div>

      {/* Recent Jobs */}
      <h2 style={{ marginBottom: "20px" }}>Recent Applications</h2>

      {recentJobs.length === 0 ? (
        <p>No applications added yet.</p>
      ) : (
        recentJobs.map(job => (
          <JobCard key={job.id} job={job} dispatch={dispatch} />
        ))
      )}
    </div>
  );
};

export default Dashboard;