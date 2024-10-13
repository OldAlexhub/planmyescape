import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../routes/Home";
import Signup from "../routes/Signup";
import Footer from "../components/Footer";
import Plan from "../routes/Plan";
import BudgetPlanning from "../routes/BudgetPlanning";
import FullPlan from "../routes/FullPlan";
import Bookkeeping from "../routes/Bookkeeping";
import ProtectedRoute from "../components/ProtectedRoute";

const RouteManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="plan"
            element={
              <ProtectedRoute>
                <Plan />
              </ProtectedRoute>
            }
          />
          <Route
            path="budget"
            element={
              <ProtectedRoute>
                <BudgetPlanning />
              </ProtectedRoute>
            }
          />
          <Route
            path="full"
            element={
              <ProtectedRoute>
                <FullPlan />
              </ProtectedRoute>
            }
          />
          <Route
            path="bookkeeping"
            element={
              <ProtectedRoute>
                <Bookkeeping />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default RouteManager;
