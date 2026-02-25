import React, { useRef } from "react";
import { useForm } from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useATSScore } from "../hooks/useATSScore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobForm = ({ jobs, dispatch }) => {

  useLocalStorage("jobs", jobs);

  const fileRef = useRef();

  const { values, handleChange, reset } = useForm({
    company: "",
    description: "",
    status: "Applied"
  });

  // Calculate ATS score based on job description (after values is defined)
  const atsScore = useATSScore(values.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD_JOB",
      payload: {
        id: Date.now(),
        ...values,
        resume: fileRef.current.files[0]?.name
  , atsScore
      }
    });

    reset();

  toast.success("Job added successfully!");
  };

  return (
    <div className="card">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <h2>Add New Job</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="company"
          value={values.company}
          onChange={handleChange}
          placeholder="Company Name"
        />

        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Job Description"
        />

        <select
          name="status"
          value={values.status}
          onChange={handleChange}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
        </select>

        <input type="file" ref={fileRef} />

        <button className="primary" type="submit">
          Add Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;