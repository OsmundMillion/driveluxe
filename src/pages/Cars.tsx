import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface Car {
  id: number;
  name: string;
  price: string;
  image: string;
}

const initialCars: Car[] = [
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
];

const Cars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState<{ name: string; price: string; image: string }>({
    name: "",
    price: "",
    image: "",
  });
  const [errors, setErrors] = useState<{ name?: string; price?: string; image?: string }>({});

  const resetForm = () => {
    setSelectedCar(null);
    setFormData({ name: "", price: "", image: "" });
    setErrors({});
  };

  const validateForm = (): typeof errors => {
    const newErrors: { name?: string; price?: string; image?: string } = {};
    if (!formData.name.trim()) newErrors.name = "Car name is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    return newErrors;
  };

  const handleInputChange =
    (field: "name" | "price" | "image") => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (selectedCar) {
      // Edit mode
      setCars((prev) =>
        prev.map((car) =>
          car.id === selectedCar.id ? { ...car, ...formData } : car
        )
      );
    } else {
      // Add mode
      const newCar: Car = {
        id: cars.length ? Math.max(...cars.map((c) => c.id)) + 1 : 1,
        name: formData.name,
        price: formData.price,
        image: formData.image,
      };
      setCars((prev) => [...prev, newCar]);
    }
    resetForm();
  };

  const handleEdit = (car: Car) => {
    setSelectedCar(car);
    setFormData({ name: car.name, price: car.price, image: car.image });
    setErrors({});
  };

  const handleDelete = (id: number) => {
    setCars((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Manage Cars</h1>

      {/* Car List */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-[#292929] rounded-lg shadow">
          <thead>
            <tr className="text-left border-b">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-16 w-24 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{car.name}</td>
                <td className="px-4 py-2">{car.price}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(car)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(car.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Form */}
      <div className="bg-[#292929] p-6 rounded-lg shadow">
        <h2 className="text-2xl font-medium mb-4">
          {selectedCar ? "Edit Car" : "Add New Car"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Car Name</label>
            <input
              type="text"
              className={`w-full border rounded px-3 py-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.name}
              onChange={handleInputChange("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="text"
              className={`w-full border rounded px-3 py-2 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.price}
              onChange={handleInputChange("price")}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="text"
              className={`w-full border rounded px-3 py-2 ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.image}
              onChange={handleInputChange("image")}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              {selectedCar ? "Update Car" : "Add Car"}
            </button>
            {selectedCar && (
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cars;
