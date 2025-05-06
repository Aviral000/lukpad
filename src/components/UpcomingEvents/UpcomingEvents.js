import React, { useRef, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import Countdown from 'react-countdown';
import { CustomLeftArrow } from '../../Assets/SVGComponent/LeftArrow';
import { CustomRightArrow } from '../../Assets/SVGComponent/RightArrow';
import gsap from 'gsap';

const EventsSection = styled.section`
  margin: 40px auto;
  max-width: 1200px;
  padding: 0 20px;
  position: relative;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'Dancing Script', cursive;
  font-size: 2.5rem;
  margin-bottom: 30px;
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
  cursor: pointer;
  
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

// Modal overlay and content
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  
  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
  max-width: 90%;
  width: 700px;
  border-radius: 20px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  transform: perspective(1200px) rotateX(0deg) rotateY(0deg) scale(0.9);
  transform-style: preserve-3d;
  opacity: 0;
  height: 100vh;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 25px;
    max-width: 95%;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  color: var(--primary-color);
  font-size: 1.5rem;
  transition: all 0.3s ease;
  z-index: 2;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  overflow: hidden;
`;

const ModalEventTitle = styled.h2`
  font-family: 'Pacifico', cursive;
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 10px;
  opacity: 0;
  transform: translateY(30px);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ModalEventDate = styled.div`
  font-size: 1.2rem;
  color: var(--secondary-color);
  font-weight: 500;
  opacity: 0;
  transform: translateY(20px);
`;

const ModalDivider = styled.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  margin: 25px 0;
  opacity: 0;
  transform: scaleX(0);
`;

const ModalEventDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 30px;
  opacity: 0;
  transform: translateX(-30px);
`;

const ModalCountdownSection = styled.div`
  margin: 30px 0;
  opacity: 0;
  transform: translateY(20px);
`;

const ModalCountdownTitle = styled.h3`
  font-family: 'Dancing Script', cursive;
  color: var(--secondary-color);
  font-size: 1.8rem;
  margin-bottom: 15px;
  text-align: center;
`;

const ModalCountdownContainer = styled(CountdownContainer)`
  gap: 15px;
`;

const ModalCountdownItem = styled(CountdownItem)``;

const ModalCountdownNumber = styled.div`
  background-color: ${props => props.isSpecial ? 'rgba(255, 107, 107, 0.15)' : 'rgba(78, 205, 196, 0.15)'};
  color: ${props => props.isSpecial ? 'var(--primary-color)' : 'var(--secondary-color)'};
  font-size: 1.8rem;
  font-weight: bold;
  width: 70px;
  height: 70px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), transparent);
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
`;

const ModalCountdownLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 8px;
`;

const DetailedScheduleSection = styled.div`
  margin-top: 40px;
  opacity: 0;
  transform: translateX(30px);
`;

const DetailedScheduleTitle = styled.h3`
  font-family: 'Dancing Script', cursive;
  color: var(--secondary-color);
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
`;

const TimelineContainer = styled.div`
  position: relative;
  padding-left: 40px;
  
  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 0;
    height: 100%;
    width: 2px;
    background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 25px;
  padding-bottom: 10px;
  opacity: 0;
  transform: translateX(20px);
  
  &::before {
    content: '';
    position: absolute;
    left: -40px;
    top: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.isSpecial ? 'var(--primary-color)' : 'var(--secondary-color)'};
    box-shadow: 0 0 0 4px ${props => props.isSpecial ? 'rgba(255, 107, 107, 0.2)' : 'rgba(78, 205, 196, 0.2)'};
  }
`;

const TimelineTime = styled.div`
  font-weight: bold;
  color: ${props => props.isSpecial ? 'var(--primary-color)' : 'var(--secondary-color)'};
  margin-bottom: 5px;
`;

const TimelineTitle = styled.h4`
  font-family: 'Pacifico', cursive;
  margin: 0 0 8px;
  font-size: 1.2rem;
  color: var(--dark-color);
`;

const TimelineDescription = styled.p`
  margin: 0;
  color: #666;
  line-height: 1.6;
`;

// Modal countdown renderer
const ModalCountdownRenderer = ({ days, hours, minutes, seconds, isSpecial }) => {
  return (
    <ModalCountdownContainer>
      <ModalCountdownItem>
        <ModalCountdownNumber isSpecial={isSpecial}>{days}</ModalCountdownNumber>
        <ModalCountdownLabel>Days</ModalCountdownLabel>
      </ModalCountdownItem>
      <ModalCountdownItem>
        <ModalCountdownNumber isSpecial={isSpecial}>{hours}</ModalCountdownNumber>
        <ModalCountdownLabel>Hours</ModalCountdownLabel>
      </ModalCountdownItem>
      <ModalCountdownItem>
        <ModalCountdownNumber isSpecial={isSpecial}>{minutes}</ModalCountdownNumber>
        <ModalCountdownLabel>Minutes</ModalCountdownLabel>
      </ModalCountdownItem>
      <ModalCountdownItem>
        <ModalCountdownNumber isSpecial={isSpecial}>{seconds}</ModalCountdownNumber>
        <ModalCountdownLabel>Seconds</ModalCountdownLabel>
      </ModalCountdownItem>
    </ModalCountdownContainer>
  );
};

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
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Enhanced event data with detailed schedules
  const events = useMemo(() => [
    {
      id: 1,
      date: new Date(2025, 4, 6), // May 6, 2025
      title: "1 Month Anniversary",
      description: "Celebrating our first month together. One month of love, joy, and beautiful memories.",
      isSpecial: true,
      detailedSchedule: [
        { 
          time: "00:00 AM", 
          title: "Heartful text and voice messages", 
          description: "Starting the sleep with sweet messages and love notes. Expressing my love in front of all the people." 
        },
        { 
          time: "4:00 PM", 
          title: "A song", 
          description: "Playing a song for the very first time on the guitar. Expressing my love via song" 
        },
        { 
          time: "6:00 PM", 
          title: "Cake cutting", 
          description: "Cutting the cake with a special message. Celebrating our love with a sweet treat." 
        },
        { 
          time: "8:00 PM", 
          title: "A love letter", 
          description: "Writing a heartfelt letter to express my feelings. A special moment to share my love. Just like every beginnging people make a lot of efforts to impress the girl but for my wife I want to relive all the these moments every single day not just the beginning, but forever types, you feel me naa hehe.... muuuuaahh" 
        }
      ]
    },
    {
      id: 2,
      date: new Date(2025, 9, 6), // october 6, 2025
      title: "6 Month Anniversary",
      description: "Six amazing months of being in love. Every day with you is a blessing.",
      isSpecial: false,
      detailedSchedule: [
        { 
          time: "10:00 AM", 
          title: "Breakfast in Bed", 
          description: "Start the day with a special homemade breakfast." 
        },
        { 
          time: "02:00 PM", 
          title: "Couples Massage", 
          description: "Relaxing spa treatment for both of us." 
        },
        { 
          time: "06:00 PM", 
          title: "Rooftop Dinner", 
          description: "Exclusive dinner with city views and candlelight." 
        }
      ]
    },
    {
      id: 3,
      date: new Date(2025, 9, 18), // october 18, 2025
      title: "First Flight to you",
      description: "First flight to you. Six amazing months of being in love. Every day with you is a blessing.",
      isSpecial: true,
      detailedSchedule: [
        { 
          time: "10:00 AM", 
          title: "Breakfast in Bed", 
          description: "Start the day with a special homemade breakfast." 
        },
        { 
          time: "02:00 PM", 
          title: "Couples Massage", 
          description: "Relaxing spa treatment for both of us." 
        },
        { 
          time: "06:00 PM", 
          title: "Rooftop Dinner", 
          description: "Exclusive dinner with city views and candlelight." 
        }
      ]
    },
    {
      id: 4,
      date: new Date(2025, 11, 22), // December 22, 2025
      title: "Avi's Birthday",
      description: "Celebrating another year of life with the one who makes every day special.",
      isSpecial: true,
      detailedSchedule: [
        { 
          time: "08:00 AM", 
          title: "Birthday Breakfast Surprise", 
          description: "Wake up to your favorite breakfast and gifts." 
        },
        { 
          time: "11:00 AM", 
          title: "Adventure Activity", 
          description: "That special activity you've been wanting to try." 
        },
        { 
          time: "03:00 PM", 
          title: "Friends Gathering", 
          description: "Meet up with close friends for cake and celebrations." 
        },
        { 
          time: "07:00 PM", 
          title: "Romantic Birthday Dinner", 
          description: "Special reservation at your favorite restaurant." 
        },
        { 
          time: "10:00 PM", 
          title: "Surprise Entertainment", 
          description: "A special surprise to end your perfect day." 
        }
      ]
    },
    {
      id: 5,
      date: new Date(2026, 3, 6), // April 6, 2026
      title: "1 Year Anniversary",
      description: "Celebrating one year of love, laughter, and creating beautiful memories together.",
      isSpecial: true,
      detailedSchedule: [
        { 
          time: "09:00 AM", 
          title: "Anniversary Brunch", 
          description: "Start the day with a beautiful brunch and champagne toast." 
        },
        { 
          time: "11:30 AM", 
          title: "Memory Lane Photo Session", 
          description: "Professional photoshoot to capture our love." 
        },
        { 
          time: "02:00 PM", 
          title: "Recreate First Date", 
          description: "Go back to where it all began and relive our first moments." 
        },
        { 
          time: "05:00 PM", 
          title: "Exchange of Gifts", 
          description: "Special moment to exchange anniversary presents." 
        },
        { 
          time: "07:30 PM", 
          title: "Gourmet Dinner Experience", 
          description: "Exclusive dining experience with custom menu." 
        },
        { 
          time: "10:00 PM", 
          title: "Stargazing & Champagne", 
          description: "End the night under the stars, planning our future together." 
        }
      ]
    },
    {
      id: 6,
      date: new Date(2026, 3, 16), // April 16, 2026
      title: "Cyra's Birthday",
      description: "Celebrating the birthday of the most wonderful woman in my life. Happy Birthday, Cyra Camille!",
      isSpecial: true,
      detailedSchedule: [
        { 
          time: "07:00 AM", 
          title: "Sunrise Surprise", 
          description: "Wake up to birthday decorations and your first gift of the day." 
        },
        { 
          time: "09:30 AM", 
          title: "Birthday Brunch", 
          description: "Your favorite brunch spot with mimosas and treats." 
        },
        { 
          time: "12:00 PM", 
          title: "Spa Retreat", 
          description: "Full pampering session: massage, facial, and more." 
        },
        { 
          time: "03:30 PM", 
          title: "Shopping Spree", 
          description: "Pick out something special with no limits." 
        },
        { 
          time: "06:00 PM", 
          title: "Sunset Celebration", 
          description: "Beautiful view with cocktails and appetizers." 
        },
        { 
          time: "08:00 PM", 
          title: "Gourmet Birthday Dinner", 
          description: "Exclusive reservation with customized birthday menu." 
        },
        { 
          time: "10:30 PM", 
          title: "Private Celebration", 
          description: "Special end to your perfect day with more surprises." 
        }
      ]
    },
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

  // Format full date (e.g., "April 16, 2026")
  const formatFullDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Open modal with selected event
  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };
  
  // Close modal
  const closeModal = () => {
    // First animate out
    if (modalContentRef.current) {
      // Animate modal content out
      gsap.to(modalContentRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Set state to closed (this will trigger re-render)
          setIsModalOpen(false);
          
          // Clear selected event after animation completes
          setTimeout(() => {
            setSelectedEvent(null);
          }, 300);
        }
      });
    } else {
      // Fallback if ref isn't available
      setIsModalOpen(false);
      setTimeout(() => {
        setSelectedEvent(null);
      }, 300);
    }
  };
  
  // Handle 3D floating effect for modal
  const handleMouseMove = (e) => {
    if (!modalContentRef.current || !isModalOpen) return;
    
    const rect = modalContentRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = (x - centerX) / 30;
    const rotateX = (centerY - y) / 30;
    
    gsap.to(modalContentRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out"
    });
  };
  
  // Reset rotation when mouse leaves modal
  const handleMouseLeave = () => {
    if (!modalContentRef.current) return;
    
    gsap.to(modalContentRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };
  
  // Apply GSAP animations when modal opens
  useEffect(() => {
    if (isModalOpen && selectedEvent && modalContentRef.current) {
      // First set the modal to be visible
      const modal = modalRef.current;
      modal.classList.add('active');
      
      // Animate modal content appearing
      gsap.to(modalContentRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.2)"
      });
      
      // Staggered animations for modal content
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      // Title animation (from top)
      timeline.to(".modal-title", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2
      });
      
      // Date animation (from top)
      timeline.to(".modal-date", {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, "-=0.4");
      
      // Divider animation (scale from center)
      timeline.to(".modal-divider", {
        opacity: 1,
        scaleX: 1,
        duration: 0.6
      }, "-=0.3");
      
      // Description animation (from left)
      timeline.to(".modal-description", {
        opacity: 1,
        x: 0,
        duration: 0.6
      }, "-=0.3");
      
      // Countdown section animation (from bottom)
      timeline.to(".modal-countdown", {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, "-=0.3");
      
      // Detailed Schedule section animation (from right)
      timeline.to(".modal-schedule", {
        opacity: 1,
        x: 0,
        duration: 0.6
      }, "-=0.3");
      
      // Timeline items animation (staggered from right)
      timeline.to(".timeline-item", {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.15
      }, "-=0.2");
    }
  }, [isModalOpen, selectedEvent]);
  
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
              <EventCard 
                key={event.id} 
                onClick={() => openModal(event)}
                role="button"
                aria-label={`View details for ${event.title}`}
              >
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
      
      {/* Modal */}
      <ModalOverlay 
        ref={modalRef}
        isOpen={isModalOpen}
        onClick={(e) => {
          if (e.target === modalRef.current) closeModal();
        }}
      >
        {selectedEvent && (
          <ModalContent 
            ref={modalContentRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <CloseButton onClick={closeModal} aria-label="Close modal">
              ×
            </CloseButton>
            
            <ModalHeader>
              <ModalEventTitle className="modal-title">
                {selectedEvent.title}
              </ModalEventTitle>
              <ModalEventDate className="modal-date">
                {formatFullDate(selectedEvent.date)}
              </ModalEventDate>
            </ModalHeader>
            
            <ModalDivider className="modal-divider" />
            
            <ModalEventDescription className="modal-description">
              {selectedEvent.description}
            </ModalEventDescription>
            
            <ModalCountdownSection className="modal-countdown">
              <ModalCountdownTitle>Countdown Until This Moment</ModalCountdownTitle>
              <Countdown 
                date={selectedEvent.date}
                renderer={(props) => 
                  <ModalCountdownRenderer {...props} isSpecial={selectedEvent.isSpecial} />
                }
              />
            </ModalCountdownSection>
            
            <ModalDivider className="modal-divider" />
            
            <DetailedScheduleSection className="modal-schedule">
              <DetailedScheduleTitle>Detailed Schedule</DetailedScheduleTitle>
              <TimelineContainer>
                {selectedEvent.detailedSchedule.map((item, index) => (
                  <TimelineItem 
                    key={index} 
                    className="timeline-item"
                    isSpecial={selectedEvent.isSpecial}
                  >
                    <TimelineTime isSpecial={selectedEvent.isSpecial}>{item.time}</TimelineTime>
                    <TimelineTitle>{item.title}</TimelineTitle>
                    <TimelineDescription>{item.description}</TimelineDescription>
                  </TimelineItem>
                ))}
              </TimelineContainer>
            </DetailedScheduleSection>
          </ModalContent>
        )}
      </ModalOverlay>
    </EventsSection>
  );
}
