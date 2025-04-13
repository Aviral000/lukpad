// File: src/components/Hero.js
import React, { useEffect } from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  height: 100vh;
  background: linear-gradient(135deg, rgba(255,107,107,0.8) 0%, rgba(78,205,196,0.8) 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  color: white;
`;

const HeroContent = styled.div`
  z-index: 2;
  max-width: 800px;
`;

const Title = styled.h1`
  font-family: 'Pacifico', cursive;
  font-size: 4rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  animation: fadeIn 2s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  margin-bottom: 30px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  animation: fadeIn 2s ease-in-out 0.5s backwards;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ScrollDown = styled.a`
  position: absolute;
  bottom: 30px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  animation: bounce 2s infinite;
  color: white;
  text-decoration: none;

  &::after {
    content: '❤';
    font-size: 2rem;
    margin-top: 5px;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-20px); }
    60% { transform: translateY(-10px); }
  }
`;

const FloatingHeartsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const FloatingHeart = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  transform: rotate(45deg);
  animation: floatUp ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  left: ${props => props.left}%;
  opacity: ${props => props.opacity};

  &::before, &::after {
    content: '';
    width: 20px;
    height: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    position: absolute;
  }

  &::before {
    top: -10px;
    left: 0;
  }

  &::after {
    top: 0;
    left: -10px;
  }

  @keyframes floatUp {
    0% { transform: translateY(100vh) rotate(45deg) scale(0.2); opacity: 1; }
    100% { transform: translateY(-20vh) rotate(45deg) scale(1.5); opacity: 0; }
  }
`;

export function Hero() {
  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
      const href = event.currentTarget.getAttribute('href');
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };

    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
      link.addEventListener('click', handleScroll);
    });

    return () => {
      scrollLinks.forEach(link => {
        link.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 5,
    opacity: 0.2 + Math.random() * 0.8
  }));

  return (
    <HeroSection id="hero">
      <FloatingHeartsContainer>
        {hearts.map(heart => (
          <FloatingHeart 
            key={heart.id}
            left={heart.left}
            duration={heart.duration}
            delay={heart.delay}
            opacity={heart.opacity}
          />
        ))}
      </FloatingHeartsContainer>
      <HeroContent>
        <Title>Avi & Cyra</Title>
        <Subtitle>Two hearts, one love, across two nations</Subtitle>
      </HeroContent>
      <ScrollDown href="#about">Scroll Down</ScrollDown>
    </HeroSection>
  );
}
