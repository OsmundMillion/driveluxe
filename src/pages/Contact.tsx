import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!emailPattern.test(form.email)) newErrors.email = "Invalid email format.";
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // No backend — just show success state
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-midnight text-pearlWhite"
    >
      {/* Hero */}
      <div
        className="relative w-full h-[40vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-4">
          <p className="uppercase text-sm tracking-widest text-champagne mb-2">Get In Touch</p>
          <h1 className="text-5xl font-bold">
            Contact <span className="text-luxeGold">Us</span>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-champagne mb-3">We'd love to hear from you</h2>
            <p className="text-pearlWhite/70 leading-relaxed text-sm">
              Have a question about a booking, a specific vehicle, or just want to say hello?
              Fill in the form and our team will get back to you shortly.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-luxeGold/10 border border-luxeGold/30 flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-luxeGold text-sm" />
              </div>
              <div>
                <p className="text-xs text-slateGray uppercase tracking-wide">Email</p>
                <p className="text-pearlWhite text-sm">hello@driveluxe.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-luxeGold/10 border border-luxeGold/30 flex items-center justify-center flex-shrink-0">
                <FaWhatsapp className="text-luxeGold text-sm" />
              </div>
              <div>
                <p className="text-xs text-slateGray uppercase tracking-wide">WhatsApp</p>
                <p className="text-pearlWhite text-sm">Available on request</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-luxeGold/10 border border-luxeGold/30 flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-luxeGold text-sm" />
              </div>
              <div>
                <p className="text-xs text-slateGray uppercase tracking-wide">Location</p>
                <p className="text-pearlWhite text-sm">Available across major cities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-[#1a1a1a] border border-slateGray/20 rounded-2xl p-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-8"
            >
              <div className="text-5xl mb-4">✉️</div>
              <h3 className="text-xl font-bold text-pearlWhite mb-2">Message Sent!</h3>
              <p className="text-slateGray text-sm">
                Thanks for reaching out, {form.name.split(" ")[0]}. We'll get back to you soon.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-6 text-luxeGold text-sm underline hover:opacity-80 transition"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#222A36] border border-slateGray/40 rounded-xl text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition text-sm"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#222A36] border border-slateGray/40 rounded-xl text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition text-sm"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#222A36] border border-slateGray/40 rounded-xl text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition text-sm"
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your message..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#222A36] border border-slateGray/40 rounded-xl text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold transition text-sm resize-none"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-luxeGold text-midnight font-semibold py-3 rounded-full hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;