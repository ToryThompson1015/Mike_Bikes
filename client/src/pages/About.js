import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 120px 0 80px;
  background: #ffffff;
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #1a1a1a 0%, #1976d2 100%);
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
    max-width: 600px;
    margin: 0 auto;
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const AboutText = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: #1a1a1a;
  }
  
  p {
    font-size: 1.1rem;
    color: #666666;
    line-height: 1.8;
    margin-bottom: 20px;
  }
  
  .highlight {
    color: #1976d2;
    font-weight: 600;
  }
`;

const AboutImage = styled.div`
  background: url('https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80') center/cover;
  height: 400px;
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
`;

const StatsSection = styled.div`
  background: #f8f9fa;
  padding: 80px 0;
  margin: 80px 0;
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
    color: #1976d2;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 1.1rem;
    color: #666666;
    font-weight: 500;
  }
`;

const ValuesSection = styled.div`
  margin-top: 80px;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 60px;
`;

const ValueCard = styled(motion.div)`
  text-align: center;
  padding: 40px 20px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #1a1a1a;
  }
  
  p {
    color: #666666;
    line-height: 1.6;
  }
`;

const CTASection = styled.div`
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  padding: 80px 0;
  margin: 80px 0;
  text-align: center;
  color: #ffffff;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  background: #ffffff;
  color: #1976d2;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 16px;
  margin: 10px;
  
  &:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const About = () => {
  const stats = [
    { number: "500+", label: "Students Taught in Atlanta" },
    { number: "15+", label: "Years Experience" },
    { number: "100%", label: "Safety Record" },
    { number: "100mi", label: "Service Radius" }
  ];

  const values = [
    {
      icon: "🛡️",
      title: "Safety First",
      description: "Your safety is our top priority. We follow strict safety protocols and use only the best equipment."
    },
    {
      icon: "🎯",
      title: "Expert Instruction",
      description: "Our certified instructors have years of experience and are passionate about teaching safe riding."
    },
    {
      icon: "🤝",
      title: "Personalized Approach",
      description: "Every student is unique. We tailor our lessons to your learning style and experience level."
    },
    {
      icon: "⚡",
      title: "Reliable Service",
      description: "When you need transportation, we're there. Fast, reliable pickup and delivery services throughout Atlanta."
    }
  ];

  return (
    <AboutSection>
      <AboutContent>
        <AboutHeader>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Mike's Bikes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're passionate about motorcycles and committed to helping riders of all levels master the road safely and confidently in Atlanta and beyond.
          </motion.p>
        </AboutHeader>

        <AboutGrid>
          <AboutText>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Story
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Founded in 2008, Mike's Bikes began with a simple mission: to make motorcycle riding accessible, safe, and enjoyable for everyone in <span className="highlight">Atlanta</span>. What started as a small local business has grown into a trusted name in motorcycle education and transportation services throughout the region.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Our team of certified instructors brings decades of combined experience in motorcycle safety, training, and road skills. We've helped hundreds of students achieve their riding goals, from first-time riders to experienced motorcyclists looking to improve their skills in the Atlanta area.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Beyond lessons, our transportation services ensure that when you need reliable pickup or delivery for your motorcycle throughout Atlanta and within our 100-mile service radius, we're there. Whether it's an emergency situation or planned transport, our professional team handles your bike with the care it deserves.
            </motion.p>
          </AboutText>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AboutImage />
          </motion.div>
        </AboutGrid>

        <StatsSection>
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
        </StatsSection>

        <ValuesSection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Our Values</h2>
            <p style={{ textAlign: 'center', color: '#666666', fontSize: '1.1rem' }}>
              The principles that guide everything we do
            </p>
          </motion.div>
          
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ValuesSection>

        <CTASection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>Ready to Get Started?</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: 0.9 }}>
              Join hundreds of satisfied riders in Atlanta who trust Mike's Bikes
            </p>
            <CTAButton to="/book">Book Your Lesson</CTAButton>
            <CTAButton to="/transportation">Transportation Services</CTAButton>
          </motion.div>
        </CTASection>
      </AboutContent>
    </AboutSection>
  );
};

export default About; 