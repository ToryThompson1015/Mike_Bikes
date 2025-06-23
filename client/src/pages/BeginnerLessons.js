import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import axios from 'axios';

const LessonsSection = styled.section`
  padding: 120px 0 80px;
  background: #ffffff;
`;

const LessonsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const LessonsHeader = styled.div`
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
  
  .highlight {
    color: #1976d2;
    font-weight: 600;
  }
`;

const LessonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
`;

const LessonCard = styled(motion.div)`
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
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  &.featured {
    border: 2px solid #1976d2;
    
    &::before {
      content: "Most Popular";
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      background: #1976d2;
      color: #ffffff;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #1a1a1a;
  }
  
  .price {
    font-size: 2rem;
    font-weight: 700;
    color: #1976d2;
    margin-bottom: 10px;
  }
  
  .duration {
    color: #666666;
    margin-bottom: 20px;
    font-weight: 500;
  }
  
  .description {
    color: #666666;
    margin-bottom: 25px;
    line-height: 1.6;
  }
  
  .features {
    list-style: none;
    margin-bottom: 30px;
    
    li {
      color: #666666;
      margin-bottom: 10px;
      padding-left: 25px;
      position: relative;
      
      &:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #1976d2;
        font-weight: bold;
        font-size: 1.1rem;
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
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const InfoSection = styled.div`
  background: #f8f9fa;
  padding: 80px 0;
  margin: 80px 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 60px;
`;

const InfoCard = styled(motion.div)`
  background: #ffffff;
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: #1a1a1a;
  }
  
  p {
    color: #666666;
    line-height: 1.6;
  }
`;

const FAQSection = styled.div`
  margin-top: 80px;
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-top: 60px;
`;

const FAQCard = styled(motion.div)`
  background: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  h4 {
    font-size: 1.2rem;
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

const BeginnerLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get('/api/lessons/types');
        setLessons(response.data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleBookLesson = (lessonId) => {
    window.location.href = `/book?service=motorcycle-lesson&type=${lessonId}`;
  };

  const faqs = [
    {
      question: "Do I need my own motorcycle?",
      answer: "No, we provide motorcycles for all lessons. Our training bikes are well-maintained and perfect for learning in Atlanta."
    },
    {
      question: "What should I bring to my first lesson?",
      answer: "Bring comfortable clothing, closed-toe shoes, and a valid driver's license. We provide helmets and safety gear."
    },
    {
      question: "How long does it take to get my motorcycle license?",
      answer: "The timeline varies by individual, but most students complete our program in 2-4 weeks with regular lessons."
    },
    {
      question: "Are the instructors certified?",
      answer: "Yes, all our instructors are certified by the Motorcycle Safety Foundation and have years of teaching experience in Atlanta."
    }
  ];

  if (loading) {
    return (
      <LessonsSection>
        <LessonsContent>
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <p>Loading lessons...</p>
          </div>
        </LessonsContent>
      </LessonsSection>
    );
  }

  return (
    <LessonsSection>
      <LessonsContent>
        <LessonsHeader>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Motorcycle Lessons in <span className="highlight">Atlanta</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Learn to ride safely with our certified instructors in Atlanta. From complete beginners to advanced riders, we have the perfect lesson for you.
          </motion.p>
        </LessonsHeader>

        <LessonsGrid>
          {lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              className={lesson.id === 'beginner' ? 'featured' : ''}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3>{lesson.name}</h3>
              <div className="price">${lesson.price}</div>
              <div className="duration">{lesson.duration}</div>
              <p className="description">{lesson.description}</p>
              <ul className="features">
                {lesson.includes.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <BookButton onClick={() => handleBookLesson(lesson.id)}>
                Book This Lesson
              </BookButton>
            </LessonCard>
          ))}
        </LessonsGrid>

        <InfoSection>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Why Choose Our Lessons?</h2>
              <p style={{ textAlign: 'center', color: '#666666', fontSize: '1.1rem' }}>
                We're committed to your success and safety in Atlanta
              </p>
            </motion.div>
            
            <InfoGrid>
              <InfoCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="icon">🛡️</div>
                <h3>Safety First</h3>
                <p>Our instructors prioritize safety above all else. We follow strict safety protocols and use only the best equipment.</p>
              </InfoCard>
              
              <InfoCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="icon">🎯</div>
                <h3>Experienced Instructors</h3>
                <p>Learn from certified instructors with years of experience in motorcycle safety and training in Atlanta.</p>
              </InfoCard>
              
              <InfoCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="icon">🤝</div>
                <h3>Personalized Approach</h3>
                <p>Every student is unique. We tailor our lessons to your learning style and experience level.</p>
              </InfoCard>
            </InfoGrid>
          </div>
        </InfoSection>

        <FAQSection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Frequently Asked Questions</h2>
            <p style={{ textAlign: 'center', color: '#666666', fontSize: '1.1rem' }}>
              Everything you need to know about our lessons in Atlanta
            </p>
          </motion.div>
          
          <FAQGrid>
            {faqs.map((faq, index) => (
              <FAQCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </FAQCard>
            ))}
          </FAQGrid>
        </FAQSection>

        <CTASection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>Ready to Start Riding?</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: 0.9 }}>
              Join hundreds of satisfied riders in Atlanta who learned with Mike's Bikes
            </p>
            <CTAButton to="/book">Book Your Lesson Now</CTAButton>
            <CTAButton to="/transportation">Transportation Services</CTAButton>
          </motion.div>
        </CTASection>
      </LessonsContent>
    </LessonsSection>
  );
};

export default BeginnerLessons; 