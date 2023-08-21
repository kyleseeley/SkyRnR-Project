import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import { useModal } from "../../context/Modal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log("Server response data:", data);
        if (data && data.message) {
          setErrors({ credential: data.message });
        }
      });
  };

  return (
    <>
      <h1 className="form-title">Log In</h1>
      <form onSubmit={handleSubmit}>
        <label className="form-input-label">
          Username or Email
          <input
            className="form-input"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="form-input-label">
          Password
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p className="error-message">{errors.credential}</p>
        )}
        <button className="submit-button" type="submit">
          Log In
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;