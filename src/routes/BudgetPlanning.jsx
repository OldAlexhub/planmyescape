import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const BudgetPlanning = () => {
  const [origin, setOrigin] = useState("");
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleBudgetPlanning = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(process.env.REACT_APP_PYTHON_TWO, {
        origin,
        budget,
      });

      if (response.status === 200) {
        if (response.data.error) {
          setError(response.data.error);
          setResults([]);
        } else {
          setResults(response.data.results || []);
          setSuccessMessage("Here are the best travel options for you:");
        }
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch travel options. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlan = async (option) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        // console.log("User ID not found in localStorage.");
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_COMPLETE}/${userId}`,
        {
          origin: origin,
          destination: option.destination,
          avgHotels: option.avgHotels,
          avgTransportation: option.avgTransportation,
          avgAirbnb: option.avgAirbnb,
          budget: budget,
          avgFlights: option.avgFlights,
        }
      );

      if (response.status === 200) {
        // console.log("Vacation plan updated successfully!");
        setShowToast(true); // Show the toast notification
        setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
      }
    } catch (error) {
      console.log("Error updating vacation plan:", error);
    }
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="display-5">Plan Your Budget</h2>
        <p className="lead">
          Enter your origin and budget. Our AI will help you find the best
          travel options suited to your preferences.
        </p>
      </div>

      <div className="row align-items-center">
        <div className="col-lg-6 mb-4">
          <img
            src="https://upgradedpoints.com/wp-content/uploads/2022/04/Top-view-tourist-counting-cash-to-spend-during-his-luxury-vacation-planning-budget.jpeg"
            alt="Budget Planning"
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
          <form onSubmit={handleBudgetPlanning}>
            <div className="mb-3">
              <label className="form-label">Origin Location:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter origin location"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Fun Budget (USD):</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {loading ? "Loading..." : "Get Travel Options"}
            </button>
          </form>
        </div>
      </div>

      {error && <div className="alert alert-danger mt-4">{error}</div>}
      {successMessage && (
        <div className="alert alert-success mt-4">{successMessage}</div>
      )}

      {results && results.length > 0 && (
        <div className="mt-5 text-center">
          <h5>Suggested Travel Options</h5>
          <div className="row">
            {results.map((option, index) => (
              <div key={index} className="col-lg-4 mb-3">
                <div className="card border-secondary h-100">
                  <div className="card-body">
                    <h5 className="card-title">{option.destination}</h5>
                    <p className="card-text">
                      <strong>Daily Fun Budget:</strong> ${option.funBudget}{" "}
                      <br />
                      <strong>Hotel Cost per Night:</strong> ${option.avgHotels}{" "}
                      <br />
                      <strong>Transportation per Mile:</strong> $
                      {option.avgTransportation} <br />
                      <strong>Airbnb per Night:</strong> ${option.avgAirbnb}{" "}
                      <br />
                      <strong>Flight Cost:</strong> ${option.avgFlights}
                    </p>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleAddToPlan(option)}
                    >
                      Add To My Plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">PlanMyEscape</strong>
              <small>Just Now</small>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className="toast-body">Successfully added to your plan!</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetPlanning;
