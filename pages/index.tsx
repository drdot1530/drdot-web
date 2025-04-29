import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
      ease: "easeOut"
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Animated component wrapper
const AnimatedSection = ({ children, className, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
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

// Animated service card
const ServiceCard = ({ icon, title, description }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
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
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 group"
    >
      <div className="bg-blue-100 p-4 rounded-lg inline-block mb-6 group-hover:bg-blue-600 transition duration-300">
        <div className="text-blue-600 text-3xl group-hover:text-white transition duration-300">
          {icon}
        </div>
      </div>
      <h4 className="text-xl font-semibold mb-3 text-gray-900">{title}</h4>
      <p className="text-gray-600 mb-6">{description}</p>
      <a href="#contact" className="text-blue-600 font-medium hover:text-blue-800 transition duration-300 flex items-center">
        Learn More <i className="fas fa-arrow-right ml-2"></i>
      </a>
    </motion.div>
  );
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('Message sent successfully!');
        setFormData({fullname: '', email: '', phone: '', message: ''});
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('Failed to send message.');
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
        <meta name="description" content="DRDOT Solutions provides innovative IoT infrastructure, web and mobile application design, and AI services for businesses." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <header className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="relative w-12 h-12 mr-3">
                <Image 
                  src="/images/dr_logo.jpeg" 
                  alt="DRDOT Solutions Logo" 
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">DR<span className="text-blue-600">DOT</span> Solutions</h1>
            </div>
          </div>
          <nav className="space-x-8 text-gray-600 font-medium hidden md:flex">
            <a href="#home" className="hover:text-blue-600 transition duration-300">Home</a>
            <a href="#services" className="hover:text-blue-600 transition duration-300">Services</a>
            <a href="#about" className="hover:text-blue-600 transition duration-300">About</a>
            <a href="#contact" className="hover:text-blue-600 transition duration-300">Contact</a>
          </nav>
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            {isClient && <i className="fas fa-bars fa-lg"></i>}
          </button>
        </div>
        {menuOpen && (
          <nav className="bg-white shadow-md md:hidden">
            <a href="#home" className="block px-6 py-3 border-b border-gray-200 hover:bg-blue-50">Home</a>
            <a href="#services" className="block px-6 py-3 border-b border-gray-200 hover:bg-blue-50">Services</a>
            <a href="#about" className="block px-6 py-3 border-b border-gray-200 hover:bg-blue-50">About</a>
            <a href="#contact" className="block px-6 py-3 hover:bg-blue-50">Contact</a>
          </nav>
        )}
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section id="home" className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <AnimatedSection className="md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                  Transforming Ideas into <span className="text-blue-400">Digital Reality</span>
                </h2>
                <p className="text-xl mb-8 text-gray-300">
                  We specialize in building robust IoT infrastructure, delivering top-notch web and mobile applications, and creating intelligent AI solutions for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#services" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 text-center">
                    Explore Our Services
                  </a>
                  <a href="#contact" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition duration-300 text-center">
                    Get in Touch
                  </a>
                </div>
              </AnimatedSection>
              <AnimatedSection className="md:w-1/2" delay={0.3}>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/20 p-6 rounded-lg text-center">
                      <div className="text-4xl mb-2">{isClient && <i className="fas fa-microchip"></i>}</div>
                      <h3 className="font-bold">IoT Solutions</h3>
                    </div>
                    <div className="bg-white/20 p-6 rounded-lg text-center">
                      <div className="text-4xl mb-2">{isClient && <i className="fas fa-laptop-code"></i>}</div>
                      <h3 className="font-bold">Web Apps</h3>
                    </div>
                    <div className="bg-white/20 p-6 rounded-lg text-center">
                      <div className="text-4xl mb-2">{isClient && <i className="fas fa-mobile-alt"></i>}</div>
                      <h3 className="font-bold">Mobile Apps</h3>
                    </div>
                    <div className="bg-white/20 p-6 rounded-lg text-center">
                      <div className="text-4xl mb-2">{isClient && <i className="fas fa-robot"></i>}</div>
                      <h3 className="font-bold">AI Services</h3>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">About DRDOT Solutions</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </AnimatedSection>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <AnimatedSection className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Team working" className="rounded-lg shadow-xl" />
              </AnimatedSection>
              <AnimatedSection className="md:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation at Our Core</h3>
                <p className="text-gray-600 mb-6">
                  At DRDOT Solutions, we believe in pushing the boundaries of technology to create solutions that drive business growth and innovation. Our team of experts combines creativity with technical excellence to deliver exceptional results.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      {isClient && <i className="fas fa-check text-blue-600"></i>}
                    </div>
                    <span className="font-medium">Expert Team</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      {isClient && <i className="fas fa-check text-blue-600"></i>}
                    </div>
                    <span className="font-medium">Quality Assured</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      {isClient && <i className="fas fa-check text-blue-600"></i>}
                    </div>
                    <span className="font-medium">24/7 Support</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      {isClient && <i className="fas fa-check text-blue-600"></i>}
                    </div>
                    <span className="font-medium">Custom Solutions</span>
                  </div>
                </div>
                <a href="#contact" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                  Learn More
                </a>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                We offer a comprehensive range of technology services to help your business thrive in the digital age.
              </p>
            </AnimatedSection>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <ServiceCard 
                icon={isClient && <i className="fas fa-microchip"></i>}
                title="IoT Infrastructure"
                description="Design and implementation of scalable and secure IoT infrastructure tailored to your business needs."
              />
              <ServiceCard 
                icon={isClient && <i className="fas fa-laptop-code"></i>}
                title="Web Application Design"
                description="Creating modern, responsive, and user-friendly web applications that drive engagement and growth."
              />
              <ServiceCard 
                icon={isClient && <i className="fas fa-mobile-alt"></i>}
                title="Mobile App Maintenance"
                description="Reliable maintenance and support services to keep your mobile applications running smoothly."
              />
              <ServiceCard 
                icon={isClient && <i className="fas fa-robot"></i>}
                title="AI Agents & Services"
                description="Building intelligent AI agents and providing cutting-edge AI services to automate and enhance your business operations."
              />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Have a project in mind? Get in touch with us and let's discuss how we can help bring your ideas to life.
              </p>
            </AnimatedSection>
            <AnimatedSection className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-blue-900 p-8 text-white">
                  <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-white/20 p-3 rounded-full mr-4">
                        {isClient && <i className="fas fa-map-marker-alt"></i>}
                      </div>
                      <div>
                        <h4 className="font-semibold">Our Location</h4>
                        <p className="text-blue-100">Telangana, India</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="bg-white/20 p-3 rounded-full mr-4">
                        {isClient && <i className="fas fa-envelope"></i>}
                      </div>
                      <div>
                        <h4 className="font-semibold">Email Us</h4>
                        <p className="text-blue-100">support@drdotsolutions.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-white/20 p-3 rounded-full mr-4">
                        {isClient && <i className="fas fa-phone"></i>}
                      </div>
                      <div>
                        <h4 className="font-semibold">Call Us</h4>
                        <p className="text-blue-100">+91 9014119507</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-8">
                    <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition duration-300">
                      {isClient && <i className="fab fa-facebook-f"></i>}
                    </a>
                    <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition duration-300">
                      {isClient && <i className="fab fa-twitter"></i>}
                    </a>
                    <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition duration-300">
                      {isClient && <i className="fab fa-linkedin-in"></i>}
                    </a>
                    <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition duration-300">
                      {isClient && <i className="fab fa-instagram"></i>}
                    </a>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullname" className="block text-gray-700 font-medium mb-2">Full Name</label>
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
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
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
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
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
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                  {status && (
                    <div className={`mt-4 p-4 rounded-lg ${status.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {status}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-3">
                  <Image 
                    src="/images/dr_logo.jpeg" 
                    alt="DRDOT Solutions Logo" 
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <h3 className="text-xl font-bold">DR<span className="text-blue-400">DOT</span> Solutions</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Transforming ideas into digital reality with innovative technology solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  {isClient && <i className="fab fa-facebook-f"></i>}
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  {isClient && <i className="fab fa-twitter"></i>}
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  {isClient && <i className="fab fa-linkedin-in"></i>}
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  {isClient && <i className="fab fa-instagram"></i>}
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">About</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition duration-300">Services</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">IoT Infrastructure</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Web Application Design</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Mobile App Maintenance</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">AI Agents & Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2 text-blue-400"></i>
                  <span className="text-gray-400">Telangana, India</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-2 text-blue-400"></i>
                  <span className="text-gray-400">support@drdotsolutions.com</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone mr-2 text-blue-400"></i>
                  <span className="text-gray-400">+91 9014119507</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} DRDOT Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
