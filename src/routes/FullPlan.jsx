import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const FullPlan = () => {
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const [people, setPeople] = useState(1);
  const [miles, setMiles] = useState(10); // Default miles
  const [loading, setLoading] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found in local storage.");

        const response = await axios.get(
          `${process.env.REACT_APP_GET_PACKAGES}/${userId}`
        );
        setPlan(response.data);
        localStorage.setItem("total", response.data.budget);
      } catch (err) {
        console.log(err);
        setError("Failed to retrieve the full plan. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [deleteSuccess]);

  const handlePeopleChange = (e) => {
    setPeople(e.target.value);
  };

  const handleMilesChange = (e) => {
    setMiles(e.target.value);
  };

  const handleDelete = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.delete(`${process.env.REACT_APP_DELETE}/${userId}`);
      setDeleteSuccess(true);
      setPlan(null); // Clear the plan data after deletion
    } catch (err) {
      console.error("Error deleting the itinerary:", err);
      setError("Failed to delete the itinerary. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger mt-4 text-center">{error}</div>;
  }

  if (!plan) {
    return (
      <div className="text-center mt-4">
        {deleteSuccess ? (
          <div className="alert alert-success">
            Your itinerary has been deleted successfully.
          </div>
        ) : (
          "No travel plan found."
        )}
      </div>
    );
  }

  const totalFlightCost = plan.avgFlights * people;
  const totalTransportCost = plan.avgTransportation * miles;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        Your Travel Itinerary to {plan.destination}
      </h2>

      <div className="row mb-4">
        <div className="col-lg-6">
          <div className="card border-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Travel Details</h5>
              <p>
                <strong>Origin:</strong> {plan.origin.toUpperCase()}{" "}
              </p>
              <p>
                <strong>Destination:</strong> {plan.destination}
              </p>
              <p>
                <strong>Total Days:</strong> {plan.totalDays}
              </p>
              <p>
                <strong>Business Days:</strong> {plan.businessDays}
              </p>
              <p>
                <strong>Weekends:</strong> {plan.weekEnds}
              </p>
              <p>
                <strong>Holidays:</strong> {plan.Holidays}
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Accommodation & Budget</h5>
              <p>
                <strong>Hotel Cost per Night:</strong> ${plan.avgHotels}, Total
                stay average cost:
                <strong> ${plan.avgHotels * plan.totalDays}</strong>
              </p>
              <p>
                <strong>Airbnb Cost per Night:</strong> ${plan.avgAirbnb}, Total
                stay average cost:
                <strong> ${plan.avgAirbnb * plan.totalDays}</strong>
              </p>
              <p>
                <strong>Fun Budget:</strong> ${plan.budget}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-secondary mb-4">
        <div className="card-body">
          <h5 className="card-title">Flight Cost (Per Person)</h5>
          <div className="mb-3">
            <label className="form-label">Number of People:</label>
            <input
              type="number"
              className="form-control"
              value={people}
              onChange={handlePeopleChange}
              min="1"
            />
          </div>
          <p>
            <strong>Total Flight Cost for {people} Person(s):</strong> $
            {totalFlightCost}
          </p>
        </div>
      </div>

      <div className="card border-secondary mb-4">
        <div className="card-body">
          <h5 className="card-title">
            Transportation within {plan.destination}
          </h5>
          <div className="mb-3">
            <label className="form-label">Miles to Travel:</label>
            <input
              type="number"
              className="form-control"
              value={miles}
              onChange={handleMilesChange}
              min="0"
            />
          </div>
          <p>
            <strong>Total Transportation Cost for {miles} Mile(s):</strong> $
            {totalTransportCost}
          </p>
        </div>
      </div>

      <div className="alert alert-info mt-4">
        <strong>Note:</strong> This itinerary provides an estimate based on your
        chosen parameters. Actual expenses may vary.
      </div>

      {/* Delete Button */}
      <div className="text-center mt-4">
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Itinerary
        </button>
      </div>
    </div>
  );
};

export default FullPlan;
