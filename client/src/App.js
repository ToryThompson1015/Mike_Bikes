import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import TransportationRequests from './pages/TransportationRequests';
import BeginnerLessons from './pages/BeginnerLessons';
import BookingForm from './components/BookingForm';

function App() {
  return (
    <div className="App">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/transportation" element={<TransportationRequests />} />
          <Route path="/lessons" element={<BeginnerLessons />} />
          <Route path="/book" element={<BookingForm />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  );
}

export default App; 