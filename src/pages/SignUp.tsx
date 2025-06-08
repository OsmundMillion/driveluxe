import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";  // Google icon from react-icons

interface FormErrors {
  fullName?: string;
  username?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /.{6,}/;

    // Validate full name
    if (!form.fullName) newErrors.fullName = "Full name is required.";

    // Validate username (simulate checking for uniqueness)
    if (!form.username) newErrors.username = "Username is required.";
    // You can simulate a check for unique username here
    if (form.username === "existing_user") newErrors.username = "Username already exists.";

    // Validate email
    if (!form.email) newErrors.email = "Email is required.";
    else if (!emailPattern.test(form.email)) newErrors.email = "Invalid email format.";

    // Validate phone number
    if (!form.phone) newErrors.phone = "Phone number is required.";

    // Validate address
    if (!form.address) newErrors.address = "Address is required.";

    // Validate password
    if (!form.password) newErrors.password = "Password is required.";
    else if (!passwordPattern.test(form.password)) newErrors.password = "Password must be at least 6 characters long.";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Simulate sign-up (you can later integrate with backend logic here)
      localStorage.setItem("user", JSON.stringify({ username: form.username }));
      navigate("/signin");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-midnight to-[#0B111D] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1721909406919-fae54d634c77?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-slateGray/40 rounded-3xl shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-heading text-champagne">DriveLuxe</h1>
          <p className="mt-1 text-slateGray text-sm italic">Your Premium Ride Awaits</p>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-pearlWhite text-center">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#222A36] border border-slateGray rounded-lg text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition"
            />
            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#222A36] border border-slateGray rounded-lg text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition"
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#222A36] border border-slateGray rounded-lg text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#222A36] border border-slateGray rounded-lg text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#222A36] border border-slateGray rounded-lg text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition"
            />
            {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#222A36] border border-slateGray rounded-lg text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-midnight text-midnight font-semibold hover:bg-luxeGold hover:scale-[1.02] transition-transform duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Google Sign Up Button */}
        <div className="my-4 text-center">
          <button
            className="w-full py-2 px-4 rounded-lg bg-midnight text-midnight flex items-center justify-center space-x-4 hover:bg-gray-200 transition"
            // Add Google OAuth functionality here
          >
            <FaGoogle className="text-red-500" />
            <span>Sign Up with Google</span>
          </button>
        </div>

        {/* Sign Up Footer Links */}
        <p className="text-sm text-center mt-4 text-slateGray">
          Already have an account?{" "}
          <a href="/signin" className="text-champagne underline hover:text-luxeGold transition">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
