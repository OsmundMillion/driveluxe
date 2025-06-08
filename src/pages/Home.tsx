import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import FeaturedCars from "../components/FeaturedCars";
import BookingSection from "../components/BookingSection";
import RentalProcess from "../components/RentalProcess";
import Testimonials from "../components/Testimonials";
import BrandStrip from "../components/BrandStrip";
import BackToTopButton from "../components/BackToTopButton";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <FeaturedCars />
      <BookingSection />
      <RentalProcess />
      <Testimonials />
      <BrandStrip />
      <BackToTopButton />
    </div>
  );
};

export default Home;
