import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import axios from 'axios';
import GoogleMap from '../components/GoogleMap';

const TransportationSection = styled.section`
  padding: 120px 0 80px;
  background: #ffffff;
`;

const TransportationContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const TransportationHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
`;

const ServiceCard = styled(motion.div)`
  background: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #1a1a1a;
  }
  
  .price {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 20px;
  }
  
  .description {
    color: #666666;
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  .features {
    list-style: none;
    margin-bottom: 25px;
    
    li {
      color: #666666;
      margin-bottom: 8px;
      padding-left: 20px;
      position: relative;
      
      &:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #1a1a1a;
        font-weight: bold;
      }
    }
  }
`;

const BookButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #1a1a1a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333333;
    transform: translateY(-2px);
  }
`;

const MapSection = styled.div`
  margin: 80px 0;
  
  h2 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 2.5rem;
  }
`;

const MapContainer = styled.div`
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ServiceAreasSection = styled.div`
  background: #f8f9fa;
  padding: 80px 0;
  margin: 80px 0;
`;

const AreasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 60px;
`;

const AreaCard = styled(motion.div)`
  background: #ffffff;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: #1a1a1a;
  }
  
  p {
    color: #666666;
    margin-bottom: 10px;
  }
  
  .response-time {
    font-weight: 600;
    color: #1a1a1a;
  }
`;

const TransportationRequests = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await axios.get('/api/transportation/services');
        setServices(servicesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBookService = (serviceId) => {
    // Navigate to booking form with service pre-selected
    window.location.href = `/book?service=transportation&type=${serviceId}`;
  };

  if (loading) {
    return (
      <TransportationSection>
        <TransportationContent>
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <p>Loading services...</p>
          </div>
        </TransportationContent>
      </TransportationSection>
    );
  }

  return (
    <TransportationSection>
      <TransportationContent>
        <TransportationHeader>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Atlanta Transportation Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional motorcycle pickup and delivery services for Atlanta and within a 100-mile radius. We handle everything from emergency pickups to long-distance transport with care and reliability.
          </motion.p>
        </TransportationHeader>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3>{service.name}</h3>
              <div className="price">{service.price}</div>
              <p className="description">{service.description}</p>
              <ul className="features">
                {service.includes.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <BookButton onClick={() => handleBookService(service.id)}>
                Book This Service
              </BookButton>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <MapSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Atlanta Service Area
          </motion.h2>
          <MapContainer>
            <GoogleMap />
          </MapContainer>
        </MapSection>

        <ServiceAreasSection>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Coverage Area</h2>
              <p style={{ textAlign: 'center', color: '#666666', fontSize: '1.1rem' }}>
                We provide reliable service in Atlanta and all locations within a 100-mile radius.
              </p>
            </motion.div>
            
            <AreasGrid>
              <AreaCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3>Atlanta, GA</h3>
                <p>Full coverage within 100 miles of Atlanta</p>
                <p className="response-time">Typical Response Time: 1-2 hours</p>
              </AreaCard>
            </AreasGrid>
          </div>
        </ServiceAreasSection>
      </TransportationContent>
    </TransportationSection>
  );
};

export default TransportationRequests; 