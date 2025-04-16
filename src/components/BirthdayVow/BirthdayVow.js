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
  bottom: 30px;
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
  padding: 20px;
  overflow-y: auto;
  
  &.active {
    opacity: 1;
    pointer-events: all;
  }
  
  @media (max-width: 768px) {
    align-items: flex-start;
    padding: 15px;
  }
`;

const VowCardWrapper = styled.div`
  max-height: 90vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  width: 90%;
  max-width: 600px;
  margin: auto;
  scrollbar-width: thin;
  scrollbar-color: #ff6b6b #f5f5f5;
  
  /* For Chrome/Safari/Edge */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #ff6b6b;
    border-radius: 10px;
  }
  
  @media (max-height: 700px) {
    max-height: 85vh;
  }
  
  @media (max-width: 768px) {
    width: 95%;
    margin-top: 20px;
    max-height: 80vh;
  }
`;

const VowCard = styled.div`
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
  
  @media (max-width: 768px) {
    padding: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 15px 12px;
  }
`;

const BirthdayTitle = styled.h2`
  font-family: 'Pacifico', cursive;
  color: #ff6b6b;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease 0.3s both;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
`;

const VowText = styled.p`
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  line-height: 1.8;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease 0.6s both;
  white-space: pre-line; /* Preserves line breaks in the text */
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    line-height: 1.5;
  }
`;

const HeartIcon = styled.div`
  color: #ff6b6b;
  font-size: 3rem;
  text-align: center;
  margin: 20px 0;
  animation: ${heartBeat} 2s infinite;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin: 15px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin: 10px 0;
  }
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
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
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
  
  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
  }
`;

const Signature = styled.p`
  font-family: 'Pacifico', cursive;
  font-size: 1.3rem;
  color: #ff6b6b;
  text-align: right;
  margin-top: 20px;
  animation: ${fadeIn} 1s ease 0.9s both;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-top: 10px;
  }
`;

export const BirthdayVow = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showVow, setShowVow] = useState(false);
  const [countdown, setCountdown] = useState('');
  
  // Your birthday vow/promise text - customize this!
  const birthdayVow = `My dearest Cyra,

On your special day — the glorious day the universe gifted me a walking, talking bundle of joy, sass, and peanut addiction — I make these promises to you:

I promise to love you louder than your sneezes and deeper than our future vlogs go viral.
I swear on all the WiFi signals and long-distance calls — I will always be yours, buffering or not.
I promise to be your biggest fan, personal photographer, stand-up comedian, and forever teammate in the Couple Olympics.
I vow to hold your heart with more care than I hold my phone (and that's saying A LOT).
I promise to never get tired of saying "I love you," even if you make me say it in ten different accents and animal sounds.
I swear to be the human diary you can always scream into — even if you're mad at me for something I did in your dream.
I promise to travel any distance — sky, sea, signal loss — just to hear you say, “Babe, I’m hungry.”
I promise to support your dreams with my whole heart, and if your dream is to eat ice cream for dinner, I’ll join you.
I swear to never stop teasing you, laughing with you, and secretly recording your weirdest moments for future anniversary content.
I promise to protect you — from pain, from sadness, and from running out of your favorite snacks.
I vow to marry you, again and again, every single day — even when we're wrinkly and arguing about what movie to watch.

Cyra, you are my peace, my storm, my chaos, and my calm. My reason to become better, and my home — no matter where we are on the map.

Happy Birthday, my love. One day we’ll look back at all this — the calls, the memes, the plans, the dreams — and smile, because we turned it into a life worth vlogging about.

Now, go eat cake for two. One bite for you, one bite for your future husband who is absolutely, madly, forever in love with you.

The best is yet to come — and it has your name written all over it.

Forever yours, 
Aviral 💛`;


  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const unlockTime = new Date(now);
      unlockTime.setHours(0, 0, 0, 0); // 9:30 PM
      
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
        <VowCardWrapper>
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
        </VowCardWrapper>
      </VowContainer>
    </>
  );
};
