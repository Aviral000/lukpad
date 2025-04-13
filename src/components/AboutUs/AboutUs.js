import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
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

const AboutUsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Person = styled.div`
  flex: 1;
  min-width: 300px;
  text-align: center;
  transform: translateY(50px);
  opacity: 0;
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 2;
  
  &.visible {
    transform: translateY(0);
    opacity: 1;
  }
`;

const PersonImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid ${props => props.borderColor || 'var(--primary-color)'};
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const PersonName = styled.h3`
  font-family: 'Pacifico', cursive;
  font-size: 2rem;
  margin-bottom: 10px;
  color: var(--dark-color);
`;

const PersonCountry = styled.p`
  color: ${props => props.color || 'var(--primary-color)'};
  font-size: 1.2rem;
  margin-bottom: 15px;
`;

const PersonDesc = styled.p`
  line-height: 1.6;
`;

// Connection elements
const ConnectionContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(50px);
  opacity: 0;
  transition: all 0.3s ease-in-out;
  z-index: 1;
  
  &.visible {
    transform: translateY(0);
    opacity: 1;
  }
`;

const RedString = styled.div`
  position: absolute;
  width: 200%;
  height: 3px;
  background-color: #e74c3c; /* Red string color */
  top: 50%;
  left: -50%;
  z-index: 1;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #e74c3c;
  }
  
  &::before {
    left: 0;
    top: -1.5px;
  }
  
  &::after {
    right: 0;
    top: -1.5px;
  }
`;

// String decorations
const StringKnot = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  border: 2px solid #e74c3c;
  border-radius: 50%;
  
  &.left {
    left: -100px;
    top: -7px;
    border-bottom-color: transparent;
    border-left-color: transparent;
    transform: rotate(45deg);
  }
  
  &.right {
    right: -100px;
    top: -7px;
    border-bottom-color: transparent;
    border-right-color: transparent;
    transform: rotate(-45deg);
  }
`;

const HeartIcon = styled.div`
  font-size: 4rem;
  color: var(--primary-color);
  animation: pulse 1.5s infinite;
  position: relative;
  z-index: 3;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  padding: 0 10px;
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

// Small heart decorations on the string
const StringHeart = styled.div`
  position: absolute;
  font-size: 1rem;
  color: #e74c3c;
  top: -10px;
  
  &.left {
    left: -70px;
  }
  
  &.right {
    right: -70px;
  }
`;

export function AboutUs() {
  const personRef1 = useRef(null);
  const personRef2 = useRef(null);
  const connectionRef = useRef(null);

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

    if (personRef1.current) observer.observe(personRef1.current);
    if (personRef2.current) observer.observe(personRef2.current);
    if (connectionRef.current) observer.observe(connectionRef.current);

    return () => {
      if (personRef1.current) observer.unobserve(personRef1.current);
      if (personRef2.current) observer.unobserve(personRef2.current);
      if (connectionRef.current) observer.unobserve(connectionRef.current);
    };
  }, []);

  return (
    <Section id="about">
      <SectionTitle>About Us</SectionTitle>
      <AboutUsContainer>
        <Person ref={personRef1} className="person">
          <PersonImg 
            src="https://i.ibb.co/gMJFVZJH/IMG-9805.jpg" 
            alt="Avi"
            borderColor="var(--primary-color)"
          />
          <PersonName>Avi</PersonName>
          <PersonCountry>from India</PersonCountry>
          <PersonDesc>
            Passionate, caring, and determined. A software developer with a heart full of love and adventure. Crossing oceans to be with the one he loves.
          </PersonDesc>
        </Person>
        
        <ConnectionContainer ref={connectionRef} className="heart-connector">
          <RedString>
            <StringKnot className="left" />
            <StringKnot className="right" />
            <StringHeart className="left">❤</StringHeart>
            <StringHeart className="right">❤</StringHeart>
          </RedString>
          <HeartIcon>❤</HeartIcon>
        </ConnectionContainer>
        
        <Person ref={personRef2} className="person">
          <PersonImg 
            src="https://i.ibb.co/GQb8bJx7/213319b3-ff82-4363-85f2-3b926b0aa5ec.jpg"
            alt="Cyra"
            borderColor="var(--secondary-color)"
          />
          <PersonName>Cyra</PersonName>
          <PersonCountry color="var(--secondary-color)">from Philippines</PersonCountry>
          <PersonDesc>
            Beautiful, kind, and loving. With a smile that lights up rooms and a heart that captured Avi's. Making every moment special across the distance.
          </PersonDesc>
        </Person>
      </AboutUsContainer>
    </Section>
  );
}

export default AboutUs;
