import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e74c3c;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  opacity: 0.9;
`;

const Filters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e74c3c;
  border-radius: 8px;
  background: white;
  font-size: 1rem;
  min-width: 150px;
`;

const BookingsTable = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr auto;
  gap: 1rem;
  padding: 1rem;
  background: #2c3e50;
  color: white;
  font-weight: 600;
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr auto;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #ecf0f1;
  align-items: center;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  
  ${props => {
    switch (props.status) {
      case 'pending': return 'background: #f39c12; color: white;';
      case 'confirmed': return 'background: #27ae60; color: white;';
      case 'completed': return 'background: #3498db; color: white;';
      case 'cancelled': return 'background: #e74c3c; color: white;';
      default: return 'background: #95a5a6; color: white;';
    }
  }}
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 0.5rem;
  
  &.confirm {
    background: #27ae60;
    color: white;
    &:hover { background: #229954; }
  }
  
  &.cancel {
    background: #e74c3c;
    color: white;
    &:hover { background: #c0392b; }
  }
  
  &.edit {
    background: #3498db;
    color: white;
    &:hover { background: #2980b9; }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
`;

const LogoutButton = styled.button`
  padding: 8px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #c0392b;
  }
`;

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    date: '',
    serviceType: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const filterBookings = useCallback(() => {
    let filtered = [...bookings];
    
    if (filters.status) {
      filtered = filtered.filter(booking => booking.status === filters.status);
    }
    
    if (filters.serviceType) {
      filtered = filtered.filter(booking => booking.serviceType === filters.serviceType);
    }
    
    if (filters.date) {
      const filterDate = new Date(filters.date).toDateString();
      filtered = filtered.filter(booking => 
        new Date(booking.date).toDateString() === filterDate
      );
    }
    
    setFilteredBookings(filtered);
  }, [bookings, filters]);

  useEffect(() => {
    filterBookings();
  }, [filterBookings]);

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        fetchBookings(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const getStats = () => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;
    
    return { total, pending, confirmed, completed, cancelled };
  };

  const stats = getStats();

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Admin Dashboard</Title>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div>Total Bookings: {stats.total}</div>
          <LogoutButton onClick={handleLogout}>
            Logout
          </LogoutButton>
        </div>
      </Header>

      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatNumber>{stats.pending}</StatNumber>
          <StatLabel>Pending</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatNumber>{stats.confirmed}</StatNumber>
          <StatLabel>Confirmed</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatNumber>{stats.completed}</StatNumber>
          <StatLabel>Completed</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatNumber>{stats.cancelled}</StatNumber>
          <StatLabel>Cancelled</StatLabel>
        </StatCard>
      </StatsGrid>

      <Filters>
        <FilterSelect
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </FilterSelect>

        <FilterSelect
          value={filters.serviceType}
          onChange={(e) => setFilters({ ...filters, serviceType: e.target.value })}
        >
          <option value="">All Services</option>
          <option value="motorcycle-lesson">Motorcycle Lessons</option>
          <option value="transportation-pickup">Transportation</option>
        </FilterSelect>

        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          style={{
            padding: '0.75rem 1rem',
            border: '2px solid #e74c3c',
            borderRadius: '8px',
            fontSize: '1rem'
          }}
        />
      </Filters>

      <BookingsTable>
        <TableHeader>
          <div>Customer</div>
          <div>Service</div>
          <div>Date & Time</div>
          <div>Location</div>
          <div>Price</div>
          <div>Status</div>
          <div>Actions</div>
        </TableHeader>

        {filteredBookings.length === 0 ? (
          <EmptyState>
            <h3>No bookings found</h3>
            <p>Try adjusting your filters or check back later.</p>
          </EmptyState>
        ) : (
          filteredBookings.map((booking) => (
            <TableRow
              key={booking._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <div><strong>{booking.name}</strong></div>
                <div style={{ fontSize: '0.875rem', color: '#7f8c8d' }}>
                  {booking.email}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#7f8c8d' }}>
                  {booking.phone}
                </div>
              </div>
              
              <div>
                <div>{booking.serviceType === 'motorcycle-lesson' ? 'Motorcycle Lesson' : 'Transportation'}</div>
                {booking.lessonType && (
                  <div style={{ fontSize: '0.875rem', color: '#7f8c8d' }}>
                    {booking.lessonType}
                  </div>
                )}
              </div>
              
              <div>
                <div>{new Date(booking.date).toLocaleDateString()}</div>
                <div style={{ fontSize: '0.875rem', color: '#7f8c8d' }}>
                  {booking.time} ({booking.duration}min)
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: '0.875rem' }}>
                  {booking.location.address}
                </div>
                {booking.pickupDetails && (
                  <div style={{ fontSize: '0.75rem', color: '#7f8c8d' }}>
                    From: {booking.pickupDetails.from}
                  </div>
                )}
              </div>
              
              <div>
                <strong>${booking.price}</strong>
              </div>
              
              <div>
                <StatusBadge status={booking.status}>
                  {booking.status}
                </StatusBadge>
              </div>
              
              <div>
                {booking.status === 'pending' && (
                  <>
                    <ActionButton
                      className="confirm"
                      onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                    >
                      Confirm
                    </ActionButton>
                    <ActionButton
                      className="cancel"
                      onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                    >
                      Cancel
                    </ActionButton>
                  </>
                )}
                {booking.status === 'confirmed' && (
                  <ActionButton
                    className="edit"
                    onClick={() => updateBookingStatus(booking._id, 'completed')}
                  >
                    Complete
                  </ActionButton>
                )}
                <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: '#7f8c8d' }}>
                  {booking.confirmationCode}
                </div>
              </div>
            </TableRow>
          ))
        )}
      </BookingsTable>
    </DashboardContainer>
  );
};

export default AdminDashboard; 