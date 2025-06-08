import { useParams, useNavigate } from "react-router-dom";
import { serviceData } from "../data/serviceData";
import { faqs } from "../data/faqData";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BackToTop from "../components/BackToTopButton";
import CallToAction from "../components/CallToAction";
import BrandStrip from "../components/BrandStrip";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = serviceData[id || "1"];
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <motion.div
      className="bg-midnight text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Banner */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url('${service?.image}')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="absolute inset-0 flex flex-col justify-center text-left pl-12 z-10">
          <p className="uppercase text-sm tracking-widest text-champagne mb-2">Services</p>
          <h1 className="text-5xl font-bold text-white">{service?.title}</h1>
        </div>

        {/* Floating All Services Card */}
        <motion.div
          className="absolute top-[83%] right-12 w-83 rounded-3xl overflow-hidden shadow-xl z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="bg-luxeGold text-black text-center font-bold text-xl py-4 rounded-t-3xl">
            All Services
          </div>
          <div className="bg-[#1e1e1e] px-6 py-6 space-y-4 rounded-b-3xl">
            {Object.entries(serviceData).map(([key, svc]) => (
              <button
                key={key}
                onClick={() => navigate(`/services/${key}`)}
                className={`w-full flex justify-between items-center px-5 py-4 rounded-xl transition-all duration-300 ${key === id ? "bg-luxeGold text-black" : "bg-[#121212] text-white hover:bg-[#2a2a2a]"}`}
              >
                <span>{svc.title}</span>
                <span className="text-lg">↗</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Description Section */}
      <motion.div
        className="max-w-5xl mx-auto px-6 py-12 space-y-12 text-left md:pr-[22rem]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">What We Offer</h2>
          <p className="text-[#aaaaaa] text-lg">{service?.description}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Included Features</h3>
          <ul className="space-y-4">
            {service?.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center">
                  <span className="text-luxeGold text-lg">✓</span>
                </div>
                <span className="text-[#cccccc] text-md">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-10">
          {service?.extraInfo.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold mb-2">{section.heading}</h3>
              <p className="text-[#cccccc]">{section.text}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-2xl bg-[#1a1a1a]">
              <button
                className={`w-full text-left px-6 py-4 flex justify-between items-center rounded-t-2xl transition-colors duration-300 text-sm sm:text-base ${activeFAQ === index ? "bg-luxeGold text-black font-semibold" : "text-white hover:bg-[#2a2a2a]"}`}
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
              >
                <span className="flex items-center gap-2"><strong>{index + 1}.</strong> {faq.question}</span>
                <span className="text-xl">{activeFAQ === index ? "˅" : ">"}</span>
              </button>
              {activeFAQ === index && (
                <div className="px-6 py-4 text-[#cccccc] text-sm">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Call To Action Section */}
      <CallToAction />

      {/* Brand Strip Section */}
      <BrandStrip />

      <BackToTop />
    </motion.div>
  );
};

export default ServiceDetails;
