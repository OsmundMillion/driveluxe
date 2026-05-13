import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

interface FormErrors {
  fullName?: string;
  username?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
}

interface StoredUser {
  username: string;
  password: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: "customer" | "admin";
}

const USERS_KEY = "driveluxe_users";

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
    setErrors({});
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[a-zA-Z0-9_]+$/;

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";

    if (!form.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (!usernamePattern.test(form.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores.";
    } else {
      // Check for duplicate username in localStorage
      const existing: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      const taken = existing.some(
        (u) => u.username.toLowerCase() === form.username.toLowerCase()
      );
      if (taken) newErrors.username = "Username is already taken.";
    }

    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!emailPattern.test(form.email)) newErrors.email = "Invalid email format.";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";

    if (!form.address.trim()) newErrors.address = "Address is required.";

    if (!form.password) newErrors.password = "Password is required.";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Build and save the full user object
    const newUser: StoredUser = {
      username: form.username,
      password: form.password,
      fullName: form.fullName,
      email: form.email,
      phoneNumber: form.phone,
      address: form.address,
      role: "customer",
    };

    const existing: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    existing.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(existing));

    navigate("/signin");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-midnight to-[#0B111D] flex items-center justify-center overflow-hidden py-12">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1721909406919-fae54d634c77?q=80&w=2670&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-slateGray/40 rounded-3xl shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-heading text-champagne">DriveLuxe</h1>
          <p className="mt-1 text-slateGray text-sm italic">Your Premium Ride Awaits</p>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-pearlWhite text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
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
            {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
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
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#222A36] border border-slateGray rounded-lg text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition"
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
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
            {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password (min. 6 characters)"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#222A36] border border-slateGray rounded-lg text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-luxeGold text-midnight font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slateGray">
            Already have an account?{" "}
            <Link to="/signin" className="text-champagne underline hover:text-luxeGold transition">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;