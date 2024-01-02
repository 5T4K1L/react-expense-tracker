import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import TravelExpense from "./pages/TravelExpense";
import MaterialExpense from "./pages/MaterialExpense";
import FoodExpense from "./pages/FoodExpense";
import AddBudget from "./pages/AddBudget";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/add-budget" element={<AddBudget />} />

        <Route path="/add-travel-expense" element={<TravelExpense />} />
        <Route path="/add-material-expense" element={<MaterialExpense />} />
        <Route path="/add-food-expense" element={<FoodExpense />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
