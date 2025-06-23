import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingSection = styled.section`
  padding: 120px 0 80px;
  background: #ffffff;
`;

const BookingContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BookingHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: #666666;
  }
`;

const FormContainer = styled(motion.div)`
  background: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const Form = styled.form`
  display: grid;
  gap: 25px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    font-weight: 600;
    margin-bottom: 8px;
    color: #1a1a1a;
  }
  
  input, select, textarea {
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #1a1a1a;
    }
    
    &.error {
      border-color: #e74c3c;
    }
  }
  
  .error-message {
    color: #e74c3c;
    font-size: 0.9rem;
    margin-top: 5px;
  }
`;

const ServiceTypeSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceOption = styled.div`
  padding: 20px;
  border: 2px solid ${props => props.selected ? '#1a1a1a' : '#e0e0e0'};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? '#f8f9fa' : '#ffffff'};
  
  &:hover {
    border-color: #1a1a1a;
  }
  
  h3 {
    margin-bottom: 10px;
    color: #1a1a1a;
  }
  
  p {
    color: #666666;
    font-size: 0.9rem;
  }
`;

const TimeSlotSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

const TimeSlot = styled.button`
  padding: 10px;
  border: 2px solid ${props => props.selected ? '#1a1a1a' : '#e0e0e0'};
  border-radius: 6px;
  background: ${props => props.selected ? '#1a1a1a' : '#ffffff'};
  color: ${props => props.selected ? '#ffffff' : '#1a1a1a'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #1a1a1a;
  }
`;

const SubmitButton = styled.button`
  padding: 15px 30px;
  background: #1a1a1a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333333;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: #d4edda;
  color: #155724;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
`;

const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const [serviceType, setServiceType] = useState('');
  const [lessonType, setLessonType] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  useEffect(() => {
    const service = searchParams.get('service');
    const type = searchParams.get('type');
    
    if (service) {
      setServiceType(service);
    }
    if (type) {
      setLessonType(type);
    }
  }, [searchParams]);

  const onSubmit = async (data) => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const bookingData = {
        ...data,
        serviceType,
        lessonType: serviceType === 'motorcycle-lesson' ? lessonType : undefined,
        date: selectedDate,
        time: selectedTime,
        location: {
          address: data.address,
          coordinates: { lat: 0, lng: 0 } // Would be set by geocoding
        }
      };

      await axios.post('/api/bookings', bookingData);
      setSubmitSuccess(true);
      reset();
      setSelectedDate(null);
      setSelectedTime('');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Booking error:', error);
      alert('There was an error submitting your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BookingSection>
      <BookingContent>
        <BookingHeader>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Book Your Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Fill out the form below to schedule your motorcycle lesson or transportation service.
          </motion.p>
        </BookingHeader>

        <FormContainer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {submitSuccess && (
            <SuccessMessage
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3>Booking Submitted Successfully!</h3>
              <p>We'll contact you soon to confirm your appointment.</p>
            </SuccessMessage>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <ServiceTypeSelector>
              <ServiceOption
                selected={serviceType === 'motorcycle-lesson'}
                onClick={() => setServiceType('motorcycle-lesson')}
              >
                <h3>Motorcycle Lesson</h3>
                <p>Learn to ride safely with our certified instructors</p>
              </ServiceOption>
              <ServiceOption
                selected={serviceType === 'transportation-pickup'}
                onClick={() => setServiceType('transportation-pickup')}
              >
                <h3>Transportation</h3>
                <p>Professional pickup and delivery services</p>
              </ServiceOption>
            </ServiceTypeSelector>

            {serviceType === 'motorcycle-lesson' && (
              <FormGroup>
                <label>Lesson Type</label>
                <select
                  value={lessonType}
                  onChange={(e) => setLessonType(e.target.value)}
                  className={errors.lessonType ? 'error' : ''}
                >
                  <option value="">Select lesson type</option>
                  <option value="beginner">Beginner Lesson</option>
                  <option value="intermediate">Intermediate Lesson</option>
                  <option value="advanced">Advanced Lesson</option>
                </select>
                {errors.lessonType && (
                  <span className="error-message">{errors.lessonType.message}</span>
                )}
              </FormGroup>
            )}

            <FormGroup>
              <label>Full Name</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </FormGroup>

            <FormGroup>
              <label>Email</label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </FormGroup>

            <FormGroup>
              <label>Phone Number</label>
              <input
                type="tel"
                {...register('phone', { required: 'Phone number is required' })}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone.message}</span>
              )}
            </FormGroup>

            <FormGroup>
              <label>Address</label>
              <input
                type="text"
                {...register('address', { required: 'Address is required' })}
                className={errors.address ? 'error' : ''}
                placeholder="Enter your address"
              />
              {errors.address && (
                <span className="error-message">{errors.address.message}</span>
              )}
            </FormGroup>

            <FormGroup>
              <label>Preferred Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select a date"
                className="date-picker"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </FormGroup>

            <FormGroup>
              <label>Preferred Time</label>
              <TimeSlotSelector>
                {timeSlots.map((time) => (
                  <TimeSlot
                    key={time}
                    type="button"
                    selected={selectedTime === time}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </TimeSlot>
                ))}
              </TimeSlotSelector>
            </FormGroup>

            {serviceType === 'transportation-pickup' && (
              <>
                <FormGroup>
                  <label>Pickup Location</label>
                  <input
                    type="text"
                    {...register('pickupDetails.from')}
                    placeholder="Where should we pick up from?"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Delivery Location</label>
                  <input
                    type="text"
                    {...register('pickupDetails.to')}
                    placeholder="Where should we deliver to?"
                  />
                </FormGroup>
              </>
            )}

            <FormGroup>
              <label>Special Requests (Optional)</label>
              <textarea
                {...register('specialRequests')}
                rows="4"
                placeholder="Any special requirements or notes..."
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Book Appointment'}
            </SubmitButton>
          </Form>
        </FormContainer>
      </BookingContent>
    </BookingSection>
  );
};

export default BookingForm; 