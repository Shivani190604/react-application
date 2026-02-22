import React, { useRef, useReducer } from "react";
import { useForm } from "../hooks/useForm";
import { jobReducer } from "../reducer/jobReducer";
import { useLocalStorage } from "../hooks/useLocalStorage";

const JobForm = () => {
  const [jobs, dispatch] = useReducer(jobReducer, []);
  useLocalStorage("jobs", jobs);

  const fileRef = useRef();

  const { values, handleChange, reset } = useForm({
    company: "",
    description: "",
    status: "Applied"
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD_JOB",
      payload: {
        id: Date.now(),
        ...values,
        resume: fileRef.current.files[0]?.name
      }
    });

    reset();
  };

  return (
    <div className="card">
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