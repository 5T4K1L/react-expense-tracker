import React from "react";
import reset from "../../svgs/reset-svgrepo-com(1).svg";
import ThisWeek from "../Homepage/ThisWeek";
import Daily from "../Homepage/Daily";

const Expense = () => {
  return (
    <div className="expenseContainer">
      <div className="headerOne">
        <p>Spent on this week</p>
        <button>
          <img src={reset} style={{ height: 16 }} alt="" />
        </button>
      </div>

      <ThisWeek></ThisWeek>

      <div className="headerTwo">
        <p>Spent on this day</p>
      </div>

      <Daily></Daily>
    </div>
  );
};

export default Expense;
