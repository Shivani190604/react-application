import React, { useCallback } from "react";
import { useATSScore } from "../hooks/useATSScore";

const JobCard = ({ job, dispatch }) => {
  const score = useATSScore(job.description);

  const handleDelete = useCallback(() => {
    dispatch({ type: "DELETE_JOB", payload: job.id });
  }, [dispatch, job.id]);

  return (
    <div className="card">
      <h3>{job.company}</h3>
      <p>Status: {job.status}</p>
      <p>ATS Score: {score}</p>
      <button className="primary" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default React.memo(JobCard);