import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 60px 0 30px;
  margin-top: 80px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const FooterSection = styled.div`
  h3 {
    color: #ffffff;
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
  
  p, a {
    color: #cccccc;
    text-decoration: none;
    margin-bottom: 10px;
    display: block;
    transition: color 0.3s ease;
  }
  
  a:hover {
    color: #ffffff;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;

const SocialLink = styled.a`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: #333333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ffffff;
    color: #1a1a1a;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 0;
  border-top: 1px solid #333333;
  margin-top: 40px;
  text-align: center;
  color: #cccccc;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Mike's Bikes</h3>
          <p>Professional motorcycle lessons and transportation services in Atlanta. Your safety and satisfaction are our top priorities.</p>
          <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">f</SocialLink>
            <SocialLink href="#" aria-label="Twitter">t</SocialLink>
            <SocialLink href="#" aria-label="Instagram">i</SocialLink>
            <SocialLink href="#" aria-label="LinkedIn">in</SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <h3>Services</h3>
          <Link to="/lessons">Motorcycle Lessons</Link>
          <Link to="/transportation">Transportation</Link>
          <Link to="/book">Book Appointment</Link>
          <Link to="/about">About Us</Link>
        </FooterSection>
        
        <FooterSection>
          <h3>Contact</h3>
          <p>📍 Atlanta, GA & 100-mile radius</p>
          <p>📞 (267) 404-MIKE</p>
          <p>✉️ info@mikesbikes.com</p>
          <p>🕒 Mon-Fri: 8AM-6PM</p>
        </FooterSection>
        
        <FooterSection>
          <h3>Quick Links</h3>
          <Link to="/lessons">Beginner Lessons</Link>
          <Link to="/transportation">Pickup Service</Link>
          <Link to="/book">Schedule Appointment</Link>
          <Link to="/about">Our Story</Link>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; 2024 Mike's Bikes. All rights reserved. | Serving Atlanta and beyond with ❤️ for motorcycle enthusiasts</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 