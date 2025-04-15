import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const glow = keyframes`
  0% { box-shadow: 0 0 10px rgba(255, 107, 107, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.8); }
  100% { box-shadow: 0 0 10px rgba(255, 107, 107, 0.5); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const heartBeat = keyframes`
  0% { transform: scale(1); }
  15% { transform: scale(1.3); }
  30% { transform: scale(1); }
  45% { transform: scale(1.3); }
  60% { transform: scale(1); }
  100% { transform: scale(1); }
`;

const flyIn = keyframes`
  0% { opacity: 0; transform: translate(-200px, 100px) rotate(-30deg); }
  100% { opacity: 1; transform: translate(0, 0) rotate(0); }
`;

const BirthdaySurpriseContainer = styled.div`
  position: fixed;
  bottom: 90px;
  right: 30px;
  z-index: 1000;
  cursor: pointer;
`;

const GiftBox = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ff6b6b 0%, #e05252 100%);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
  position: relative;
  animation: ${glow} 2s infinite;
  transition: all 0.5s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 10px;
    background: linear-gradient(90deg, #ffbe0b, #fb5607);
    border-radius: 5px 5px 0 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 80%;
    height: 80%;
    border: 2px dashed rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    animation: ${heartBeat} 4s infinite;
  }
`;

const CountdownIndicator = styled.div`
  position: absolute;
  top: -20px;
  right: -20px;
  background-color: #ffbe0b;
  color: #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  animation: ${heartBeat} 2s infinite;
`;

const VowContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
  
  &.active {
    opacity: 1;
    pointer-events: all;
  }
`;

const VowCard = styled.div`
  width: 90%;
  max-width: 600px;
  background: url('https://i.pinimg.com/originals/74/b6/f9/74b6f956d73c51929b8447c82f55a3df.jpg') no-repeat center center;
  background-size: cover;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  position: relative;
  animation: ${fadeIn} 1s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 15px;
    z-index: -1;
  }
`;

const BirthdayTitle = styled.h2`
  font-family: 'Pacifico', cursive;
  color: #ff6b6b;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease 0.3s both;
`;

const VowText = styled.p`
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  line-height: 1.8;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease 0.6s both;
`;

const HeartIcon = styled.div`
  color: #ff6b6b;
  font-size: 3rem;
  text-align: center;
  margin: 20px 0;
  animation: ${heartBeat} 2s infinite;
`;

const FlowerDecoration = styled.div`
  position: absolute;
  font-size: 2rem;
  color: #ff6b6b;
  animation: ${flyIn} 1s ease both;
  
  &.top-left {
    top: 10px;
    left: 10px;
    animation-delay: 0.8s;
  }
  
  &.top-right {
    top: 10px;
    right: 10px;
    animation-delay: 1s;
    transform: rotate(45deg);
  }
  
  &.bottom-left {
    bottom: 10px;
    left: 10px;
    animation-delay: 1.2s;
  }
  
  &.bottom-right {
    bottom: 10px;
    right: 10px;
    animation-delay: 1.4s;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    color: #ff6b6b;
    transform: scale(1.2);
  }
`;

const Signature = styled.p`
  font-family: 'Pacifico', cursive;
  font-size: 1.3rem;
  color: #ff6b6b;
  text-align: right;
  margin-top: 20px;
  animation: ${fadeIn} 1s ease 0.9s both;
`;

export function BirthdayVow() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showVow, setShowVow] = useState(false);
  const [countdown, setCountdown] = useState('');
  
  // Your birthday vow/promise text - customize this!
  const birthdayVow = `My dearest Cyra,

On your special day, I want to make these promises to you:

I promise to be your constant supporter, your biggest fan, and your safe haven. 
I promise to love you more with each passing day, through every timezone and across every mile.
I promise to hold your dreams as gently as I would hold my own.
I promise to be patient as we navigate the distance, knowing that someday soon, it will only be a memory.
I promise to be the reason you smile, even on your hardest days.
I promise to cherish every moment we share, whether virtually or side by side.
I promise that no matter how many birthdays we celebrate, I will never stop trying to make each one more special than the last.

You are the most precious gift in my life, and I am grateful for another year of loving you.

Happy Birthday, my love. The best is yet to come.`;

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const unlockTime = new Date(now);
      unlockTime.setHours(21, 30, 0, 0); // 9:30 PM
      
      // For testing - uncomment this to make it unlock soon
      // unlockTime.setMinutes(now.getMinutes() + 1);
      
      // Calculate time remaining
      const timeRemaining = unlockTime.getTime() - now.getTime();
      
      if (timeRemaining <= 0) {
        setIsUnlocked(true);
        setCountdown('Now!');
      } else {
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 0) {
          setCountdown(`${hours}h ${minutes}m`);
        } else {
          setCountdown(`${minutes}m`);
        }
      }
    };
    
    checkTime();
    const interval = setInterval(checkTime, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const handleClick = () => {
    if (isUnlocked) {
      setShowVow(true);
    }
  };
  
  return (
    <>
      <BirthdaySurpriseContainer onClick={handleClick}>
        <GiftBox>
          🎁
          <CountdownIndicator>{countdown}</CountdownIndicator>
        </GiftBox>
      </BirthdaySurpriseContainer>
      
      <VowContainer className={showVow ? 'active' : ''}>
        <VowCard>
          <CloseButton onClick={() => setShowVow(false)}>×</CloseButton>
          
          <FlowerDecoration className="top-left">🌸</FlowerDecoration>
          <FlowerDecoration className="top-right">🌹</FlowerDecoration>
          <FlowerDecoration className="bottom-left">🌷</FlowerDecoration>
          <FlowerDecoration className="bottom-right">🌺</FlowerDecoration>
          
          <BirthdayTitle>Happy Birthday, Cyra!</BirthdayTitle>
          <HeartIcon>❤️</HeartIcon>
          
          <VowText>{birthdayVow}</VowText>
          
          <Signature>With all my love, Avi</Signature>
        </VowCard>
      </VowContainer>
    </>
  );
};
