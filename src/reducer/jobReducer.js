export const jobReducer = (state, action) => {
  switch (action.type) {
    case "ADD_JOB":
      return [...state, action.payload];

    case "DELETE_JOB":
      return state.filter(job => job.id !== action.payload);

    case "UPDATE_STATUS":
      return state.map(job =>
        job.id === action.payload.id
          ? { ...job, status: action.payload.status }
          : job
      );

    default:
      return state;
  }
};