import React, { useState } from "react";
import axios from "axios";

const Plan = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [results, setResults] = useState(null);
  const [holidays, setHolidays] = useState(0);
  const [weekdays, setWeekdays] = useState(0);
  const [weekends, setWeekends] = useState(0);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePlanning = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success message

    try {
      const response = await axios.post(process.env.REACT_APP_PYTHON_ONE, {
        fromDate,
        toDate,
      });

      if (response.status === 200) {
        const { results, holidays, Weekdays, weekends } = response.data;
        setResults(results);
        setHolidays(holidays);
        setWeekdays(Weekdays);
        setWeekends(weekends);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve vacation data. Please try again.");
    }
  };

  const downloadCSV = () => {
    if (!results) return;

    const csvContent = [
      ["Date", "Status"],
      ...results.map((item) => [
        new Date(item.Date).toDateString(),
        item.Status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "vacation_breakdown.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const submitData = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(process.env.REACT_APP_ADD, {
        userId,
        fromDate,
        toDate,
        totalDays: weekends + weekdays + holidays,
        businessDays: weekdays,
        weekEnds: weekends,
        Holidays: holidays,
      });

      if (response.status === 201) {
        setSuccessMessage("Your plan has been added successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="display-5">Plan Your Time Off</h2>
        <p className="lead">
          Select your vacation dates, and let our AI help you determine the
          required time off, considering weekends and holidays for optimal
          planning.
        </p>
      </div>

      <div className="row align-items-center">
        <div className="col-lg-6 mb-4">
          <img
            src="https://content.presspage.com/uploads/2278/1920_vacationplanningstockphoto.jpeg?10000"
            alt="Vacation Planning"
            className="img-fluid"
            style={{
              backgroundColor: "#e9ecef",
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>

        <div className="col-lg-6">
          <div className="mb-3">
            <label className="form-label">From Date:</label>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">To Date:</label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100" onClick={handlePlanning}>
            Calculate My Time Off
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h5 className="text-center mb-4">Your Vacation Breakdown</h5>
        {error && <p className="text-danger text-center">{error}</p>}
        {successMessage && (
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}

        {results && (
          <div className="row">
            <div className="col-lg-4 mb-3">
              <div className="card border-primary">
                <div className="card-body">
                  <h6 className="card-title text-center">Summary</h6>
                  <p className="card-text">
                    <strong>Holidays:</strong> {holidays}
                  </p>
                  <p className="card-text">
                    <strong>Weekdays (Excluding Holidays):</strong> {weekdays}
                  </p>
                  <p className="card-text">
                    <strong>Weekends (Excluding Holidays):</strong> {weekends}
                  </p>
                  <p className="card-text">
                    <strong>Total Days:</strong>{" "}
                    {weekends + weekdays + holidays} Days
                  </p>
                  <button
                    className="btn btn-success w-100 mt-3"
                    onClick={submitData}
                  >
                    Add To My Plan
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card border-secondary">
                <div className="card-body">
                  <h6 className="card-title text-center">Day-by-Day Status</h6>
                  <button
                    className="btn btn-secondary mb-3"
                    onClick={downloadCSV}
                  >
                    Download CSV
                  </button>
                  <ul className="list-group">
                    {results.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span>{new Date(item.Date).toDateString()}</span>
                        <span
                          className={`badge ${
                            item.Status === "Request Day Off"
                              ? "bg-warning"
                              : "bg-success"
                          }`}
                        >
                          {item.Status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
