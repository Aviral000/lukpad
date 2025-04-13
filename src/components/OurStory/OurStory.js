// File: src/components/OurStory.js
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StorySection = styled.section`
  background-color: rgba(255, 107, 107, 0.1);
  padding: 80px 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  margin-bottom: 50px;
  color: var(--primary-color);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    background-color: var(--primary-color);
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
    
    @media (max-width: 768px) {
      left: 31px;
    }
  }
`;

const TimelineItem = styled.div`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  
  &.visible {
    opacity: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    right: -17px;
    background-color: var(--light-color);
    border: 4px solid var(--primary-color);
    top: 15px;
    border-radius: 50%;
    z-index: 1;
    
    @media (max-width: 768px) {
      left: 15px;
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }
`;

const LeftItem = styled(TimelineItem)`
  left: 0;
`;

const RightItem = styled(TimelineItem)`
  left: 50%;
  
  &::after {
    left: -16px;
  }
  
  @media (max-width: 768px) {
    left: 0;
    
    &::after {
      left: 15px;
    }
  }
`;

const TimelineContent = styled.div`
  padding: 20px 30px;
  background-color: white;
  position: relative;
  border-radius: 6px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const TimelineDate = styled.div`
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 10px;
`;

const TimelineText = styled.p`
  line-height: 1.6;
`;

export function OurStory() {
  const timelineRefs = useRef([]);
  
  // Set up refs array
  timelineRefs.current = Array(5).fill().map((_, i) => timelineRefs.current[i] || React.createRef());
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    timelineRefs.current.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });
    
    return () => {
      timelineRefs.current.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);
  
  const timelineData = [
    {
      side: 'left',
      date: 'First Meeting',
      text: 'We first connected online, sharing thoughts and dreams across the miles between India and the Philippines. From the very beginning, there was a special spark.'
    },
    {
      side: 'right',
      date: 'Getting to Know Each Other',
      text: `Hours spent talking, sharing our cultures, traditions, and lives. Distance couldn't stop our hearts from growing closer with each conversation.`
    },
    {
      side: 'left',
      date: 'Falling in Love',
      text: 'Beyond the miles and time zones, we found ourselves falling deeply in love. Our connection growing stronger despite the distance between Bengalore and Tacloban City.'
    },
    {
      side: 'right',
      date: 'Official Relationship',
      text: 'When Cyra said "yes" to being my girlfriend, it felt like the distance between us disappeared. Our hearts officially connected, beginning a beautiful journey together.'
    },
    {
      side: 'left',
      date: 'Future Plans',
      text: 'Planning our future together, dreaming of the day when distance will no longer separate us. Building a love that spans countries and cultures.'
    }
  ];
  
  return (
    <StorySection id="story">
      <SectionTitle>Our Story</SectionTitle>
      <Timeline>
        {timelineData.map((item, index) => {
          const TimelineComponent = item.side === 'left' ? LeftItem : RightItem;
          return (
            <TimelineComponent 
              key={index} 
              ref={timelineRefs.current[index]} 
              className="timeline-item"
            >
              <TimelineContent>
                <TimelineDate>{item.date}</TimelineDate>
                <TimelineText>{item.text}</TimelineText>
              </TimelineContent>
            </TimelineComponent>
          );
        })}
      </Timeline>
    </StorySection>
  );
}
