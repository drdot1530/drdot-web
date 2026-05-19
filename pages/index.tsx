import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCheck,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faArrowRight,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faNetworkWired,
  faCloud,
  faLaptopCode,
  faRobot,
  faCube,
  faMicrochip,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";

const SERVICES = [
  {
    icon: faNetworkWired,
    iconName: "network-wired",
    title: "IT Support & Networking",
    tag: "Infrastructure",
    description:
      "Proactive IT support, network setup, and troubleshooting to keep your systems secure and running smoothly.",
  },
  {
    icon: faCloud,
    iconName: "cloud",
    title: "Wi-Fi, Email & Cloud Solutions",
    tag: "Cloud",
    description:
      "Reliable Wi-Fi, professional email, and cloud platforms configured and managed for your team.",
  },
  {
    icon: faLaptopCode,
    iconName: "laptop-code",
    title: "Websites & Mobile Apps",
    tag: "Digital",
    description:
      "Modern, responsive websites and mobile applications built to engage customers and grow your business.",
  },
  {
    icon: faRobot,
    iconName: "robot",
    title: "Custom Software Development (AI)",
    tag: "AI & Software",
    description:
      "Tailored software and AI-powered solutions that automate workflows and solve unique business challenges.",
  },
  {
    icon: faCube,
    iconName: "cube",
    title: "3D & Enclosure Design",
    tag: "Hardware",
    description:
      "Custom 3D modeling and enclosure design for products, prototypes, and professional deployments.",
  },
  {
    icon: faMicrochip,
    iconName: "microchip",
    title: "Custom PCB Solutions",
    tag: "Electronics",
    description:
      "End-to-end PCB design, layout, and prototyping for dependable electronic products.",
  },
  {
    icon: faBullhorn,
    iconName: "bullhorn",
    title: "Growth Marketing and Branding",
    tag: "Growth",
    description:
      "Growth-focused strategy, digital campaigns, and online presence to connect with your audience and drive results.",
  },
];

function ServicesExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SERVICES[activeIndex];

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:min-h-[480px]">
      <motion.div
        className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:overflow-visible snap-x snap-mandatory lg:snap-none lg:w-[min(100%,380px)] shrink-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Services"
      >
        {SERVICES.map((service, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={service.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(index)}
              className={`snap-start shrink-0 lg:shrink flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all duration-300 border min-w-[200px] lg:min-w-0 lg:w-full ${
                isActive
                  ? "bg-brand-muted border-brand text-brand-foreground shadow-sm"
                  : "bg-surface border-gray-200 text-ink-muted hover:border-brand-subtle hover:bg-brand-muted/50"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base transition-colors ${
                  isActive
                    ? "bg-brand text-white"
                    : "bg-surface-muted text-ink shadow-sm"
                }`}
              >
                <FontAwesomeIcon icon={service.icon} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold leading-tight truncate lg:whitespace-normal">
                  {service.title}
                </span>
                <span
                  className={`block text-[10px] uppercase tracking-wider mt-0.5 ${
                    isActive ? "text-brand-light" : "text-ink-subtle"
                  }`}
                >
                  {service.tag}
                </span>
              </span>
            </button>
          );
        })}
      </motion.div>

      <div className="relative flex-1 min-h-[340px] lg:min-h-0 rounded-3xl overflow-hidden border border-gray-200 bg-surface shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            role="tabpanel"
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-surface p-8 md:p-10 flex flex-col justify-between text-ink"
          >
            <div
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-brand/10 blur-3xl"
              aria-hidden
            />
            <FontAwesomeIcon
              icon={active.icon}
              className="absolute top-6 right-6 md:top-8 md:right-8 text-[7rem] md:text-[9rem] text-brand/10 pointer-events-none"
              aria-hidden
            />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest bg-brand-muted text-brand-foreground rounded-full border border-brand-subtle mb-4">
                {active.tag}
              </span>
              <p className="text-ink-subtle text-sm font-semibold tabular-nums mb-1">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(SERVICES.length).padStart(2, "0")}
              </p>
            </div>

            <motion.div
              className="relative z-10 mt-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.3 }}
            >
              <h3 className="text-2xl md:text-3xl font-extrabold text-ink leading-tight tracking-tight mb-4 max-w-lg">
                {active.title}
              </h3>
              <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-xl">
                {active.description}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-surface-muted z-20"
          aria-hidden
        >
          <motion.div
            className="h-full bg-brand"
            initial={false}
            animate={{
              width: `${((activeIndex + 1) / SERVICES.length) * 100}%`,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
}

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
        className="block absolute h-[3px] w-full bg-brand rounded-[5px] opacity-100 left-0 transition-all duration-250 ease-in-out"
        style={{
          top: isOpen ? "25px" : "10px",
          transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
        }}
      ></span>
      <span
        className="block absolute h-[3px] w-full bg-brand rounded-[5px] opacity-100 left-0 transition-all duration-250 ease-in-out"
        style={{
          top: "18px",
          opacity: isOpen ? 0 : 1,
          left: isOpen ? "10px" : "0",
        }}
      ></span>
      <span
        className="block absolute h-[3px] w-full bg-brand rounded-[5px] opacity-100 left-0 transition-all duration-250 ease-in-out"
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
        <title>DRDOT Solutions - Complete Technology Solutions for Businesses</title>
        <meta
          name="description"
          content="DRDOT Solutions delivers IT support, cloud solutions, web and mobile apps, custom AI software, PCB design, 3D enclosures, and growth marketing for businesses."
        />
        <link rel="icon" href="/images/dr_logo.png" />
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
                <h1 className="text-2xl font-bold text-ink transition-all duration-300 group-hover:text-brand-darker">
                  DR<span className="text-brand-darker">DOT</span> Solutions
                </h1>
              </Link>
            </div>
          </div>
          <nav className="space-x-8 text-gray-600 font-medium hidden md:flex">
            <a
              href="#home"
              className="hover:text-brand transition duration-300"
            >
              Home
            </a>
            <a
              href="#services"
              className="hover:text-brand transition duration-300"
            >
              Services
            </a>
            <a
              href="#about"
              className="hover:text-brand transition duration-300"
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:text-brand transition duration-300"
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
                className="block py-3 px-4 rounded-lg hover:bg-brand-muted text-gray-600 hover:text-brand transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#services"
                className="block py-3 px-4 rounded-lg hover:bg-brand-muted text-gray-600 hover:text-brand transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#about"
                className="block py-3 px-4 rounded-lg hover:bg-brand-muted text-gray-600 hover:text-brand transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="block py-3 px-4 rounded-lg hover:bg-brand-muted text-gray-600 hover:text-brand transition duration-300"
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
          className="bg-surface text-ink py-24 md:py-32 relative overflow-hidden border-b border-gray-100"
        >
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-[0.04]"></div>
          <div className="container mx-auto px-8 relative">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-y-12 md:gap-x-20">
              <AnimatedSection className="md:w-1/2 mb-10 md:mb-0 px-4 py-6 sm:px-6 sm:py-8 md:px-8">
                <motion.h2
                  className="text-4xl md:text-5xl font-extrabold text-ink mb-10 md:mb-12 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.68, -0.55, 0.27, 1.55],
                  }}
                >
                  Transforming Ideas into{" "}
                  <span className="text-brand relative">
                    Digital Reality
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-1 bg-brand"
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
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-2 pb-2"
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
                    className="bg-brand text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-brand-dark transition duration-300 text-center transform hover:scale-105 hover:shadow-lg"
                  >
                    Explore Our Services
                  </a>
                  <a
                    href="#contact"
                    className="bg-transparent border-2 border-brand text-brand px-8 py-3.5 rounded-lg font-semibold hover:bg-brand-muted transition duration-300 text-center transform hover:scale-105 hover:shadow-lg"
                  >
                    Get in Touch
                  </a>
                </motion.div>
              </AnimatedSection>
              <AnimatedSection className="md:w-1/2" delay={0.3}>
                <motion.div
                  className="bg-brand-muted p-8 md:p-10 rounded-2xl shadow-sm border border-brand-subtle"
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15,
                    ease: [0.68, -0.55, 0.27, 1.55],
                  }}
                >
                  <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-4">
                    What we deliver
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-ink leading-tight mb-5">
                    Complete Technology Solutions for Businesses
                  </h3>
                  <p className="text-ink-muted text-lg leading-relaxed">
                    One partner for your entire technology stack
                    <br />
                  From day-to-day IT and cloud services to custom software,
                    product design, and growth marketing.
                  </p>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-surface">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-ink mb-4">
                About DRDOT Solutions
              </h2>
              <div className="w-24 h-1 bg-brand mx-auto"></div>
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
                <h3 className="text-2xl font-bold text-ink mb-4">
                  Innovation at Our Core
                </h3>
                <p className="text-gray-600 mb-6">
                  At DRDOT Solutions, we deliver complete technology solutions
                  for businesses — from IT support and cloud services to custom
                  software, hardware design, and growth marketing. Our team
                  combines creativity with technical excellence to help you
                  grow with confidence.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center">
                    <div className="bg-brand-muted p-3 rounded-full mr-4">
                      {isClient && (
                        <i className="fas fa-check text-brand"></i>
                      )}
                    </div>
                    <span className="font-medium">Expert Team</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-brand-muted p-3 rounded-full mr-4">
                      {isClient && (
                        <i className="fas fa-check text-brand"></i>
                      )}
                    </div>
                    <span className="font-medium">Quality Assured</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-brand-muted p-3 rounded-full mr-4">
                      {isClient && (
                        <i className="fas fa-check text-brand"></i>
                      )}
                    </div>
                    <span className="font-medium">24/7 Support</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-brand-muted p-3 rounded-full mr-4">
                      {isClient && (
                        <i className="fas fa-check text-brand"></i>
                      )}
                    </div>
                    <span className="font-medium">Custom Solutions</span>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="inline-block bg-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition duration-300"
                >
                  Learn More
                </a>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Services Section — interactive explorer */}
        <section id="services" className="py-20 bg-surface">
          <div className="container mx-auto px-6 max-w-6xl">
            <AnimatedSection className="text-center mb-14 md:mb-16">
              <motion.span
                className="inline-block px-4 py-1.5 mb-5 text-xs font-semibold tracking-widest uppercase text-brand-foreground bg-brand-muted border border-brand-subtle rounded-full"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                What we offer
              </motion.span>
              <motion.h2
                className="text-3xl md:text-4xl font-extrabold text-ink mb-4 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our Services
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                viewport={{ once: true }}
              >
                Complete Technology Solutions for Businesses
              </motion.p>
            </AnimatedSection>

            <AnimatedSection className="">
              <ServicesExplorer />
            </AnimatedSection>

            <motion.div
              className="mt-12 md:mt-14 text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 mb-5">
                Not sure which service fits your needs?
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                Talk to our team
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Products Section (Modern, Concise Feature Block) */}
        <section
          id="products"
          className="py-20 bg-surface relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
          <div className="container mx-auto px-6 max-w-5xl relative">
            <AnimatedSection className="text-center mb-16">
              <motion.h2
                className="text-3xl font-bold text-ink mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Our Flagship Product
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-brand mx-auto"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
              <motion.p
                className="text-gray-600 mt-4 max-w-5xl mx-auto text-center text-sm md:text-base lg:whitespace-nowrap px-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                A smart restaurant ordering platform that connects guests, staff, and kitchen in one seamless experience.
              </motion.p>
            </AnimatedSection>

            {/* NxtBite Product Feature Block */}
            <motion.div
              className="bg-white px-8 py-8 md:px-14 md:py-10 rounded-xl shadow-2xl border-t-4 border-brand flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="max-w-2xl mx-auto flex flex-col items-center gap-5 px-4 sm:px-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src="/images/nxtbite_logo.jpeg"
                  alt="NxtBite Logo"
                  className="w-64 md:w-72 h-auto object-contain mx-auto px-2 py-1"
                />
                <h3 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight leading-tight px-4 py-2">
                  Smart Restaurant Ordering,{" "}
                  <span className="text-brand-foreground">Reimagined</span>
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed px-4 py-2">
                  <strong className="text-ink">NxtBite</strong> unifies
                  QR ordering, live order tracking, and kitchen coordination with
                  analytics, loyalty rewards, and guest engagement — one platform
                  for your team and your customers.
                </p>
                <motion.a
                  href="https://nxtbite.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-1 px-10 py-3 bg-brand text-white font-semibold text-lg rounded-full shadow-lg hover:bg-brand-dark transition duration-300 transform hover:scale-105"
                  whileHover={{ x: 3 }}
                >
                  Discover NxtBite
                  <FontAwesomeIcon icon={faArrowRight} className="ml-3" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-surface">
          <div className="container mx-auto px-6 max-w-4xl">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-ink mb-4">
                Contact Us
              </h2>
              <div className="w-24 h-1 bg-brand mx-auto"></div>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Ideas await. Contact us to start turning your concepts into
                reality.
              </p>
            </AnimatedSection>
            <AnimatedSection className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-brand-muted p-8 text-ink border-r border-gray-100">
                  <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
                  <div className="mb-6">
                    <div className="mb-4">
                      <h4 className="font-semibold">Australia</h4>
                      <p className="text-ink-muted">
                        20 Jasmine Grove, Officer, Vic, 3809
                      </p>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold">Email Us</h4>
                      <p className="text-ink-muted">
                        support@drdotsolutions.com
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Call Us</h4>
                      <p className="text-ink-muted">+61 452 547 143</p>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition duration-300"
                          placeholder="Your Name"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition duration-300"
                          placeholder="name@example.com"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition duration-300"
                        placeholder="mobile number"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition duration-300"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-brand text-white px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                        isSubmitting
                          ? "opacity-75 cursor-not-allowed"
                          : "hover:bg-brand-dark"
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

      <footer className="bg-surface-subtle text-ink border-t border-gray-200 py-12">
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
              <span className="text-3xl font-extrabold text-brand">DR</span>
              <span className="text-3xl font-extrabold text-brand ml-1">
                DOT
              </span>
              <span className="text-3xl font-extrabold text-ink ml-1">
                Solutions
              </span>
            </div>
            <p className="text-ink-muted mb-4">
              Transforming ideas into digital reality with innovative technology
              solutions.
            </p>
            {/* <div className="flex space-x-4">
              <a
                href="#"
                className="text-brand hover:text-brand-light transition"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="#"
                className="text-brand hover:text-brand-light transition"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="#"
                className="text-brand hover:text-brand-light transition"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a
                href="#"
                className="text-brand hover:text-brand-light transition"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div> */}
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-brand">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-ink-muted hover:text-brand transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-ink-muted hover:text-brand transition"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-ink-muted hover:text-brand transition"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-ink-muted hover:text-brand transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-brand">
              Our Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="text-ink-muted hover:text-brand transition"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-brand">
              Contact Info
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="mr-2 mt-1 text-brand shrink-0"
                />
                <span className="text-ink-muted">
                  20 Jasmine Grove, Officer, Vic, 3809
                </span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="mr-2 text-brand"
                />
                <span className="text-ink-muted">Telangana, India</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mr-2 text-brand"
                />
                <span className="text-ink-muted">
                  support@drdotsolutions.com
                </span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mr-2 text-brand"
                />
                <span className="text-ink-muted">+61 452 547 143</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-subtle mt-12 pt-8 text-center text-ink-subtle">
          <p>
            © {new Date().getFullYear()} DRDOT Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
