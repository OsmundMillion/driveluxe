import { FaCar, FaPhoneAlt, FaKey } from "react-icons/fa";

const steps = [
  {
    icon: <FaCar size={40} />,
    title: "Choose A Car",
    description:
      "View our range of cars, find your perfect car for the coming days.",
  },
  {
    icon: <FaPhoneAlt size={40} />,
    title: "Come In Contact",
    description:
      "Our advisor team is ready to help you with the booking process or any questions.",
  },
  {
    icon: <FaKey size={40} />,
    title: "Enjoy Driving",
    description:
      "Receive the key and enjoy your car. We treat all our cars with respect.",
  },
];

const RentalProcess = () => {
  return (
    <section className="py-12 bg-midnight text-white">
      <p className="text-center text-champagne uppercase mb-4 tracking-widest">
        STEPS
      </p>
      <h2 className="text-4xl font-semibold text-center text-white mb-8">
        <span className="text-white">Car Rental</span>{" "}
        <span className="text-luxeGold">Process</span>
      </h2>
      <div className="container mx-auto flex flex-col sm:flex-row flex-wrap justify-center gap-6 px-4">
        {steps.map((step) => (
          <div
            key={step.title}
            className="bg-[#292929] p-6 rounded-2xl w-full sm:w-72 text-center"
          >
            <div className="text-luxeGold mb-4 flex justify-center">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
            <p className="text-[#919191]">{step.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-[#919191] text-center text-sm px-4">
        If you've never rented a car before, we'll guide you through the process.
      </p>
    </section>
  );
};

export default RentalProcess;