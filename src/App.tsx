import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Brain, Camera, Database, HelpCircle, Mail } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Help from './pages/Help';
import Contact from './pages/Contact';
import DataStore from './pages/DataStore';

function App() {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Camera className="w-5 h-5" /> },
    { path: '/data-store', label: 'Data Store', icon: <Database className="w-5 h-5" /> },
    { path: '/about', label: 'About', icon: <Brain className="w-5 h-5" /> },
    { path: '/help', label: 'Help', icon: <HelpCircle className="w-5 h-5" /> },
    { path: '/contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-gray-100 bg-matrix">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
        <div className="relative flex">
          <Navbar items={navItems} />
          <main className="flex-1 p-8">
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