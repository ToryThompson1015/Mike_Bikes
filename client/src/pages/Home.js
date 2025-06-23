import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding-top: 80px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80') center/cover;
    opacity: 0.1;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroText = styled.div`
  h1 {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.1;
    background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  p {
    font-size: 1.2rem;
    color: #666666;
    margin-bottom: 30px;
    line-height: 1.6;
  }
  
  .highlight {
    color: #1976d2;
    font-weight: 600;
  }
`;

const HeroImage = styled.div`
  background: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80') center/cover;
  height: 500px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%);
    border-radius: 20px;
  }
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const CTASection = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  background: #1a1a1a;
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 16px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    background: #333333;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  &.secondary {
    background: transparent;
    color: #1a1a1a;
    border: 2px solid #1a1a1a;
  }
  
  &.secondary:hover {
    background: #1a1a1a;
    color: #ffffff;
  }
`;

const ServicesSection = styled.section`
  padding: 100px 0;
  background: #ffffff;
`;

const ServicesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 60px;
`;

const ServiceCard = styled(motion.div)`
  background: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1976d2, #42a5f5);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #1a1a1a;
  }
  
  p {
    color: #666666;
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  .price {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1976d2;
    margin-bottom: 20px;
  }
`;

const StatsSection = styled.section`
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  padding: 80px 0;
  color: #ffffff;
`;

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  text-align: center;
`;

const StatCard = styled(motion.div)`
  h3 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const Home = () => {
  const services = [
    {
      title: "Beginner Motorcycle Lessons",
      description: "Learn to ride safely with our certified instructors in Atlanta. Perfect for first-time riders looking to get their motorcycle license.",
      price: "Starting at $150",
      link: "/lessons"
    },
    {
      title: "Transportation & Pickup",
      description: "Professional motorcycle pickup and delivery services throughout Atlanta and within 100 miles. We handle everything from emergency pickups to long-distance transport.",
      price: "Starting at $75",
      link: "/transportation"
    },
    {
      title: "Advanced Training",
      description: "Take your riding skills to the next level with our advanced courses. Perfect for experienced riders in the Atlanta area.",
      price: "Starting at $220",
      link: "/lessons"
    }
  ];

  const stats = [
    { number: "500+", label: "Students Taught in Atlanta" },
    { number: "15+", label: "Years Experience" },
    { number: "100%", label: "Safety Record" },
    { number: "100mi", label: "Service Radius" }
  ];

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Master the Road in <span className="highlight">Atlanta</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Professional motorcycle lessons and transportation services serving Atlanta and within a 100-mile radius. Whether you're learning to ride or need reliable pickup service, we've got you covered.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <CTASection>
                <CTAButton to="/book">Book Your Lesson Now</CTAButton>
                <CTAButton to="/transportation" className="secondary">Transportation Services</CTAButton>
              </CTASection>
            </motion.div>
          </HeroText>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <HeroImage />
          </motion.div>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2.5rem' }}>Why Choose Mike's Bikes?</h2>
            <p style={{ textAlign: 'center', fontSize: '1.1rem', opacity: 0.9, marginBottom: '40px' }}>
              Trusted by Atlanta riders for over 15 years
            </p>
          </motion.div>
          
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </StatCard>
            ))}
          </StatsGrid>
        </div>
      </StatsSection>

      <ServicesSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Our Services</h2>
            <p style={{ textAlign: 'center', color: '#666666', fontSize: '1.1rem' }}>
              Choose from our range of professional motorcycle services in Atlanta
            </p>
          </motion.div>
          
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="price">{service.price}</div>
                <CTAButton to={service.link}>Learn More</CTAButton>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </div>
      </ServicesSection>
    </>
  );
};

export default Home; 