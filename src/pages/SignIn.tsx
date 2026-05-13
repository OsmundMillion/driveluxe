import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear errors on change
    setErrors({});
  };

  const validateForm = (): { username?: string; password?: string } => {
    const newErrors: { username?: string; password?: string } = {};
    const usernamePattern = /^[a-zA-Z0-9_]+$/;

    if (!form.username) newErrors.username = "Username is required.";
    else if (!usernamePattern.test(form.username))
      newErrors.username = "Username can only contain letters, numbers, and underscores.";

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

    const result = login(form.username, form.password);
    if (result.success) {
      navigate("/cars");
    } else {
      setErrors({ general: result.message });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-midnight to-[#0B111D] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566473965997-3de9c817e938?q=80&w=2670&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-slateGray/40 rounded-3xl shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6">
          <motion.h1
            className="text-3xl font-heading text-champagne"
            animate={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            DriveLuxe
          </motion.h1>
          <p className="mt-1 text-slateGray text-sm italic">Your Premium Ride Awaits</p>
        </div>

        <motion.h2
          className="text-xl font-semibold mb-6 text-pearlWhite text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome back
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* General error */}
          {errors.general && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
              {errors.general}
            </p>
          )}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#222A36] border border-slateGray rounded-lg text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition"
            />
            {errors.username && (
              <p className="text-red-400 text-xs mt-1">{errors.username}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#222A36] border border-slateGray rounded-lg text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </motion.div>

          <motion.button
            type="submit"
            className="w-full py-2 rounded-lg bg-luxeGold text-midnight font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Sign In
          </motion.button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-slateGray">
            Don't have an account?{" "}
            <Link to="/signup" className="text-champagne underline hover:text-luxeGold transition">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;