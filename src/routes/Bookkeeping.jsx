import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Bookkeeping = () => {
  const [records, setRecords] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const totalBudget = parseFloat(localStorage.getItem("total")) || 0;

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `${process.env.REACT_APP_GET_RECORDS}/${userId}`
      );
      setRecords(response.data.data);
    } catch (error) {
      setError("Failed to fetch records. Please try again.");
    }
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      const userId = localStorage.getItem("userId");
      await axios.post(process.env.REACT_APP_ADD_RECORD, {
        userId,
        description,
        category,
        amount,
      });
      setDescription("");
      setCategory("");
      setAmount("");
      setSuccessMessage("Record added successfully.");
      fetchRecords();
    } catch (error) {
      setError("Failed to add record. Please try again.");
    }
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_DELETE_RECORDS}/${recordId}`);
      fetchRecords();
    } catch (error) {
      setError("Failed to delete record. Please try again.");
    }
  };

  const totalExpenses = records.reduce((acc, record) => acc + record.amount, 0);
  const remainingBudget = totalBudget - totalExpenses;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Bookkeeping</h2>

      <div className="alert alert-info text-center">
        <strong>Total Budget:</strong> ${totalBudget}
      </div>

      <form onSubmit={handleAddRecord} className="mb-4">
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Record
        </button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount ($)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.description}</td>
                <td>{record.category}</td>
                <td>${record.amount}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteRecord(record._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="alert alert-info text-center mt-4">
        <strong>Remaining Budget:</strong> ${remainingBudget}
      </div>
    </div>
  );
};

export default Bookkeeping;
