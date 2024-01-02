import { createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/Register.css";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [trackOpacity, setTrackOpacity] = useState(0);
  const [goLeft, setGoLeft] = useState(0);

  const nav = useNavigate();

  const usersCollection = collection(db, "users");

  useEffect(() => {
    setTrackOpacity(1);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await addDoc(usersCollection, {
      uid: user.uid,
      username,
      email,
      phone,
    });

    // window.location.reload();
    setGoLeft(100);
    setTrackOpacity(0);

    setTimeout(function () {
      nav("/");
    }, 2000);
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
        <p style={{ opacity: trackOpacity }}>Get Started</p>
        <div className="inputFields">
          <form onSubmit={handleRegister}>
            <input
              required
              style={{ opacity: trackOpacity }}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
            />
            <input
              required
              style={{ opacity: trackOpacity }}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              required
              style={{ opacity: trackOpacity }}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Phone"
            />
            <input
              required
              style={{ opacity: trackOpacity }}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button type="submit">Signup</button>
          </form>
        </div>
        <div className="links">
          Already have an account? <Link to="/login"> Login.</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
