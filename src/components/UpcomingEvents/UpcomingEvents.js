import React, { useRef, useMemo } from 'react';
import styled from 'styled-components';
import Countdown from 'react-countdown';
import { CustomLeftArrow } from '../../Assets/SVGComponent/LeftArrow';
import { CustomRightArrow } from '../../Assets/SVGComponent/RightArrow';

const EventsSection = styled.section`
  margin: 60px auto;
  max-width: 1200px;
  padding: 0 20px;
  position: relative;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  margin-bottom: 40px;
  color: var(--primary-color);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const EventsContainer = styled.div`
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 20px 0;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  &::before,
  &::after {
    content: '';
    padding-left: 20px;
  }
`;

const EventsWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 10px;
`;

const EventCard = styled.div`
  min-width: 300px;
  flex: 0 0 300px;
  background: linear-gradient(135deg, #fff 0%, #f9f9f9 100%);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 107, 107, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(255, 107, 107, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    border-radius: 15px 15px 0 0;
  }
`;

const EventDate = styled.div`
  position: relative;
  margin: 10px auto 20px;
  width: 70px;
  height: 70px;
  background-color: ${props => props.isSpecial ? 'var(--primary-color)' : 'var(--secondary-color)'};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const EventDay = styled.div`
  font-size: 1.5rem;
  line-height: 1;
`;

const EventMonth = styled.div`
  font-size: 0.9rem;
  text-transform: uppercase;
`;

const EventTitle = styled.h3`
  font-family: 'Pacifico', cursive;
  color: var(--dark-color);
  margin: 15px 0 10px;
  font-size: 1.5rem;
`;

const EventDescription = styled.p`
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
`;

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
`;

const CountdownItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CountdownNumber = styled.div`
  background-color: ${props => props.isSpecial ? 'rgba(255, 107, 107, 0.1)' : 'rgba(78, 205, 196, 0.1)'};
  color: ${props => props.isSpecial ? 'var(--primary-color)' : 'var(--secondary-color)'};
  font-size: 1.2rem;
  font-weight: bold;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountdownLabel = styled.div`
  font-size: 0.7rem;
  color: #888;
  margin-top: 5px;
`;

const HeartIcon = styled.div`
  color: var(--primary-color);
  font-size: 1.5rem;
  position: absolute;
  top: -12px;
  right: -12px;
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  color: var(--primary-color);
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &.prev {
    left: -15px;
  }
  
  &.next {
    right: -15px;
  }
  
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    
    &.prev {
      left: -5px;
    }
    
    &.next {
      right: -5px;
    }
  }
`;

const ScrollIndicator = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: #888;
  margin-top: 10px;
  opacity: 0.7;
`;

// Renderer for the countdown component
const CountdownRenderer = ({ days, hours, minutes, seconds, isSpecial }) => {
  return (
    <CountdownContainer>
      <CountdownItem>
        <CountdownNumber isSpecial={isSpecial}>{days}</CountdownNumber>
        <CountdownLabel>Days</CountdownLabel>
      </CountdownItem>
      <CountdownItem>
        <CountdownNumber isSpecial={isSpecial}>{hours}</CountdownNumber>
        <CountdownLabel>Hours</CountdownLabel>
      </CountdownItem>
      <CountdownItem>
        <CountdownNumber isSpecial={isSpecial}>{minutes}</CountdownNumber>
        <CountdownLabel>Mins</CountdownLabel>
      </CountdownItem>
      <CountdownItem>
        <CountdownNumber isSpecial={isSpecial}>{seconds}</CountdownNumber>
        <CountdownLabel>Secs</CountdownLabel>
      </CountdownItem>
    </CountdownContainer>
  );
};

export function UpcomingEvents() {
  const containerRef = useRef(null);
  
  // Example events - using useMemo to prevent recreation on every render
  const events = useMemo(() => [
    {
      id: 1,
      date: new Date(2025, 3, 16), // April 16, 2025 (0-indexed month)
      title: "Cyra's Birthday",
      description: "Celebrating the birthday of the most wonderful woman in my life. Happy Birthday, Cyra Camille!",
      isSpecial: true
    },
    {
      id: 2,
      date: new Date(2025, 4, 6), // May 6, 2025
      title: "1 Month Anniversary",
      description: "Celebrating our first month together. One month of love, joy, and beautiful memories.",
      isSpecial: false
    },
    {
      id: 3,
      date: new Date(2025, 7, 6), // August 6, 2025
      title: "4 Month Anniversary",
      description: "Four amazing months of being in love. Every day with you is a blessing.",
      isSpecial: false
    },
    {
      id: 4,
      date: new Date(2025, 11, 22), // December 22, 2025
      title: "Avi's Birthday",
      description: "Celebrating another year of life with the one who makes every day special.",
      isSpecial: true
    },
    {
      id: 5,
      date: new Date(2026, 3, 6), // April 6, 2026
      title: "1 Year Anniversary",
      description: "Celebrating one year of love, laughter, and creating beautiful memories together.",
      isSpecial: true
    }
  ], []);
  
  // Scroll to next or previous card
  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };
  
  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };
  
  // Format date as "Month Day" (e.g., "Apr 16")
  const formatDate = (date) => {
    const day = date.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    return { day, month };
  };
  
  return (
    <EventsSection>
      <SectionTitle>Special Moments Ahead</SectionTitle>
      
      <NavigationButton 
        className="prev" 
        onClick={handlePrev}
        aria-label="Previous events"
      >
        <CustomLeftArrow size={20} />
      </NavigationButton>
      
      <EventsContainer ref={containerRef}>
        <EventsWrapper>
          {events.map((event) => {
            const formattedDate = formatDate(event.date);
            
            return (
              <EventCard key={event.id}>
                <div>
                  <EventDate isSpecial={event.isSpecial}>
                    <EventDay>{formattedDate.day}</EventDay>
                    <EventMonth>{formattedDate.month}</EventMonth>
                  </EventDate>
                  {event.isSpecial && <HeartIcon>❤</HeartIcon>}
                  <EventTitle>{event.title}</EventTitle>
                  <EventDescription>{event.description}</EventDescription>
                </div>
                
                <Countdown 
                  date={event.date}
                  renderer={(props) => 
                    <CountdownRenderer {...props} isSpecial={event.isSpecial} />
                  }
                />
              </EventCard>
            );
          })}
        </EventsWrapper>
      </EventsContainer>
      
      <NavigationButton 
        className="next" 
        onClick={handleNext}
        aria-label="Next events"
      >
        <CustomRightArrow size={20} />
      </NavigationButton>
      
      <ScrollIndicator>
        ↔️ Swipe or scroll to see more events
      </ScrollIndicator>
    </EventsSection>
  );
}

export default UpcomingEvents;
