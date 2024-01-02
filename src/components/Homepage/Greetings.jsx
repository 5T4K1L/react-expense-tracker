import React from "react";
import history from "../../svgs/history-svgrepo-com.svg";

const Greetings = ({ username }) => {
  return (
    <div className="greetings">
      <div>
        <p>{username}</p>
      </div>
      <div>
        {/* <button>
          <img src={history} alt="" />
        </button> */}
      </div>
    </div>
  );
};

export default Greetings;
