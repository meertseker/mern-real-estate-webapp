import React, { useState } from "react"; // Import useState
import { useNavigate, Link } from "react-router-dom"; 
const Signup = () => {

  const [ error , setError] = useState(null);
  const [ loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData); // This will log the OLD state, not the updated one
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(formData)    
      });
      const data = await res.json();
      console.log(data)

      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return; // Prevent further execution
      }
  
      // If signup is successful
      setLoading(false);
      setError(null);
      navigate("/sign-in"); 
  
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-2-lg mx-auto">
      <h1 className="text-3x1 text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange} // Use curly braces for event handler
        />
        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange} // Add onChange handler
        />
        <input
          type="text"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange} // Add onChange handler
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80">
          {loading ? "Loading...": "Sign Up"}
        </button>
      </form>

      <div className="flex gap-2 mt-5 text-center">
        <p>Have an account?</p>
        <Link to="/sign-in">
        <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500-m">{error}</p> }
    </div>
  );
};

export default Signup;