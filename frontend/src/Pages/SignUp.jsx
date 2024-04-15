import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      setLoading(true);
      setError(false);
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );
      console.log(data);
      setLoading(false);

      if (data.success == false) {
        setError(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-200 p-2 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-200 p-2 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-200 p-2 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-700 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "sign up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account?</p>
        <Link to="/signin">
          <span className="text-blue-500">sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went Wrong!"}</p>
    </div>
  );
};

export default SignUp;
