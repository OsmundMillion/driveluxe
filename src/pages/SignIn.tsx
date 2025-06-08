import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  interface FormErrors {
  username?: string;
  password?: string;
}

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}; // Type the errors object
    const usernamePattern = /^[a-zA-Z0-9_]+$/; // Username pattern

    // Validate full name
    if (!form.username) newErrors.username = "Username is required.";
    else if (!usernamePattern.test(form.username)) newErrors.username = "Username can only contain letters, numbers, and underscores.";

    // Validate password
    if (!form.password) newErrors.password = "Password is required.";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters long.";

    return newErrors;
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Simulate login (you can later integrate with backend logic here)
      if (form.username === "john_doe" && form.password === "123456") {
        localStorage.setItem("user", JSON.stringify({ username: form.username }));
        navigate("/cars");
      } else {
        alert("Invalid login details.");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-midnight to-[#0B111D] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566473965997-3de9c817e938?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-slateGray/40 rounded-3xl shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-heading text-champagne">DriveLuxe</h1>
          <p className="mt-1 text-slateGray text-sm italic">Your Premium Ride Awaits</p>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-pearlWhite text-center">Welcome back</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Ndzalama Mathye"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#222A36] border border-slateGray rounded-lg text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition"
              required
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#222A36] border border-slateGray rounded-lg text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition"
              required
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          {/* ReCAPTCHA Placeholder */}
          <div className="mb-4">
            <span className="text-xs text-slateGray">[ ReCAPTCHA Placeholder ]</span>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-midnight text-midnight font-semibold hover:bg-luxeGold hover:scale-[1.02] transition-transform duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Centered Forgot Password and Sign Up link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-slateGray">
            Don’t have an account?{" "}
            <a href="/signup" className="text-champagne underline hover:text-luxeGold transition">
              Sign Up
            </a>
          </p>
          <p className="mt-2 text-xs text-slateGray">
            <a href="#" className="hover:text-luxeGold transition">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
