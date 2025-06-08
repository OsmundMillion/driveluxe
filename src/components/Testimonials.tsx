const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "This service was incredible! The process was so easy, and the car was perfect for my trip. I'll definitely be renting again.",
      name: "Olivia Brown",
      role: "Customer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      quote:
        "The team was super helpful, and they guided me through the process step by step. I felt very well taken care of. Highly recommend!",
      name: "Emily Martin",
      role: "Customer",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      quote:
        "From booking to returning the car, everything went smoothly. The car was in great condition, and I had a fantastic experience overall.",
      name: "Dan Martin",
      role: "Customer",
      avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    },
  ];

  return (
    <section className="py-12 bg-midnight text-white">
      <div className="flex justify-center mb-6">
        <div className="w-1 h-12 bg-luxeGold"></div>
      </div>
      <p className="text-center text-champagne uppercase mb-2 tracking-widest">
        TESTIMONIALS
      </p>
      <h2 className="text-4xl font-semibold text-center text-white mb-8">
        <span className="text-white">What Clients</span>{" "}
        <span className="text-white">Say</span>
      </h2>

      <div className="flex flex-col sm:flex-row justify-center items-start sm:space-x-6 space-y-6 sm:space-y-0 px-4">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="relative bg-[#292929] rounded-2xl w-full sm:w-80 p-6"
          >
            <div className="absolute top-0 right-6 -mt-4 w-12 h-12 bg-midnight rounded-full"></div>
            <div className="absolute bottom-0 left-6 -mb-6 w-16 h-16 bg-midnight rounded-full"></div>

            <div className="mb-4 text-4xl text-luxeGold">
              <i className="fas fa-quote-left"></i>
            </div>
            <p className="text-[#919191] leading-relaxed">{testimonial.quote}</p>

            <div className="absolute top-12 right-6 flex space-x-1">
              {[...Array(5)].map((_, starIdx) => (
                <i
                  key={starIdx}
                  className="fas fa-star text-luxeGold"
                ></i>
              ))}
            </div>

            <div className="flex items-center mt-8">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full border-2 border-[#292929] object-cover z-10"
              />
              <div className="ml-4 text-left">
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-[#919191] text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
