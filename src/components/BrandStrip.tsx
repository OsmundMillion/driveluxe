const BrandStrip = () => {
  const logos = [
    [
      "https://www.svgrepo.com/show/303314/ferrari-emblem-1-logo.svg",
      "https://cdn.worldvectorlogo.com/logos/lamborghini.svg",
      "https://cdn.worldvectorlogo.com/logos/rolls-royce.svg",
      "https://cdn.worldvectorlogo.com/logos/porsche-2.svg",
      "https://www.carlogos.org/car-logos/maserati-logo-2020-640.png",
      "https://cdn.worldvectorlogo.com/logos/bmw-7.svg",
      "https://cdn.worldvectorlogo.com/logos/mercedes-benz-9.svg",
      "https://cdn.worldvectorlogo.com/logos/tesla-motors.svg",
      "https://cdn.worldvectorlogo.com/logos/land-rover-2.svg",
      "https://cdn.worldvectorlogo.com/logos/bentley-2.svg"
    ],
  ];

  return (
    <section className="bg-[#292929]">
      <div className="relative h-24 overflow-hidden">
        <div className="logos-track flex items-center h-full whitespace-nowrap">
          {logos[0].concat(logos[0]).map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Car brand ${idx}`}
              className="logo h-16 object-contain mx-8"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStrip;
