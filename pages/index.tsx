import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface FormData {
  fullname: string;
  email: string;
  phone: string;
  message: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

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

  return (
    <>
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">DRdot Solutions</h1>
          <nav className="space-x-6 text-gray-600 font-medium hidden md:flex">
            <a href="#home" className="hover:text-indigo-600 transition">Home</a>
            <a href="#services" className="hover:text-indigo-600 transition">Services</a>
            <a href="#contact" className="hover:text-indigo-600 transition">Contact</a>
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
            <a href="#home" className="block px-6 py-3 border-b border-gray-200 hover:bg-indigo-50">Home</a>
            <a href="#services" className="block px-6 py-3 border-b border-gray-200 hover:bg-indigo-50">Services</a>
            <a href="#contact" className="block px-6 py-3 hover:bg-indigo-50">Contact</a>
          </nav>
        )}
      </header>

      <main className="container mx-auto px-6 py-16" id="home">
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Innovative IoT Infrastructure & App Solutions</h2>
          <p className="text-lg text-gray-600 mb-8">
            At DRdot Solutions, we specialize in building robust IoT infrastructure and delivering top-notch web and mobile application design and maintenance services.
          </p>
          <a href="#services" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Explore Our Services
          </a>
        </section>
      </main>

      <section id="services" className="bg-white py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-indigo-600 text-4xl mb-4">
                {isClient && <i className="fas fa-microchip"></i>}
              </div>
              <h4 className="text-xl font-semibold mb-2">IoT Infrastructure</h4>
              <p className="text-gray-600">
                Design and implementation of scalable and secure IoT infrastructure tailored to your business needs.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-indigo-600 text-4xl mb-4">
                {isClient && <i className="fas fa-laptop-code"></i>}
              </div>
              <h4 className="text-xl font-semibold mb-2">Web Application Design</h4>
              <p className="text-gray-600">
                Creating modern, responsive, and user-friendly web applications that drive engagement and growth.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-indigo-600 text-4xl mb-4">
                {isClient && <i className="fas fa-mobile-alt"></i>}
              </div>
              <h4 className="text-xl font-semibold mb-2">Mobile App Maintenance</h4>
              <p className="text-gray-600">
                Reliable maintenance and support services to keep your mobile applications running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-gray-100 py-16 mt-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Contact Us</h3>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md" noValidate>
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-gray-700 font-semibold mb-2">Fullname</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
          {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
        </div>
      </section>

      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>© 2024 DRdot Solutions. All rights reserved.</p>
          <p className="mt-2">
            Contact us: <a href="mailto:info@drdotsolutions.com" className="text-indigo-600 hover:underline">info@drdotsolutions.com</a>
          </p>
        </div>
      </footer>
    </>
  );
}
