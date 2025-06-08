import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface Car {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface ErrorState {
  name?: string;
  email?: string;
  reservationDate?: string;
  returnDate?: string;
}

const cars: Car[] = [
  {
    id: 1,
    name: "Lamborghini Huracan",
    price: "$500/day",
    image:
      "https://images.unsplash.com/photo-1612825173281-9a193378527e?q=80&w=2599&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Ferrari 488",
    price: "$650/day",
    image:
      "https://images.unsplash.com/photo-1597687228894-111db66403b6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Porsche 911",
    price: "$400/day",
    image:
      "https://images.unsplash.com/photo-1619844175408-c05947985e2d?q=80&w=2565&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Aston Martin DBX",
    price: "$500/day",
    image:
      "https://images.unsplash.com/photo-1618486613525-c694bf152b2c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "Lamborghini Urus",
    price: "$750/day",
    image:
      "https://images.unsplash.com/photo-1630091883707-14038de8b8bd?q=80&w=2776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    name: "Range Rover Sport",
    price: "$600/day",
    image:
      "https://images.unsplash.com/photo-1712055997104-4098783003fd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    name: "Tesla Model X",
    price: "$700/day",
    image:
      "https://images.unsplash.com/photo-1652509197980-9f3d9ac7916e?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    name: "Maserati Levante",
    price: "$650/day",
    image:
      "https://images.unsplash.com/photo-1688744348032-d5a227040730?q=80&w=2755&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 9,
    name: "BMW X6",
    price: "$600/day",
    image:
      "https://images.unsplash.com/photo-1676409429433-503d95c21ac4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Reservations: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<Car>(cars[0]);
  const [reservationDate, setReservationDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<ErrorState>({});

  const validateForm = (): ErrorState => {
    const newErrors: ErrorState = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Valid email is required";
    if (!reservationDate)
      newErrors.reservationDate = "Reservation date is required";
    if (!returnDate) newErrors.returnDate = "Return date is required";
    if (reservationDate && returnDate && returnDate < reservationDate)
      newErrors.returnDate = "Return date must be after reservation date";
    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    alert(`Reservation submitted for ${selectedCar.name}`);
    // Reset form (in a real app, call an API)
    setReservationDate("");
    setReturnDate("");
    setName("");
    setEmail("");
    setErrors({});
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Reserve Your Vehicle</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Car Selection */}
        <div className="lg:w-1/2 space-y-4">
          <h2 className="text-2xl font-medium">Select a Car</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cars.map((car) => (
              <div
                key={car.id}
                className={`border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition ${
                  selectedCar.id === car.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedCar(car)}
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p className="text-lg font-semibold">{car.name}</p>
                  <p className="text-gray-600">{car.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reservation Form */}
        <div className="lg:w-1/2 bg-[#292929] p-6 rounded-lg shadow">
          <h2 className="text-2xl font-medium mb-4">
            {selectedCar.name} Reservation
          </h2>
          <img
            src={selectedCar.image}
            alt={selectedCar.name}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <p className="text-gray-700 mb-4">{selectedCar.price}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                className={`w-full border rounded px-3 py-2 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                value={name}
                onChange={handleInputChange(setName)}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className={`w-full border rounded px-3 py-2 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                value={email}
                onChange={handleInputChange(setEmail)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Reservation Date</label>
              <input
                type="date"
                className={`w-full border rounded px-3 py-2 ${
                  errors.reservationDate ? "border-red-500" : "border-gray-300"
                }`}
                value={reservationDate}
                onChange={handleInputChange(setReservationDate)}
              />
              {errors.reservationDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reservationDate}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Return Date</label>
              <input
                type="date"
                className={`w-full border rounded px-3 py-2 ${
                  errors.returnDate ? "border-red-500" : "border-gray-300"
                }`}
                value={returnDate}
                onChange={handleInputChange(setReturnDate)}
              />
              {errors.returnDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.returnDate}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
