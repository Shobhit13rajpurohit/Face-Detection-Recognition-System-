import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Brain, Camera, Database, HelpCircle, Mail, Menu, X } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Help from './pages/Help';
import Contact from './pages/Contact';
import DataStore from './pages/DataStore';

function App() {
  const [navOpen, setNavOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Camera className="w-5 h-5" /> },
    { path: '/data-store', label: 'Data Store', icon: <Database className="w-5 h-5" /> },
    { path: '/about', label: 'About', icon: <Brain className="w-5 h-5" /> },
    { path: '/help', label: 'Help', icon: <HelpCircle className="w-5 h-5" /> },
    { path: '/contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
  ];

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-gray-100 bg-matrix">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
        <div className="relative flex flex-col md:flex-row">
          {/* Mobile menu button */}
          <button 
            className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-cyan-400"
            onClick={toggleNav}
          >
            {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          {/* Responsive Navbar */}
          <div className={`${navOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 fixed md:static top-0 left-0 z-40 h-full`}>
            <Navbar items={navItems} />
          </div>
          
          {/* Backdrop for mobile navigation */}
          {navOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setNavOpen(false)}
            />
          )}
          
          <main className="flex-1 p-4 md:p-6 lg:p-8 pt-16 md:pt-6 lg:pt-8">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/data-store" element={<DataStore />} />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<Help />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;