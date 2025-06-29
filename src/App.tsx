import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import FloatingElements from './components/FloatingElements';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-emerald-900 relative overflow-hidden flex flex-col">
        <FloatingElements />
        <Navigation />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;