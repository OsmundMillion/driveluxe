import React from 'react';
import siteImage from '../assets/Image_20250524171023.jpg';
import osmundPic from '../assets/Osmund Million Pic 1.png';

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold mb-6">About DriveLuxe</h1>

      {/* Hero Image and Description */}
      <div className="flex flex-col lg:flex-row items-center mb-12">
        <img
          src={siteImage}
          alt="DriveLuxe Overview"
          className="w-full lg:w-1/2 h-auto rounded-lg shadow mb-6 lg:mb-0 lg:mr-8"
        />
        <div className="lg:w-1/2 space-y-4">
          <p className="text-lg text-white">
            DriveLuxe is a premium car rental platform dedicated to providing
            our customers with an unparalleled experience. Founded on the
            principles of luxury, reliability, and exceptional customer service,
            we curate a fleet of high-end vehicles to meet the needs of both
            leisure and business travelers. Our platform ensures seamless
            booking, transparent pricing, and round-the-clock support to make
            every journey luxurious and worry-free.
          </p>
          <p className="text-lg text-white">
            At DriveLuxe, we believe in going beyond expectations. By combining
            state-of-the-art technology with personalized service, we aim to
            redefine the car rental experience. Whether you're looking to
            impress on a business trip or indulge in a weekend getaway, our
            selection of premium vehicles and dedicated support team make it
            possible.
          </p>
        </div>
      </div>

      {/* Founders Section */}
      <h2 className="text-3xl font-semibold mb-6">Our Founders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Osmund Million */}
        <div className="bg-[#292929] rounded-lg shadow p-6 flex flex-col items-center">
          <img
            src={osmundPic}
            alt="Osmund Million"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
          <h3 className="text-xl font-medium mb-2">Osmund Million</h3>
          <p className="text-white text-center">
            Co-founder &amp; CEO. Osmund brings over a decade of experience in
            hospitality and luxury services. His vision for DriveLuxe was to
            create a platform that seamlessly blends technology with
            personalized, high-end customer experiences.
          </p>
        </div>

        {/* Ndzalama Mathye */}
        <div className="bg-[#292929] rounded-lg shadow p-6 flex flex-col items-center">
          {/* Placeholder until local image is available */}
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
            <span className="text-2xl text-gray-400">N</span>
          </div>
          <h3 className="text-xl font-medium mb-2">Ndzalama Mathye</h3>
          <p className="text-white text-center">
            Co-founder &amp; CTO. Ndzalama is a technology enthusiast with a
            passion for building scalable systems. He leads the technical
            architecture at DriveLuxe, ensuring our platform remains
            innovative, reliable, and secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
