import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useModal } from "../../context/Modal";

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const isButtonDisabled =
    !email ||
    !username ||
    !firstName ||
    !lastName ||
    !password ||
    !confirmPassword ||
    username.length < 4 ||
    password.length < 6;

  if (sessionUser) return <Redirect to="/" />;

  // useEffect(() => {
  //   if (sessionUser) closeModal();
  // }, [sessionUser, closeModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      }));
    }
  };

  return (
    <>
      <h1 className="form-title">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="form-input-label">
            Email
            <input
              className="form-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="error-message">{errors.email}</p>}
          <label className="form-input-label">
            Username
            <input
              className="form-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
          <label className="form-input-label">
            First Name
            <input
              className="form-input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && (
            <p className="error-message">{errors.firstName}</p>
          )}
          <label className="form-input-label">
            Last Name
            <input
              className="form-input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && (
            <p className="error-message">{errors.lastName}</p>
          )}
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
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
          <label className="form-input-label">
            Confirm Password
            <input
              className="form-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
          <button
            className="submit-button"
            type="submit"
            disabled={isButtonDisabled}
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default SignupFormModal;
