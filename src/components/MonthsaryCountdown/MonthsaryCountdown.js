import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import Countdown from 'react-countdown';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const StarField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Star = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  opacity: ${props => props.opacity};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  animation: twinkle ${props => props.duration}s ease-in-out infinite;

  @keyframes twinkle {
    0%, 100% { opacity: ${props => props.opacity}; }
    50% { opacity: ${props => props.opacity * 0.3}; }
  }
`;

const ShootingStar = styled.div`
  position: absolute;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
  transform: rotate(${props => props.angle}deg);
  filter: blur(1px);
  border-radius: 100px;
  opacity: 0;
  z-index: 1;
`;

const CountdownContainer = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: 40px;
`;

const CountdownTitle = styled.h1`
  font-family: 'Dancing Script', cursive;
  font-size: 5rem;
  color: white;
  margin-bottom: 30px;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const HeartIcon = styled.span`
  color: #ff6b6b;
  animation: pulse 1.5s infinite;
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`;

const DateDisplay = styled.div`
  font-size: 1.8rem;
  color: #f8d6ff;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const TimeUnits = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeValue = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 
              inset 0 -5px 10px rgba(0, 0, 0, 0.1),
              0 0 20px rgba(255, 107, 107, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, 
                rgba(255, 255, 255, 0.1) 0%, 
                rgba(255, 255, 255, 0) 50%);
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
`;

const TimeLabel = styled.div`
  font-size: 0.9rem;
  color: #d3b7ff;
  margin-top: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MessageContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(5deg);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: perspective(1000px) rotateX(0deg);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
                #ff6b6b, #ffc5c5, #b8e0ff, #6b9fff, 
                #c264fe, #ff71c5, #ff6b6b);
    border-radius: 22px;
    z-index: -1;
    opacity: 0.7;
    animation: gradientBorder 3s linear infinite;
    background-size: 400% 400%;
  }
  
  @keyframes gradientBorder {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const DaysLeftHeader = styled.div`
  font-family: 'Dancing Script', cursive;
  font-size: 2.5rem;
  color: #ffda85;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 218, 133, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MessageContent = styled.div`
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  
  strong {
    color: #ffb8d9;
    font-weight: 600;
    display: inline-block;
    animation: highlight 2s infinite;
  }
  
  @keyframes highlight {
    0%, 100% { transform: scale(1); color: #ffb8d9; }
    50% { transform: scale(1.05); color: #ffd6e7; }
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HeartParticle = styled.div`
  position: absolute;
  color: #ff6b6b;
  font-size: ${props => props.size}px;
  opacity: 0;
  z-index: 1;
  text-shadow: 0 0 5px rgba(255, 107, 107, 0.5);
`;

const FloatingHearts = () => {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 15 + 10,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5
  }));

  useEffect(() => {
    hearts.forEach(heart => {
      const el = document.getElementById(`heart-${heart.id}`);
      if (el) {
        gsap.to(el, {
          y: -Math.random() * 300 - 100,
          x: Math.random() * 100 - 50,
          rotation: Math.random() * 360,
          opacity: 0,
          duration: heart.duration,
          delay: heart.delay,
          ease: "power1.out",
          repeat: -1,
          onStart: () => {
            gsap.set(el, { 
              y: 0, 
              opacity: Math.random() * 0.5 + 0.2,
              left: `${Math.random() * 100}%`,
              top: '100%'
            });
          }
        });
      }
    });
  }, [hearts]);

  return (
    <>
      {hearts.map(heart => (
        <HeartParticle
          key={heart.id}
          id={`heart-${heart.id}`}
          size={heart.size}
          style={{ left: `${heart.left}%`, top: `${heart.top}%` }}
        >
          ❤️
        </HeartParticle>
      ))}
    </>
  );
};

const StarryBackground = () => {
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.3,
    duration: Math.random() * 3 + 2
  }));

  const shootingStars = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    top: Math.random() * 50,
    left: Math.random() * 70,
    angle: Math.random() * 45 - 30,
    delay: i * 5 + Math.random() * 10
  }));

  useEffect(() => {
    shootingStars.forEach(star => {
      const el = document.getElementById(`shooting-star-${star.id}`);
      if (el) {
        gsap.to(el, {
          x: 500,
          opacity: 1,
          duration: 1.5,
          delay: star.delay,
          ease: "power1.in",
          repeat: -1,
          repeatDelay: 20 + Math.random() * 30,
          onStart: () => {
            gsap.set(el, { 
              x: -100, 
              opacity: 0,
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 70}%`,
              rotation: Math.random() * 45 - 30
            });
          }
        });
      }
    });
  }, [shootingStars]);

  return (
    <StarField>
      {stars.map(star => (
        <Star
          key={star.id}
          size={star.size}
          top={star.top}
          left={star.left}
          opacity={star.opacity}
          duration={star.duration}
        />
      ))}
      
      {shootingStars.map(star => (
        <ShootingStar
          key={star.id}
          id={`shooting-star-${star.id}`}
          top={star.top}
          left={star.left}
          angle={star.angle}
        />
      ))}
    </StarField>
  );
};

export function MonthsaryCountdown() {
  // Messages for each day
  const messages = [
    // Day 9 (0 index for April 27)
    {
      days: 9,
      text: "**Hey my beautiful Cyra,** Only **9 days** left until we celebrate our very first month together! Every single day with you feels like the best part of my life, and I can't wait to celebrate so many months and years more with you. **You are my today, my tomorrow, and every day after that.** 💖 I love you endlessly, my sweatheart! 🌸✨"
    },
    // Day 8 (April 28)
    {
      days: 8,
      text: "**Good morning, my little sunshine Cyra!** Just **8 days** now, can you believe it? If loving you was a sport, I'd already be a gold medalist. 🏅😂 I'm so excited to celebrate our beginning — the most beautiful beginning of my life. **You're my favorite notification, my favorite feeling, and my favorite future.** 🌸"
    },
    // Day 7 (April 29)
    {
      days: 7,
      text: "**Hi my darling Cyraaa,** A whole **week left**! 7 magical days until we officially celebrate 1 month of craziness, love, and unlimited cheesiness. 🧀💕 If my heart had legs, it would be doing a happy dance right now. 🕺 **You are the greatest \"what if\" that became my best \"yes.\"** Counting days, counting minutes, counting stars — until I can tell you again: *I love you to the moon and beyond!* 🌙✨"
    },
    // Day 6 (April 30)
    {
      days: 6,
      text: "**Hey cutest girl alive,** **6 days**... and my excitement is already eating my brain. 🤯😂 Thank you for being the calm to my chaos, the sweet to my spicy, and the best part of my every day. **You're not just my better half, you're the best half of everything good in my life.** 🥹💕"
    },
    // Day 5 (May 1)
    {
      days: 5,
      text: "**Sweetest Cyra,** **5 days** left! If love were a pizza, you'd be the extra cheese I never knew I needed but now can't live without. 🍕😂 You complete me in ways I never imagined. **And this is just the beginning of our beautiful forever.** I love you more than all the stars combined! 🌟"
    },
    // Day 4 (May 2)
    {
      days: 4,
      text: "**Good morning my sleepy beauty,** Only **4 more days** until we hit 1 month of making each other laugh, cry (happy tears only), and fall in love deeper every single day. You're my good morning, my good night, and every \"can't stop smiling\" moment in between. **Life before you was black-and-white. Life with you is the most colorful, craziest, happiest painting.** 🎨"
    },
    // Day 3 (May 3)
    {
      days: 3,
      text: "**My Cyra, my heart, my home,** **3 days** left! I feel like a little kid waiting for Christmas morning. 🎁😂 Every time I think of you, my heart does a little somersault. **You're the most beautiful chapter that God ever decided to write into my life story.** 📖❤️"
    },
    // Day 2 (May 4)
    {
      days: 2,
      text: "**Babe,** Just **2 days**! I don't need coffee anymore because the thought of you gives me all the energy I need. ☕️😂 Thank you for making my life so much sweeter, warmer, and sillier. **Being loved by you is my favorite blessing.** And loving you is my favorite job. 😘"
    },
    // Day 1 (May 5)
    {
      days: 1,
      text: "**My love, my Cyra,** Only **1 day** left! ONE! 🤯💛 I swear even my pillow knows your name now because I talk about you before I sleep. 😂 Thank you for being the dream I never want to wake up from. **Tomorrow, we celebrate our first month... and a lifetime of togetherness ahead.** I love you more than yesterday, but less than tomorrow. 🫶"
    },
    // Day 0 (May 6)
    {
      days: 0,
      text: "**Happy 1st Month Anniversary, my Cyra!** 🎉💖 Exactly 30 days ago, I found a love so pure, so crazy, so beautiful, it made my whole life brighter. Thank you for choosing me. Thank you for loving me. **You are my forever person.** This is just the first of millions of months, my love. Let's keep loving, keep laughing, keep growing — together, forever and beyond. 👫✨ **I love you infinity times infinity!** ♾️💛🌸"
    }
  ];

  // The anniversary date - May 6, 2025
  const anniversaryDate = new Date(2025, 4, 6); // Month is 0-indexed (4 = May)
  
  // Current date to determine which message to show
  const [now, setNow] = useState(new Date());
  const [remainingDays, setRemainingDays] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(null);
  const messageRef = useRef(null);

  // Update the current date every hour to keep the date current
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 3600000); // update every hour
    
    return () => clearInterval(interval);
  }, []);

  // Calculate days remaining and set the appropriate message
  useEffect(() => {
    const timeRemaining = anniversaryDate.getTime() - now.getTime();
    const daysLeft = Math.max(0, Math.ceil(timeRemaining / (1000 * 60 * 60 * 24)));
    setRemainingDays(daysLeft);
    
    // Find the message for today's countdown
    const messageForToday = messages.find(msg => msg.days === daysLeft);
    setCurrentMessage(messageForToday || messages[messages.length - 1]);
  }, [now]);

  // Apply simple animations when the message changes
  useEffect(() => {
    if (messageRef.current && currentMessage) {
      // Simple fade-in animation for the message
      gsap.fromTo(
        messageRef.current,
        { 
          opacity: 0, 
          y: 30 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power2.out" 
        }
      );
    }
  }, [currentMessage]);

  // Format message with markdown-like syntax
  const formatMessage = (text) => {
    // Replace **bold** with <strong>bold</strong>
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace *italic* with <em>italic</em>
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    return formattedText;
  };

  // Countdown renderer component
  const countdownRenderer = ({ days, hours, minutes, seconds }) => (
    <TimeUnits>
      <TimeUnit>
        <TimeValue>{days}</TimeValue>
        <TimeLabel>Days</TimeLabel>
      </TimeUnit>
      <TimeUnit>
        <TimeValue>{hours}</TimeValue>
        <TimeLabel>Hours</TimeLabel>
      </TimeUnit>
      <TimeUnit>
        <TimeValue>{minutes}</TimeValue>
        <TimeLabel>Minutes</TimeLabel>
      </TimeUnit>
      <TimeUnit>
        <TimeValue>{seconds}</TimeValue>
        <TimeLabel>Seconds</TimeLabel>
      </TimeUnit>
    </TimeUnits>
  );

  // Format date for display
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <PageContainer>
      <StarryBackground />
      <FloatingHearts />

      <CountdownContainer>
        <CountdownTitle>Our First Month <HeartIcon>❤️</HeartIcon></CountdownTitle>
        
        <DateDisplay>
          {formatDate(anniversaryDate)}
        </DateDisplay>
        
        <Countdown 
          date={anniversaryDate}
          renderer={countdownRenderer}
        />
      </CountdownContainer>
      
      {currentMessage && (
        <MessageContainer>
          <DaysLeftHeader>✨ {currentMessage.days} {currentMessage.days === 1 ? 'Day' : 'Days'} Left ✨</DaysLeftHeader>
          <MessageContent 
            ref={messageRef}
            dangerouslySetInnerHTML={{ __html: formatMessage(currentMessage.text) }}
          />
        </MessageContainer>
      )}
    </PageContainer>
  );
}
