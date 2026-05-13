import { motion } from "framer-motion";
import osmundPic from "../assets/Osmund Million Pic 1.png";
import ndzalamaPic from "../assets/ndzalama.jpg";

const heroImage = "https://images.unsplash.com/photo-1735541855744-2c683e4690c8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const founders = [
  {
    name: "Osmund Million",
    role: "Co-founder & CEO",
    bio: "Osmund brings over a decade of experience in hospitality and luxury services. His vision for DriveLuxe was to create a platform that seamlessly blends technology with personalized, high-end customer experiences.",
    image: osmundPic,
  },
  {
    name: "Ndzalama Mathye",
    role: "Co-founder & CTO",
    bio: "Ndzalama is a technology enthusiast with a passion for building scalable systems. He leads the technical architecture at DriveLuxe, ensuring our platform remains innovative, reliable, and secure.",
    image: ndzalamaPic,
  },
];

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-midnight text-pearlWhite"
    >
      {/* Hero banner */}
      <div className="relative w-full h-[45vh] bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-4">
          <p className="uppercase text-sm tracking-widest text-champagne mb-2">Our Story</p>
          <h1 className="text-5xl font-bold">
            About <span className="text-luxeGold">DriveLuxe</span>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Mission */}
        <section className="space-y-4 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-champagne">Who We Are</h2>
          <p className="text-pearlWhite/80 leading-relaxed">
            DriveLuxe is a premium car rental platform dedicated to providing an unparalleled
            experience. Founded on the principles of luxury, reliability, and exceptional customer
            service, we curate a fleet of high-end vehicles to meet the needs of both leisure and
            business travelers.
          </p>
          <p className="text-pearlWhite/80 leading-relaxed">
            By combining state-of-the-art technology with personalized service, we aim to redefine
            the car rental experience — whether you're impressing on a business trip or indulging
            in a weekend getaway.
          </p>
        </section>

        {/* Founders */}
        <section>
          <h2 className="text-3xl font-semibold text-champagne text-center mb-10">Our Founders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {founders.map(({ name, role, bio, image }) => (
              <motion.div
                key={name}
                className="bg-[#1a1a1a] border border-slateGray/20 rounded-2xl p-8 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="w-28 h-28 object-cover rounded-full mb-4 border-2 border-luxeGold"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full mb-4 border-2 border-luxeGold bg-[#2a2a2a] flex items-center justify-center">
                    <span className="text-3xl font-bold text-luxeGold">{name[0]}</span>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-pearlWhite mb-1">{name}</h3>
                <p className="text-luxeGold text-sm mb-3">{role}</p>
                <p className="text-pearlWhite/70 text-sm leading-relaxed">{bio}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default About;