import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCheck,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMicrochip,
  faLaptopCode,
  faMobileAlt,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";

interface FormData {
  fullname: string;
  email: string;
  phone: string;
  message: string;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Animated component wrapper
const AnimatedSection = ({ children, className, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Add the AnimatedHamburger component
const AnimatedHamburger = ({ isOpen, onClick }) => {
  return (
    <div
      id="nav-icon1"
      className={`cursor-pointer w-[25px] h-[40px] relative ${
        isOpen ? "open" : ""
      }`}
      onClick={onClick}
    >
      <span
        className="block absolute h-[3px] w-full bg-[#1ec28b] rounded-[5px] opacity-100 left-0 transition-all duration-250 ease-in-out"
        style={{
          top: isOpen ? "25px" : "10px",
          transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
        }}
      ></span>
      <span
        className="block absolute h-[3px] w-full bg-[#1ec28b] rounded-[5px] opacity-100 left-0 transition-all duration-250 ease-in-out"
        style={{
          top: "18px",
          opacity: isOpen ? 0 : 1,
          left: isOpen ? "10px" : "0",
        }}
      ></span>
      <span
        className="block absolute h-[3px] w-full bg-[#1ec28b] rounded-[5px] opacity-100 left-0 transition-all duration-250 ease-in-out"
        style={{
          top: isOpen ? "20px" : "25px",
          transform: isOpen ? "rotate(-135deg)" : "rotate(0deg)",
        }}
      ></span>
    </div>
  );
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { fullname, email, phone, message } = formData;

    // Check required fields (fullname, email, message)
    if (!fullname.trim() || !email.trim() || !message.trim()) {
      setStatus("Please fill in all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    // Phone validation: must be exactly 10 digits
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      setStatus("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ fullname: "", email: "", phone: "", message: "" });
      } else {
        setStatus(data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Prevent hydration mismatch by only rendering FontAwesome icons client-side
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render animations until after hydration
  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>DRDOT Solutions - IoT, Web, Mobile & AI Services</title>
        <meta
          name="description"
          content="DRDOT Solutions provides innovative IoT infrastructure, web and mobile application design, and AI services for businesses."
        />
      </Head>

      <header className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center cursor-pointer group">
                <div className="relative w-20 h-16 mr-4 transition-all duration-300 group-hover:w-24 aspect-[4/3]">
                  <Image
                    src="/images/dr_logo.png"
                    alt="DRDOT Solutions Logo"
                    fill
                    sizes="(max-width: 768px) 500vw, (max-width: 1200px) 500vw, 200vw"
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 transition-all duration-300 group-hover:text-green-900">
                  DR<span className="text-green-900">DOT</span> Solutions
                </h1>
              </Link>
            </div>
          </div>
          <nav className="space-x-8 text-gray-600 font-medium hidden md:flex">
            <a
              href="#home"
              className="hover:text-blue-600 transition duration-300"
            >
              Home
            </a>
            <a
              href="#services"
              className="hover:text-blue-600 transition duration-300"
            >
              Services
            </a>
            <a
              href="#about"
              className="hover:text-blue-600 transition duration-300"
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:text-blue-600 transition duration-300"
            >
              Contact
            </a>
          </nav>
          <div className="md:hidden">
            <AnimatedHamburger isOpen={menuOpen} onClick={toggleMenu} />
          </div>
        </div>
        {/* Mobile Menu */}
        <motion.div
          className="md:hidden"
          initial={false}
          animate={menuOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, height: "auto" },
            closed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.3 }}
        >
          <nav className="bg-white shadow-lg">
            <div className="px-6 py-3 space-y-1">
              <a
                href="#home"
                className="block py-3 px-4 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#services"
                className="block py-3 px-4 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#about"
                className="block py-3 px-4 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="block py-3 px-4 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </nav>
        </motion.div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section
          id="home"
          className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-32 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
          <div className="container mx-auto px-8 relative">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-y-12 md:gap-x-20">
              <AnimatedSection className="md:w-1/2 mb-10 md:mb-0">
                <motion.h2
                  className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.68, -0.55, 0.27, 1.55],
                  }}
                >
                  Transforming Ideas into{" "}
                  <span className="text-blue-400 relative">
                    Digital Reality
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        delay: 0.2,
                        duration: 0.4,
                        ease: [0.68, -0.55, 0.27, 1.55],
                      }}
                    />
                  </span>
                </motion.h2>
                <motion.p
                  className="text-xl mb-8 text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1,
                    ease: [0.68, -0.55, 0.27, 1.55],
                  }}
                >
                  We specialize in building robust IoT infrastructure,
                  delivering top-notch web and mobile applications, and creating
                  intelligent AI solutions for your business.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2,
                    ease: [0.68, -0.55, 0.27, 1.55],
                  }}
                >
                  <a
                    href="#services"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 text-center transform hover:scale-105 hover:shadow-lg"
                  >
                    Explore Our Services
                  </a>
                  <a
                    href="#contact"
                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition duration-300 text-center transform hover:scale-105 hover:shadow-lg"
                  >
                    Get in Touch
                  </a>
                </motion.div>
              </AnimatedSection>
              <AnimatedSection className="md:w-1/2" delay={0.3}>
                <motion.div
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.68, -0.55, 0.27, 1.55],
                  }}
                >
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: "microchip", title: "IoT Solutions" },
                      { icon: "laptop-code", title: "Web Apps" },
                      { icon: "mobile-alt", title: "Mobile Apps" },
                      { icon: "robot", title: "AI Services" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        className="bg-white/20 p-6 rounded-lg text-center transform hover:scale-105 transition-all duration-300 cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.1 + index * 0.07,
                          ease: [0.68, -0.55, 0.27, 1.55],
                        }}
                        whileHover={{
                          scale: 1.12,
                          backgroundColor: "rgba(255, 255, 255, 0.3)",
                          boxShadow: "0 8px 32px 0 rgba(30,194,139,0.25)",
                        }}
                      >
                        <div className="text-4xl mb-2">
                          {isClient && (
                            <i className={`fas fa-${item.icon}`}></i>
                          )}
                        </div>
                        <h3 className="font-bold">{item.title}</h3>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                About DRDOT Solutions
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </AnimatedSection>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <AnimatedSection className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Team working"
                  className="rounded-lg shadow-xl"
                />
              </AnimatedSection>
              <AnimatedSection className="md:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Innovation at Our Core
                </h3>
                <p className="text-gray-600 mb-6">
                  At DRDOT Solutions, we believe in pushing the boundaries of
                  technology to create solutions that drive business growth and
                  innovation. Our team of experts combines creativity with
                  technical excellence to deliver exceptional results.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      {isClient && (
                        <i className="fas fa-check text-blue-600"></i>
                      )}
                    </div>
                    <span className="font-medium">Expert Team</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      {isClient && (
                        <i className="fas fa-check text-blue-600"></i>
                      )}
                    </div>
                    <span className="font-medium">Quality Assured</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      {isClient && (
                        <i className="fas fa-check text-blue-600"></i>
                      )}
                    </div>
                    <span className="font-medium">24/7 Support</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      {isClient && (
                        <i className="fas fa-check text-blue-600"></i>
                      )}
                    </div>
                    <span className="font-medium">Custom Solutions</span>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Learn More
                </a>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-20 bg-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
          <div className="container mx-auto px-6 max-w-6xl relative">
            <AnimatedSection className="text-center mb-16">
              <motion.h2
                className="text-3xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Our Services
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-blue-600 mx-auto"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
              <motion.p
                className="text-gray-600 mt-4 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                We offer a comprehensive range of technology services to help
                your business thrive in the digital age.
              </motion.p>
            </AnimatedSection>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                {
                  icon: faMicrochip,
                  title: "IoT Infrastructure",
                  description:
                    "Design and implementation of scalable and secure IoT infrastructure tailored to your business needs.",
                },
                {
                  icon: faLaptopCode,
                  title: "Web Application Design",
                  description:
                    "Creating modern, responsive, and user-friendly web applications that drive engagement and growth.",
                },
                {
                  icon: faMobileAlt,
                  title: "Mobile App Maintenance",
                  description:
                    "Reliable maintenance and support services to keep your mobile applications running smoothly.",
                },
                {
                  icon: faRobot,
                  title: "AI Agents & Services",
                  description:
                    "Building intelligent AI agents and providing cutting-edge AI services to automate and enhance your business operations.",
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.div
                    className="bg-blue-100 p-4 rounded-lg inline-block mb-6 group-hover:bg-blue-600 transition duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-blue-600 text-3xl group-hover:text-white transition duration-300">
                      <FontAwesomeIcon icon={service.icon} />
                    </div>
                  </motion.div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-900">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <motion.a
                    href="#contact"
                    className="text-blue-600 font-medium hover:text-blue-800 transition duration-300 flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    Learn More{" "}
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Contact Us
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Have a project in mind? Get in touch with us and let's discuss
                how we can help bring your ideas to life.
              </p>
            </AnimatedSection>
            <AnimatedSection className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-blue-900 p-8 text-white">
                  <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center mb-4">
                        <div>
                          <h4 className="font-semibold">Our Location</h4>
                          <p className="text-blue-100">Telangana, India</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <div>
                        <h4 className="font-semibold">Email Us</h4>
                        <p className="text-blue-100">
                          support@drdotsolutions.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>
                        <h4 className="font-semibold">Call Us</h4>
                        <p className="text-blue-100">+91 7981325861</p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex space-x-4 mt-8">
                    <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition duration-300">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition duration-300">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition duration-300">
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                    <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition duration-300">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </div> */}
                </div>
                <div className="md:w-2/3 p-8">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="fullname"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullname"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                        placeholder="8551234567"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                        isSubmitting
                          ? "opacity-75 cursor-not-allowed"
                          : "hover:bg-blue-700"
                      }`}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                  {status && (
                    <div
                      className={`mt-4 p-4 rounded-lg ${
                        status.includes("success")
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {status}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <footer className="bg-[#08192b] text-white py-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-white rounded-full p-2 shadow-lg mr-3 relative w-12 h-12">
                <Image
                  src="/images/dr_logo.png"
                  alt="DRDOT Solutions Logo"
                  fill
                  sizes="48px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span className="text-3xl font-extrabold text-[#1ec28b]">DR</span>
              <span className="text-3xl font-extrabold text-[#1ec28b] ml-1">
                DOT
              </span>
              <span className="text-3xl font-extrabold text-white ml-1">
                Solutions
              </span>
            </div>
            <p className="text-gray-200 mb-4">
              Transforming ideas into digital reality with innovative technology
              solutions.
            </p>
            {/* <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#1ec28b] hover:text-white transition"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="#"
                className="text-[#1ec28b] hover:text-white transition"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="#"
                className="text-[#1ec28b] hover:text-white transition"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a
                href="#"
                className="text-[#1ec28b] hover:text-white transition"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div> */}
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#1ec28b]">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-100 hover:text-[#1ec28b] transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-100 hover:text-[#1ec28b] transition"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-100 hover:text-[#1ec28b] transition"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-100 hover:text-[#1ec28b] transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#1ec28b]">
              Our Services
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-[#1ec28b] transition"
                >
                  IoT Infrastructure
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-[#1ec28b] transition"
                >
                  Web Application Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-[#1ec28b] transition"
                >
                  Mobile App Maintenance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-[#1ec28b] transition"
                >
                  AI Agents & Services
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#1ec28b]">
              Contact Info
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="mr-2 text-[#1ec28b]"
                />
                <span className="text-gray-100">Telangana, India</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mr-2 text-[#1ec28b]"
                />
                <span className="text-gray-100">
                  support@drdotsolutions.com
                </span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mr-2 text-[#1ec28b]"
                />
                <span className="text-gray-100">+91 7981325861</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#1ec28b]/30 mt-12 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} DRDOT Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
