import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import Countdown from 'react-countdown';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a1929 0%, #213555 50%, #1a2639 100%);
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
  width: 120px;
  height: 3px;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
  transform: rotate(${props => props.angle}deg);
  filter: blur(1px);
  border-radius: 100px;
  opacity: 0;
  z-index: 1;
`;

const AirplaneTrail = styled.div`
  position: absolute;
  width: 150px;
  height: 2px;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%);
  transform: rotate(${props => props.angle}deg);
  filter: blur(1px);
  opacity: 0.7;
  z-index: 1;
`;

const Airplane = styled.div`
  position: absolute;
  font-size: 24px;
  transform: rotate(${props => props.angle}deg);
  opacity: 0;
  z-index: 2;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
`;

const CountdownContainer = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: 40px;
  animation: float 6s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
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

const LocationTag = styled.div`
  font-size: 1.3rem;
  color: #9ee9ff;
  margin-bottom: 25px;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  span {
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const TimeUnits = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 108%;
    height: 110%;
    top: -5%;
    left: -4%;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    z-index: -1;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
  }
  
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
              0 0 20px rgba(107, 185, 255, 0.3);
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
  color: #b7d4ff;
  margin-top: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const JourneyProgressContainer = styled.div`
  width: 80%;
  max-width: 600px;
  margin: 0 auto 30px;
  position: relative;
  z-index: 2;
`;

const JourneyProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

const JourneyProgressFill = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background: linear-gradient(90deg, #67d1fb 0%, #ff85e4 100%);
  border-radius: 10px;
  transition: width 1s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7));
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(500%); }
  }
`;

const JourneyLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  color: #cce4ff;
  font-size: 0.9rem;
`;

const AirplaneIcon = styled.div`
  position: absolute;
  top: -12px;
  left: ${props => props.progress}%;
  transform: translateX(-50%);
  font-size: 22px;
  color: white;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  animation: bounce 1.5s infinite;
  
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-5px); }
  }
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
    transform: perspective(1000px) rotateX(0deg) scale(1.02);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
                #67d1fb, #b8e0ff, #6b9fff, 
                #c264fe, #ff85e4, #67d1fb);
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
  color: #85dfff;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(133, 223, 255, 0.5);
  
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
    color: #b8d9ff;
    font-weight: 600;
    display: inline-block;
    animation: highlight 2s infinite;
  }
  
  @keyframes highlight {
    0%, 100% { transform: scale(1); color: #b8d9ff; }
    50% { transform: scale(1.05); color: #d6e6ff; }
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

const WorldMap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.15;
  background-image: url('https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/fonts/Simple-Line-Icons.woff2');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  pointer-events: none;
`;

const CloudElement = styled.div`
  position: absolute;
  font-size: ${props => props.size}px;
  color: white;
  opacity: 0.4;
  filter: blur(3px);
  z-index: 1;
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

const FlyingAirplane = () => {
  const airplaneRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const airplane = airplaneRef.current;
    const trail = trailRef.current;
    
    if (airplane && trail) {
      gsap.set([airplane, trail], { 
        top: '40%',
        left: '-5%',
        angle: 15
      });
      
      gsap.to(airplane, {
        left: '105%',
        opacity: 1,
        duration: 20,
        ease: "power1.inOut",
        repeat: -1,
        delay: 5,
        onStart: () => {
          gsap.set(airplane, { opacity: 1 });
        }
      });
      
      gsap.to(trail, {
        left: '103%',
        duration: 20,
        ease: "power1.inOut",
        repeat: -1,
        delay: 5
      });
    }
  }, []);

  return (
    <>
      <AirplaneTrail ref={trailRef} angle={15} />
      <Airplane ref={airplaneRef} angle={15}>✈️</Airplane>
    </>
  );
};

const FloatingClouds = () => {
  const clouds = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 30,
    top: Math.random() * 70 + 10,
    left: -20,
    speed: Math.random() * 50 + 50,
    delay: i * 10 + Math.random() * 30
  }));

  useEffect(() => {
    clouds.forEach(cloud => {
      const el = document.getElementById(`cloud-${cloud.id}`);
      if (el) {
        gsap.to(el, {
          left: '120%',
          duration: cloud.speed,
          delay: cloud.delay,
          ease: "none",
          repeat: -1,
          onStart: () => {
            gsap.set(el, { 
              left: '-20%',
              top: `${Math.random() * 70 + 10}%`,
            });
          }
        });
      }
    });
  }, [clouds]);

  return (
    <>
      {clouds.map(cloud => (
        <CloudElement
          key={cloud.id}
          id={`cloud-${cloud.id}`}
          size={cloud.size}
          style={{ top: `${cloud.top}%`, left: `${cloud.left}%` }}
        >
          ☁️
        </CloudElement>
      ))}
    </>
  );
};

export function FirstMeetCountdown() {
  // Messages for days
  const messages = [
    // More than 30 days
    {
      days: 31,
      text: "**My dearest Cyral,** The countdown begins for our first meeting! Time seems to move too slowly when you're waiting for something so beautiful to happen. Every day that passes brings us one step closer to finally being in each other's arms. **Love knows no distance, but soon we won't have to test that theory anymore.** I'm counting every heartbeat until I can see your beautiful smile in person. 💫✈️"
    },
    // 30 days
    {
      days: 30,
      text: "**Cyral, my love,** Just **one month** until I can finally hold your hand! 30 days might seem like forever, but we've already conquered so much more than this. I can't stop imagining how it will feel to finally be with you - to see your eyes light up in real time, to hear your laugh without any digital barriers between us. **Every mile between us is worth crossing for the love we share.** The countdown begins! ✨🌙"
    },
    // 25 days
    {
      days: 25,
      text: "**My beautiful Cyral,** **25 days** left on our countdown! I keep thinking about all the little moments we'll share - the first hug that will probably last forever, the first time we walk hand in hand, the first time I get to see your smile in person. **Our love story is about to begin its most beautiful chapter yet.** I'm planning and dreaming of every precious moment we'll create together. 💖✈️"
    },
    // 20 days
    {
      days: 20,
      text: "**Sweetheart Cyral,** **20 days** to go! Can you believe we're already here? I've been making lists of all the things I want to do with you, places I want to take you, moments I want to create. But honestly, even just sitting silently together would be the most perfect thing in the world. **Distance has taught us the value of presence, and soon we'll have that gift.** The universe conspired to bring us together, and in 20 days, we'll thank it in person. 🌌💫"
    },
    // 15 days
    {
      days: 15,
      text: "**My darling Cyral,** Only **15 days** left now! We're halfway there and my heart is already racing with excitement. I've been checking and rechecking my travel details, counting the hours, not just the days. **Our story has been written in text messages and video calls, but soon it will be written in shared sunsets and intertwined fingers.** I can't wait to bring you flowers that aren't just emoji. 🌸💕"
    },
    // 10 days
    {
      days: 10,
      text: "**My beautiful Cyral,** Just **10 days** until takeoff! Single digits tomorrow - can you believe it? I keep imagining that moment when I'll finally see you waiting for me. Will time freeze? Will words fail us? Or will it feel like we've never been apart? **Every dream I've ever had pales in comparison to the reality of meeting you.** I'm practically floating with anticipation! ✨✈️"
    },
    // 7 days
    {
      days: 7,
      text: "**Dearest Cyral,** Only **one week** left! My suitcase is already out, and I'm planning what to pack. I want to bring you something special, something that tells you how precious you are to me. **A love like ours deserves to be celebrated in person, and in just 7 days, that's exactly what we'll do.** This time next week, virtual hugs will be replaced by real ones. The thought alone makes my heart skip a beat! 💓🧳"
    },
    // 5 days
    {
      days: 5,
      text: "**My love Cyral,** **5 days** to go! I can't focus on anything else - my mind is constantly wandering to you, to us, to our upcoming meeting. I've checked my passport a thousand times, confirmed my flight details, and started the final countdown. **The stars have guided travelers for centuries, and now they're guiding me to you.** Soon, we'll be making memories that we'll treasure for a lifetime. 🌠💖"
    },
    // 3 days
    {
      days: 3,
      text: "**Cyral, my heart,** Just **3 more days**! I'm a bundle of excitement and nerves (the good kind!). I've triple-checked everything for my journey to you. **Soon, pixels will turn into reality, and screen time will become real time.** The universe has conspired to bring two souls together, and in 3 days, we'll finally see the magic happen. I'm counting down the hours, the minutes! 💫✈️"
    },
    // 2 days
    {
      days: 2,
      text: "**My beautiful Cyral,** **2 days** left! My bags are packed, my heart is ready, and my soul is yearning for you. I can hardly sleep from excitement! **Love found a way to connect us across distance, and now it's bringing us together in the most beautiful way.** Think of all the firsts we're about to experience together - our first hug, our first walk, our first sunset. The countdown is almost over, my love! 💕✨"
    },
    // 1 day
    {
      days: 1,
      text: "**My dearest Cyral,** **TOMORROW**! Just one more sleep until I'm on my way to you! My heart is racing, my countdown is almost complete, and my dreams are about to become reality. **Our love story is proof that when something is meant to be, the universe finds a way.** This time tomorrow, I'll be on my way to hold you in my arms. The wait has been worth every second for what we're about to begin. I love you endlessly, and I'll see you TOMORROW! 💖✈️🌙"
    },
    // 0 days
    {
      days: 0,
      text: "**TODAY IS THE DAY, CYRAL!** ✨✈️💖 The moment we've been waiting for is finally here! I'm on my way to you right now, my heart leading the way. Every mile I travel brings me closer to the most beautiful moment of my life - meeting you. **Our love has crossed oceans and time zones, and today, it erases all distance between us.** By the time you're reading this, I'm already in the sky, counting the minutes until I can finally hold you. Today, our forever begins in person. I love you more than words could ever express! 💫💕"
    }
  ];

  // The meeting date - October 18, 2025
  const meetingDate = new Date(2025, 9, 18); // Month is 0-indexed (9 = October)
  
  // Current date to determine which message to show
  const [now, setNow] = useState(new Date());
  const [remainingDays, setRemainingDays] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [journeyProgress, setJourneyProgress] = useState(0);
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
    const timeRemaining = meetingDate.getTime() - now.getTime();
    const daysLeft = Math.max(0, Math.ceil(timeRemaining / (1000 * 60 * 60 * 24)));
    setRemainingDays(daysLeft);
    
    // Calculate journey progress (as percentage)
    const totalJourneyDays = 60; // Assuming 60 days total journey
    const daysGone = Math.max(0, totalJourneyDays - daysLeft);
    const progress = Math.min(100, (daysGone / totalJourneyDays) * 100);
    setJourneyProgress(progress);
    
    // Find the message for today's countdown
    let messageForToday;
    
    if (daysLeft === 0) {
      messageForToday = messages.find(msg => msg.days === 0);
    } else if (daysLeft === 1) {
      messageForToday = messages.find(msg => msg.days === 1);
    } else if (daysLeft === 2) {
      messageForToday = messages.find(msg => msg.days === 2);
    } else if (daysLeft === 3) {
      messageForToday = messages.find(msg => msg.days === 3);
    } else if (daysLeft <= 5) {
      messageForToday = messages.find(msg => msg.days === 5);
    } else if (daysLeft <= 7) {
      messageForToday = messages.find(msg => msg.days === 7);
    } else if (daysLeft <= 10) {
      messageForToday = messages.find(msg => msg.days === 10);
    } else if (daysLeft <= 15) {
      messageForToday = messages.find(msg => msg.days === 15);
    } else if (daysLeft <= 20) {
      messageForToday = messages.find(msg => msg.days === 20);
    } else if (daysLeft <= 25) {
      messageForToday = messages.find(msg => msg.days === 25);
    } else if (daysLeft <= 30) {
      messageForToday = messages.find(msg => msg.days === 30);
    } else {
      messageForToday = messages.find(msg => msg.days === 31);
    }
    
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
      <FlyingAirplane />
      <FloatingHearts />
      <FloatingClouds />
      <WorldMap />

      <CountdownContainer>
        <CountdownTitle>First Meeting <HeartIcon>❤️</HeartIcon></CountdownTitle>
        
        <DateDisplay>
          {formatDate(meetingDate)}
        </DateDisplay>
        
        <LocationTag>
          <span>✈️</span> The day we finally meet in person <span>💫</span>
        </LocationTag>
        
        <Countdown 
          date={meetingDate}
          renderer={countdownRenderer}
        />
      </CountdownContainer>
      
      <JourneyProgressContainer>
        <JourneyProgressBar>
          <JourneyProgressFill progress={journeyProgress} />
          <AirplaneIcon progress={journeyProgress}>✈️</AirplaneIcon>
        </JourneyProgressBar>
        <JourneyLabels>
          <div>Journey Started</div>
          <div>Meeting Day</div>
        </JourneyLabels>
      </JourneyProgressContainer>
      
      {currentMessage && (
        <MessageContainer>
          <DaysLeftHeader>
            {remainingDays === 0 
              ? "✨ Today's The Day! ✨" 
              : `✨ ${remainingDays} ${remainingDays === 1 ? 'Day' : 'Days'} Left ✨`}
          </DaysLeftHeader>
          <MessageContent 
            ref={messageRef}
            dangerouslySetInnerHTML={{ __html: formatMessage(currentMessage.text) }}
          />
        </MessageContainer>
      )}
    </PageContainer>
  );
}
