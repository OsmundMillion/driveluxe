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
      <div className="container mx-auto flex justify-center space-x-6">
        <div className="bg-[#292929] p-6 rounded-2xl w-72 text-center">
          <div className="text-5xl text-luxeGold mb-4">
            <i className="fas fa-car"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">Choose A Car</h3>
          <p className="text-[#919191]">
            View our range of cars, find your perfect car for the coming days.
          </p>
        </div>
        <div className="bg-[#292929] p-6 rounded-2xl w-72 text-center">
          <div className="text-5xl text-luxeGold mb-4">
            <i className="fas fa-phone-alt"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">Come In Contact</h3>
          <p className="text-[#919191]">
            Our advisor team is ready to help you with the booking process or any
            questions.
          </p>
        </div>
        <div className="bg-[#292929] p-6 rounded-2xl w-72 text-center">
          <div className="text-5xl text-luxeGold mb-4">
            <i className="fas fa-key"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">Enjoy Driving</h3>
          <p className="text-[#919191]">
            Receive the key and enjoy your car. We treat all our cars with respect.
          </p>
        </div>
      </div>
      <p className="mt-8 text-[#919191] text-center text-sm">
        If you've never rented a car before, we'll guide you through the process.
      </p>
    </section>
  );
};

export default RentalProcess;
