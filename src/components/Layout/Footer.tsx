import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart, Mail, Phone, MapPin, ArrowRight, FileText, Users, Shield, HelpCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = {
    Services: [
      { name: 'Analysis', path: '/analysis' },
      { name: 'Results', path: '/results' },
      { name: 'Research', path: '/research' },
      { name: 'Documentation', path: '/docs' },
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Team', path: '/team' },
      { name: 'Careers', path: '/careers' },
      { name: 'Contact', path: '/contact' },
    ],
    Resources: [
      { name: 'Blog', path: '/blog' },
      { name: 'Case Studies', path: '/case-studies' },
      { name: 'FAQs', path: '/faqs' },
      { name: 'Support', path: '/support' },
    ],
    Legal: [
      { name: 'Privacy', path: '/privacy' },
      { name: 'Terms', path: '/terms' },
      { name: 'Security', path: '/security' },
      { name: 'Compliance', path: '/compliance' },
    ],
  };

  return (
    <footer className="bg-gradient-to-b from-purple-50 via-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-12 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Medical AI Advances
            </h3>
            <p className="text-indigo-100 mb-6">
              Join our newsletter to receive the latest updates on AI in medical imaging
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border-2 border-transparent focus:border-purple-300 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              />
              <button className="px-6 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-2 font-semibold">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-12">
          {/* About Section */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CervicalScan AI
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Advancing healthcare through AI-powered cervical cancer detection. Supporting UN SDG 3 
              for better health outcomes and early detection capabilities worldwide.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-sm"
                >
                  <Icon className="w-5 h-5 text-indigo-600" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Sections */}
          {Object.entries(quickLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-gray-200">
          {[
            { icon: Mail, label: 'Email', value: 'contact@cervicalscan.ai', href: 'mailto:contact@cervicalscan.ai' },
            { icon: Phone, label: 'Phone', value: '+1 (234) 567-890', href: 'tel:+1234567890' },
            { icon: MapPin, label: 'Location', value: 'Medical Innovation Center, San Francisco' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <item.icon className="w-5 h-5 text-indigo-600 mt-1" />
              <div>
                <p className="text-gray-900 font-medium">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-gray-600 hover:text-indigo-600">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-600">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-center md:text-left">
              © {currentYear} CervicalScan AI. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-indigo-600">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Supporting UN SDG 3: Good Health and Well-being</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}