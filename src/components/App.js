import React, { useState } from "react";
import "./../styles/App.css";

const emptyInputs = { name: "", email: "", address: "", mobile: "" };
const emptyErrors = { nameErr: "", emailErr: "", addressErr: "", mobileErr: "" }; // prettier-ignore

const App = () => {
  const [inputs, setInputs] = useState(emptyInputs);
  const [errors, setErrors] = useState(emptyErrors);
  const { name, email, address, mobile } = inputs;
  const { nameErr, emailErr, addressErr, mobileErr } = errors;
  const [formStatus, setFormStatus] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [`${name}Err`]: "" });
    setFormStatus(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nameErr = validateName();
    const emailErr = validateEmail();
    const addressErr = validateAddress();
    const mobileErr = validateMobile();
    const newErrors = { nameErr, emailErr, addressErr, mobileErr };
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) return setFormStatus("Please fix the above errors.");
    setFormStatus("Your form has been submitted successfully.");
    setInputs(emptyInputs);
  }

  function validateName() {
    const trimmed = name.trim();
    if (!trimmed) return "Name is required *";
    if (!/[^a-zA-Z]/.test(trimmed)) return "";
    return "Name should only contain letters.";
  }

  function validateEmail() {
    const trimmed = email.trim();
    if (!trimmed) return "Email is required *";
    if (/^[a-zA-Z0-9!@#$%&]+@[a-zA-Z]+\.com$/.test(trimmed)) return "";
    return "Email should contain @ and .com";
  }

  function validateAddress() {
    const trimmed = address.trim();
    if (!trimmed) return "Address is required *";
    if (!/[^a-zA-Z0-9]/.test(trimmed)) return "";
    return "Address should not contain special characters";
  }

  function validateMobile() {
    const trimmed = mobile.trim();
    if (!trimmed) return "Mobile is required *";
    if (/^[0-9]{1,10}$/.test(trimmed)) return "";
    return "Mobile number should not be more than 10 characters";
  }

  return (
    <div>
      <h1>Form :</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Name: &nbsp;</label>
          <input name="name" value={name} onChange={handleChange} />
          {nameErr && <p className="errorMessage">{nameErr}</p>}
        </div>
        <div className="field">
          <label>Email: &nbsp;</label>
          <input name="email" value={email} onChange={handleChange} />
          {emailErr && <p className="errorMessage">{emailErr}</p>}
        </div>
        <div className="field">
          <label>Address: &nbsp;</label>
          <input name="address" value={address} onChange={handleChange} />
          {addressErr && <p className="errorMessage">{addressErr}</p>}
        </div>
        <div className="field">
          <label>Mobile: &nbsp;</label>
          <input name="mobile" value={mobile} onChange={handleChange} />
          {mobileErr && <p className="errorMessage">{mobileErr}</p>}
        </div>
        <button>Submit</button>
        {formStatus && <h3>{formStatus}</h3>}
      </form>
    </div>
  );
};

export default App;
