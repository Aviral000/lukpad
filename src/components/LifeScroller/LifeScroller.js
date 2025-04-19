import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Styled components
const ScrollContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #1a0505;
`;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: ${props => props.background || 'transparent'};
`;

const ContentWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-family: 'Pacifico', cursive;
  font-size: 4rem;
  color: ${props => props.color || '#ffffff'};
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateY(100px);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  color: ${props => props.color || '#ffb4b4'};
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(100px);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ImageWrapper = styled.div`
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  opacity: 0;
  transform: scale(0.8);
  
  img {
    width: 100%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const FloatingHeart = styled.div`
  position: absolute;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  width: 40px;
  height: 40px;
  opacity: 0.7;
  transform: translateY(0);
  
  &::before {
    content: '❤';
    color: #ff6b6b;
    font-size: 2rem;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TimelineSection = styled.section`
  position: relative;
  background-color: transparent;
`;

const TimelineWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const TimelineItem = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: 3rem 0;
  display: flex;
  align-items: center;
  justify-content: ${props => props.index % 2 === 0 ? 'flex-start' : 'flex-end'};
  position: relative;
  opacity: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    margin: 2rem 0;
  }
`;

const TimelineContent = styled.div`
  width: 45%;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  position: relative;
  
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const TimelineDate = styled.div`
  font-family: 'Pacifico', cursive;
  font-size: 1.5rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

const TimelineTitle = styled.h3`
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  color: white;
  margin-bottom: 1rem;
`;

const TimelineDescription = styled.p`
  font-family: sans-serif;
  font-size: 1rem;
  color: #ffb4b4;
  line-height: 1.6;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, #ff6b6b, transparent);
  transform: translateX(-50%);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const LifeScroller = () => {
  const containerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    // Section 1: Hero animation
    const section1 = gsap.timeline({
      scrollTrigger: {
        trigger: section1Ref.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
      }
    });

    section1
      .to(section1Ref.current.querySelector('h1'), {
        y: 0,
        opacity: 1,
        duration: 1,
      })
      .to(section1Ref.current.querySelector('p'), {
        y: 0,
        opacity: 1,
        duration: 1,
      }, '-=0.8');

    // Animate hearts after title and subtitle
    const hearts = section1Ref.current.querySelectorAll('.floating-heart');
    hearts.forEach((heart, index) => {
      gsap.fromTo(heart, 
        { 
          opacity: 0,
          y: 50,
          scale: 0
        },
        {
          opacity: 0.7,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.5 + (index * 0.1),
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top top',
            end: 'center top',
            scrub: 1,
          }
        }
      );

      // Floating animation
      gsap.to(heart, {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1 + (index * 0.2)
      });
    });

    // Section 2: Love Story animation
    const section2 = gsap.timeline({
      scrollTrigger: {
        trigger: section2Ref.current,
        start: 'top 80%',
        end: 'bottom top',
        scrub: 1,
      }
    });

    section2
      .from(section2Ref.current.querySelector('h1'), {
        y: 100,
        opacity: 0,
        duration: 1,
      })
      .from(section2Ref.current.querySelector('p'), {
        y: 100,
        opacity: 0,
        duration: 1,
      }, '-=0.5')
      .from(section2Ref.current.querySelector('.image-wrapper'), {
        scale: 0.8,
        opacity: 0,
        duration: 1,
      }, '-=0.5');

    // Section 3: Timeline animation
    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      gsap.fromTo(item, 
        {
          x: index % 2 === 0 ? -200 : 200,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            end: 'top 20%',
            scrub: 1,
          }
        }
      );
    });

    // Background gradient animation
    gsap.to(containerRef.current, {
      backgroundColor: '#3d0c0c',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ScrollContainer ref={containerRef}>
      {/* Hero Section */}
      <Section ref={section1Ref} background="linear-gradient(135deg, #1a0505 0%, #3d0c0c 100%)">
        <ContentWrapper>
          <Title color="#ffb4b4">Cyra & Aviral</Title>
          <Subtitle>A Journey of Love</Subtitle>
          <div className="floating-hearts">
            {[...Array(8)].map((_, i) => (
              <FloatingHeart
                key={i}
                className="floating-heart"
                left={10 + (i * 10)}
                top={20 + (i % 3) * 20}
              />
            ))}
          </div>
        </ContentWrapper>
      </Section>

      {/* Love Story Section */}
      <Section ref={section2Ref}>
        <ContentWrapper>
          <Title>Our Love Story</Title>
          <Subtitle color="#ffb4b4">Two hearts beating as one</Subtitle>
          <ImageWrapper className="image-wrapper">
            <img src="/placeholder-couple.jpg" alt="Our beautiful journey" />
          </ImageWrapper>
        </ContentWrapper>
      </Section>

      {/* Timeline Section */}
      <TimelineSection ref={section3Ref}>
        <TimelineWrapper ref={timelineRef}>
          <TimelineLine />

          <TimelineItem index={0} className="timeline-item">
            <TimelineContent>
              <TimelineDate>March 31, 2025</TimelineDate>
              <TimelineTitle>The Beginning</TimelineTitle>
              <TimelineDescription>
                The day we met each other for the first, and something feels connected maybe we are meant to be!
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem index={1} className="timeline-item">
            <TimelineContent>
              <TimelineDate>April 6, 2025</TimelineDate>
              <TimelineTitle>The Proposal</TimelineTitle>
              <TimelineDescription>
                The day our hearts first connected, marking the beginning of our beautiful journey together.
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem index={2} className="timeline-item">
            <TimelineContent>
              <TimelineDate>April 16, 2025</TimelineDate>
              <TimelineTitle>First Birthday Celebration- Cyra</TimelineTitle>
              <TimelineDescription>
                  Celebrating Cyra's birthday with love, laughter, and unforgettable memories. And Cyra didn't cried on this day.
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem index={3} className="timeline-item">
            <TimelineContent>
              <TimelineDate>May 2025</TimelineDate>
              <TimelineTitle>Growing Stronger</TimelineTitle>
              <TimelineDescription>
                Our bond deepens as we share more moments, dreams, and promises of forever.
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        </TimelineWrapper>
      </TimelineSection>
    </ScrollContainer>
  );
};
