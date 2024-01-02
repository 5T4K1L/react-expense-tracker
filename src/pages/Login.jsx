import { signInWithEmailAndPassword } from "firebase/auth";
import "../styles/Register.css";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [trackOpacity, setTrackOpacity] = useState(0);
  const [goLeft, setGoLeft] = useState(0);

  const nav = useNavigate();

  useEffect(() => {
    setTrackOpacity(1);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setGoLeft(100);
      setTrackOpacity(0);

      setTimeout(function () {
        nav("/");
      }, 2000);
    } catch (error) {
      console.log("Wrong Credentials");
    }
  };

  return (
    <div className="formContainer">
      <div className="quote" style={{ opacity: trackOpacity }}>
        <p>
          Tracking Every Expense Empowering Your Financial <span>Success</span>
        </p>
      </div>

      <div
        className="loginSignupContainer"
        style={{ opacity: trackOpacity, right: goLeft + "%" }}
      >
        <p style={{ opacity: trackOpacity }}>Login</p>
        <div className="inputFields">
          <form onSubmit={handleRegister}>
            <input
              style={{ opacity: trackOpacity }}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              style={{ opacity: trackOpacity }}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="links">
          Don't have an account? <Link to="/register"> Register.</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
