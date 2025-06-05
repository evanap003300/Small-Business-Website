import React, { useState, useEffect, useRef } from 'react';
import { Star, Truck, Trash2, Droplets, Package, Wrench, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import before_img from './images/before.webp'
import after_img from './images/after.webp'


const ServiceWebsite = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    description: '',
    budget: '',
    location: ''
  });

  // Animation state
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

  // Initialize Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('[data-animate]');
    animatableElements.forEach(el => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Animation classes
  const getAnimationClass = (elementId, animationType = 'fade-up') => {
    const isVisible = visibleElements.has(elementId);
    const baseClasses = 'transition-all duration-700 ease-out';
    
    switch (animationType) {
      case 'fade-up':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
      case 'fade-left':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`;
      case 'fade-right':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`;
      case 'fade-in':
        return `${baseClasses} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`;
      case 'slide-up':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`;
      default:
        return `${baseClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the data - you'll connect this to Formspree or similar
    console.log('Form submitted:', formData);
    alert('Thank you! We\'ll get back to you within 24 hours.');
    // Reset form
    setFormData({
      name: '', email: '', phone: '', service: '', description: '', budget: '', location: ''
    });
  };

  const services = [
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Pressure Washing",
      description: "Professional cleaning for driveways, decks, siding, and more. We bring the power to restore your surfaces.",
      featured: true
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Furniture Moving",
      description: "Safe and reliable moving services for furniture and household items. Local moves made easy."
    },
    {
      icon: <Trash2 className="w-8 h-8" />,
      title: "Junk Removal",
      description: "Clear out unwanted items quickly and responsibly. We handle the heavy lifting and disposal."
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Yard Debris Removal",
      description: "Cleanup after storms, tree trimming, or seasonal yard work. We'll haul it all away."
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Small Deliveries",
      description: "Need something picked up or delivered locally? We've got you covered with our reliable service."
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Odd Jobs & Custom Requests",
      description: "Got a unique project? We're flexible and ready to tackle whatever you need done."
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Bryce did an amazing job pressure washing our deck and driveway. Looks brand new!",
      rating: 5
    },
    {
      name: "Mike R.",
      text: "Quick, reliable, and fair pricing. Helped us move our furniture without any hassle.",
      rating: 5
    },
    {
      name: "Jennifer L.",
      text: "Cleaned up all our yard debris after the storm. Professional and thorough work.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ width: '100vw', overflowX: 'hidden' }}>
      {/* Header */}
      <header className="bg-white shadow-sm style={{ width: '100%' }}">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Truck className="w-8 h-8 text-blue-600" />
              <h1 className="text-1xl font-bold text-gray-800 pl-4">Bryce's Services</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#services" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                Services
              </a>
              <a href="#contact" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20" style={{ width: '100%' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="hero-content"
            data-animate
            className={`text-center ${getAnimationClass('hero-content', 'fade-up')}`}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Local Services Done Right
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Pressure washing, moving, cleanup, and more. Quality work you can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                Get Free Quote
              </a>
             <a href="#contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Service - Pressure Washing */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div 
              id="pressure-washing-text"
              data-animate
              className={getAnimationClass('pressure-washing-text', 'fade-right')}
            >
              <div className="flex items-center mb-4">
                <Droplets className="w-10 h-10 text-blue-600 mr-3" />
                <h3 className="text-3xl font-bold text-gray-900">Pressure Washing Specialists</h3>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Transform your property with our professional pressure washing services. We clean driveways, decks, siding, fences, and more with commercial-grade equipment and eco-friendly solutions.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Driveways & Walkways</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">House Siding</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Decks & Patios</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Fences & More</span>
                </div>
              </div>
            </div>
            <div 
              id="pressure-washing-image"
              data-animate
              className={`bg-gray-200 rounded-lg h-64 md:h-96 flex items-center justify-center ${getAnimationClass('pressure-washing-image', 'fade-left')}`}
            >
              <div className="text-center text-gray-500">
                <Droplets className="w-16 h-16 mx-auto mb-4" />
                <p>Before/After Photos Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="services-header"
            data-animate
            className={`text-center mb-12 ${getAnimationClass('services-header', 'fade-up')}`}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">All Our Services</h3>
            <p className="text-lg text-gray-600">Professional, reliable service for all your local needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                id={`service-${index}`}
                data-animate
                className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${service.featured ? 'ring-2 ring-blue-500' : ''} ${getAnimationClass(`service-${index}`, 'slide-up')}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-blue-600 mb-4">
                  {service.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
                {service.featured && (
                  <div className="mt-4">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                      Most Popular
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="testimonials-header"
            data-animate
            className={`text-center mb-12 ${getAnimationClass('testimonials-header', 'fade-up')}`}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                id={`testimonial-${index}`}
                data-animate
                className={`bg-gray-50 p-6 rounded-lg transform hover:scale-105 transition-all duration-300 ${getAnimationClass(`testimonial-${index}`, 'fade-up')}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 bg-blue-600 text-white" style={{ width: '100%' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="contact-header"
            data-animate
            className={`text-center mb-12 ${getAnimationClass('contact-header', 'fade-up')}`}
          >
            <h3 className="text-3xl font-bold mb-4">Get Your Free Quote</h3>
            <p className="text-xl text-blue-100">Tell us about your project and your budget - we'll make it work!</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div 
              id="contact-form"
              data-animate
              className={`bg-white rounded-lg p-8 text-gray-900 ${getAnimationClass('contact-form', 'fade-right')}`}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Needed</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="">Select a service...</option>
                    <option value="pressure-washing">Pressure Washing</option>
                    <option value="furniture-moving">Furniture Moving</option>
                    <option value="junk-removal">Junk Removal</option>
                    <option value="yard-debris">Yard Debris Removal</option>
                    <option value="small-deliveries">Small Deliveries</option>
                    <option value="odd-jobs">Odd Jobs / Custom Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City or neighborhood"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Budget</label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="What are you looking to spend?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold transform hover:scale-105"
                >
                  Send My Request
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div 
              id="contact-info"
              data-animate
              className={`space-y-8 ${getAnimationClass('contact-info', 'fade-left')}`}
            >
              <div>
                <h4 className="text-2xl font-bold mb-6">Get In Touch</h4>
                <div className="space-y-4">
                  <div className="flex items-center transform hover:translate-x-2 transition-transform">
                    <Mail className="w-6 h-6 mr-3" />
                    <span className="text-blue-100">
                      brycebroomeinquiries@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center transform hover:translate-x-2 transition-transform">
                    <Phone className="w-6 h-6 mr-3" />
                  <span className="text-blue-100">
                    Call for immediate response
                  </span>
                  </div>
                  <div className="flex items-center transform hover:translate-x-2 transition-transform">
                    <MapPin className="w-6 h-6 mr-3" />
                    <span className="text-blue-100">Locally owned & operated</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-700 rounded-lg p-6 transform hover:scale-105 transition-transform">
                <h5 className="font-bold text-lg mb-3">Why Choose Us?</h5>
                <ul className="space-y-2 text-blue-100 text-sm">
                  <li>• Licensed and insured</li>
                  <li>• Same-day quotes available</li>
                  <li>• Flexible scheduling</li>
                  <li>• Fair, transparent pricing</li>
                  <li>• 100% satisfaction guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Truck className="w-6 h-6" />
              <span className="text-lg font-semibold">Bryce's Services</span>
            </div>
            <p className="text-gray-400 text-sm">
              Professional local services you can trust. Licensed, insured, and ready to help.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-gray-500 text-xs">
                © 2025 Bryce's Services. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServiceWebsite;
