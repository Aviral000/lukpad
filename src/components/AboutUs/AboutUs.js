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
`;

const Person = styled.div`
  flex: 1;
  min-width: 300px;
  text-align: center;
  transform: translateY(50px);
  opacity: 0;
  transition: all 0.3s ease-in-out;
  
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

const HeartConnector = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(50px);
  opacity: 0;
  transition: all 0.3s ease-in-out;
  
  &.visible {
    transform: translateY(0);
    opacity: 1;
  }
`;

const HeartIcon = styled.div`
  font-size: 4rem;
  color: var(--primary-color);
  animation: pulse 1.5s infinite;
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

export function AboutUs() {
  const personRef1 = useRef(null);
  const personRef2 = useRef(null);
  const heartRef = useRef(null);

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
    if (heartRef.current) observer.observe(heartRef.current);

    return () => {
      if (personRef1.current) observer.unobserve(personRef1.current);
      if (personRef2.current) observer.unobserve(personRef2.current);
      if (heartRef.current) observer.unobserve(heartRef.current);
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
        
        <HeartConnector ref={heartRef} className="heart-connector">
          <HeartIcon>❤</HeartIcon>
        </HeartConnector>
        
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
