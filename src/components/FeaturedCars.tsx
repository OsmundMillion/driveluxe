import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FeaturedCars = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const cars = [
    { id: 1, name: "Lamborghini Huracan", price: "$500/day", image: "https://images.unsplash.com/photo-1612825173281-9a193378527e?q=80&w=2599&auto=format&fit=crop" },
    { id: 2, name: "Ferrari 488", price: "$650/day", image: "https://images.unsplash.com/photo-1597687228894-111db66403b6?q=80&w=2592&auto=format&fit=crop" },
    { id: 3, name: "Porsche 911", price: "$400/day", image: "https://images.unsplash.com/photo-1619844175408-c05947985e2d?q=80&w=2565&auto=format&fit=crop" },
    { id: 4, name: "Aston Martin DBX", price: "$500/day", image: "https://images.unsplash.com/photo-1618486613525-c694bf152b2c?q=80&w=2670&auto=format&fit=crop" },
    { id: 5, name: "Lamborghini Urus", price: "$750/day", image: "https://images.unsplash.com/photo-1630091883707-14038de8b8bd?q=80&w=2776&auto=format&fit=crop" },
    { id: 6, name: "Range Rover Sport", price: "$600/day", image: "https://images.unsplash.com/photo-1712055997104-4098783003fd?q=80&w=2670&auto=format&fit=crop" },
    { id: 7, name: "Tesla Model X", price: "$700/day", image: "https://images.unsplash.com/photo-1652509197980-9f3d9ac7916e?q=80&w=2565&auto=format&fit=crop" },
    { id: 8, name: "Maserati Levante", price: "$650/day", image: "https://images.unsplash.com/photo-1688744348032-d5a227040730?q=80&w=2755&auto=format&fit=crop" },
    { id: 9, name: "BMW X6", price: "$600/day", image: "https://images.unsplash.com/photo-1676409429433-503d95c21ac4?q=80&w=2670&auto=format&fit=crop" },
    { id: 10, name: "Jaguar F-PACE", price: "$600/day", image: "https://images.unsplash.com/photo-1718781457056-f3eea66776b0?q=80&w=2670&auto=format&fit=crop" }
  ];

  const slidesPerView = 3;
  const maxSlide = Math.ceil(cars.length / slidesPerView) - 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="w-screen overflow-hidden bg-midnight text-white py-16">
      <div className="flex justify-center mb-6">
        <div className="w-1 h-12 bg-luxeGold"></div>
      </div>
      <p className="text-center text-champagne uppercase mb-2 tracking-widest">WHAT WE OFFER</p>
      <h2 className="text-4xl font-heading font-semibold text-center mb-10">
        <span className="text-white">Featured</span>{" "}
        <span className="text-luxeGold">Cars</span>
      </h2>

      <div className="relative w-screen flex items-center justify-center px-6">
        {/* Left arrow */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-0 text-white bg-white/10 backdrop-blur border border-luxeGold rounded-full p-4 m-2 hover:bg-luxeGold hover:text-midnight transition-all duration-300 z-10 disabled:opacity-30"
        >
          <FaArrowLeft size={20} />
        </button>

        {/* Carousel wrapper */}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${(cars.length / slidesPerView) * 100}%`,
              transform: `translateX(-${(100 / (cars.length / slidesPerView)) * currentSlide}%)`,
            }}
          >
            {cars.map((car) => (
              <div key={car.id} className="w-[33.3333vw] px-2 shrink-0">
                <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:ring-1 hover:ring-luxeGold transition-transform duration-300 transform hover:scale-105">
                  <div className="overflow-hidden rounded-t-2xl aspect-[3/2]">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover transition-all duration-300 hover:opacity-85"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-heading font-semibold text-luxeGold hover:text-white transition-colors duration-300">
                      {car.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-300 font-light">{car.price}</p>
                    <button
                    onClick={() => navigate(`/cars/${car.id}`)}
                    className="mt-4 w-full py-2 bg-luxeGold text-midnight rounded-full hover:bg-champagne transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
                  >
                    View Details <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={nextSlide}
          disabled={currentSlide === maxSlide}
          className="absolute right-0 text-white bg-white/10 backdrop-blur border border-luxeGold rounded-full p-4 m-2 hover:bg-luxeGold hover:text-midnight transition-all duration-300 z-10 disabled:opacity-30"
        >
          <FaArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default FeaturedCars;
