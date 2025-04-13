import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
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
  overflow: hidden;
  padding: 20px 0;
`;

const EventsWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  gap: 20px;
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

const Indicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const IndicatorDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--primary-color)' : '#ddd'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.2);
  }
`;

export function UpcomingEvents() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  
  // Countdown states
  const [countdowns, setCountdowns] = useState({});
  
  // Example events - you can replace these with your actual events
  const events = [
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
      date: new Date(2025, 12, 22), // September 12, 2025
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
  ];
  
  // Calculate the visible cards based on container width
  useEffect(() => {
    if (containerRef.current && wrapperRef.current) {
      const calculateVisibleCards = () => {
        const containerWidth = containerRef.current.offsetWidth;
        const cardWidth = 320; // Card width + gap
        const visibleCards = Math.floor(containerWidth / cardWidth);
        const newMaxScroll = Math.max(0, events.length - visibleCards);
        setMaxScroll(newMaxScroll);
      };
      
      calculateVisibleCards();
      window.addEventListener('resize', calculateVisibleCards);
      
      return () => {
        window.removeEventListener('resize', calculateVisibleCards);
      };
    }
  }, [events.length]);
  
  // Update countdowns every second
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const newCountdowns = {};
      
      events.forEach(event => {
        const difference = event.date - now;
        
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          
          newCountdowns[event.id] = { days, hours, minutes, seconds };
        } else {
          newCountdowns[event.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
      
      setCountdowns(newCountdowns);
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [events]);
  
  const handleNext = () => {
    if (scrollPosition < maxScroll) {
      setScrollPosition(scrollPosition + 1);
      setVisibleIndex(scrollPosition + 1);
    }
  };
  
  const handlePrev = () => {
    if (scrollPosition > 0) {
      setScrollPosition(scrollPosition - 1);
      setVisibleIndex(scrollPosition - 1);
    }
  };
  
  const goToIndex = (index) => {
    setScrollPosition(index);
    setVisibleIndex(index);
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
      
      <EventsContainer ref={containerRef}>
        <NavigationButton 
          className="prev" 
          onClick={handlePrev} 
          disabled={scrollPosition === 0}
          aria-label="Previous events"
        >
          <CustomLeftArrow size={20} />
        </NavigationButton>
        
        <EventsWrapper 
          ref={wrapperRef}
          style={{ transform: `translateX(-${scrollPosition * 320}px)` }}
        >
          {events.map((event) => {
            const formattedDate = formatDate(event.date);
            const countdown = countdowns[event.id] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
            
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
                
                <CountdownContainer>
                  <CountdownItem>
                    <CountdownNumber isSpecial={event.isSpecial}>{countdown.days}</CountdownNumber>
                    <CountdownLabel>Days</CountdownLabel>
                  </CountdownItem>
                  <CountdownItem>
                    <CountdownNumber isSpecial={event.isSpecial}>{countdown.hours}</CountdownNumber>
                    <CountdownLabel>Hours</CountdownLabel>
                  </CountdownItem>
                  <CountdownItem>
                    <CountdownNumber isSpecial={event.isSpecial}>{countdown.minutes}</CountdownNumber>
                    <CountdownLabel>Mins</CountdownLabel>
                  </CountdownItem>
                  <CountdownItem>
                    <CountdownNumber isSpecial={event.isSpecial}>{countdown.seconds}</CountdownNumber>
                    <CountdownLabel>Secs</CountdownLabel>
                  </CountdownItem>
                </CountdownContainer>
              </EventCard>
            );
          })}
        </EventsWrapper>
        
        <NavigationButton 
          className="next" 
          onClick={handleNext} 
          disabled={scrollPosition >= maxScroll}
          aria-label="Next events"
        >
          <CustomRightArrow size={20} />
        </NavigationButton>
      </EventsContainer>
      
      <Indicator>
        {Array.from({ length: maxScroll + 1 }).map((_, index) => (
          <IndicatorDot 
            key={index} 
            active={index === visibleIndex} 
            onClick={() => goToIndex(index)}
          />
        ))}
      </Indicator>
    </EventsSection>
  );
}
