import React, { useState, useEffect, useCallback } from 'react';
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

const DurationSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const DurationOption = styled.button`
  padding: 8px 16px;
  border: 2px solid ${props => props.selected ? '#1a1a1a' : '#e0e0e0'};
  border-radius: 6px;
  background: ${props => props.selected ? '#1a1a1a' : '#ffffff'};
  color: ${props => props.selected ? '#ffffff' : '#1a1a1a'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    border-color: #1a1a1a;
  }
`;

const PriceDisplay = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  margin-top: 10px;
  
  .price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
  }
  
  .duration {
    color: #666666;
    font-size: 0.9rem;
  }
`;

const ConfirmationCode = styled.div`
  background: #e3f2fd;
  color: #1565c0;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  margin-top: 15px;
  font-weight: 600;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 20px;
  color: #666666;
`;

const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const [serviceType, setServiceType] = useState('');
  const [lessonType, setLessonType] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

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

  // Calculate price based on service type and duration
  const calculatePrice = () => {
    const basePrices = {
      'motorcycle-lesson': 75,
      'transportation-pickup': 50
    };
    const basePrice = basePrices[serviceType] || 50;
    return basePrice * (selectedDuration / 60);
  };

  const fetchAvailableSlots = useCallback(async () => {
    if (!selectedDate) return;
    
    setLoadingSlots(true);
    try {
      const response = await axios.get('/api/bookings/available-slots', {
        params: {
          date: selectedDate.toISOString().split('T')[0],
          duration: selectedDuration
        }
      });
      setAvailableSlots(response.data.availableSlots);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      // If backend is not available, show default time slots
      if (error.code === 'ERR_NETWORK' || error.response?.status >= 500) {
        const defaultSlots = [
          '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
          '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
          '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
        ];
        setAvailableSlots(defaultSlots);
      } else {
        setAvailableSlots([]);
      }
    } finally {
      setLoadingSlots(false);
    }
  }, [selectedDate, selectedDuration]);

  // Fetch available time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate, fetchAvailableSlots]);

  const onSubmit = async (data) => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }

    if (!serviceType) {
      alert('Please select a service type');
      return;
    }

    if (serviceType === 'motorcycle-lesson' && !lessonType) {
      alert('Please select a lesson type');
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
        duration: selectedDuration,
        price: calculatePrice(),
        location: {
          address: data.address,
          coordinates: { lat: 0, lng: 0 } // Would be set by geocoding
        },
        pickupDetails: serviceType === 'transportation-pickup' ? {
          from: data.pickupDetails?.from || '',
          to: data.pickupDetails?.to || ''
        } : undefined
      };

      const response = await axios.post('/api/bookings', bookingData);
      
      setConfirmationCode(response.data.confirmationCode);
      setSubmitSuccess(true);
      reset();
      setSelectedDate(null);
      setSelectedTime('');
      setSelectedDuration(60);
      setAvailableSlots([]);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setConfirmationCode('');
      }, 5000);
      
    } catch (error) {
      console.error('Booking error:', error);
      let errorMessage = 'There was an error submitting your booking. Please try again.';
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = 'Please check your booking details and try again.';
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeSlot = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
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
              {confirmationCode && (
                <ConfirmationCode>
                  Confirmation Code: {confirmationCode}
                </ConfirmationCode>
              )}
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
              <label>Duration</label>
              <DurationSelector>
                {[30, 60, 90, 120].map(duration => (
                  <DurationOption
                    key={duration}
                    selected={selectedDuration === duration}
                    onClick={() => setSelectedDuration(duration)}
                  >
                    {duration} min
                  </DurationOption>
                ))}
              </DurationSelector>
              {serviceType && (
                <PriceDisplay>
                  <div className="price">${calculatePrice()}</div>
                  <div className="duration">{selectedDuration} minute session</div>
                </PriceDisplay>
              )}
            </FormGroup>

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
              {loadingSlots ? (
                <LoadingSpinner>Loading available times...</LoadingSpinner>
              ) : selectedDate ? (
                <TimeSlotSelector>
                  {availableSlots.map((time) => (
                    <TimeSlot
                      key={time}
                      type="button"
                      selected={selectedTime === time}
                      available={true}
                      onClick={() => setSelectedTime(time)}
                    >
                      {formatTimeSlot(time)}
                    </TimeSlot>
                  ))}
                  {availableSlots.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666666' }}>
                      No available slots for this date. Please select another date.
                    </div>
                  )}
                </TimeSlotSelector>
              ) : (
                <div style={{ color: '#666666', textAlign: 'center' }}>
                  Please select a date first
                </div>
              )}
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