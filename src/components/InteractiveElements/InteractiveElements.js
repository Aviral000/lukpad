import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';

const CountdownContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(255, 107, 107, 0.9);
  padding: 15px;
  border-radius: 10px;
  color: white;
  font-family: 'Dancing Script', cursive;
  font-size: 1.2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const LoveButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  z-index: 10;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const LoveMessageBox = styled.div`
  position: fixed;
  bottom: 80px;
  left: 20px;
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  font-family: 'Dancing Script', cursive;
  font-size: 1.2rem;
  display: ${props => props.show ? 'block' : 'none'};
  z-index: 10;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: ${props => props.show ? 'translateY(0)' : 'translateY(20px)'};
  opacity: ${props => props.show ? '1' : '0'};
`;

const Heart = styled.span`
  color: var(--primary-color);
  font-size: 1.5rem;
`;

const MusicPlayer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${props => props.playing ? 'rgba(255, 107, 107, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  padding: 10px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const MusicIcon = styled.div`
  font-size: 24px;
  color: var(--primary-color);
`;

const CelebrationModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 100;
  text-align: center;
  max-width: 500px;
  width: 90%;
  display: ${props => props.show ? 'block' : 'none'};
`;

const ModalTitle = styled.h2`
  font-family: 'Pacifico', cursive;
  color: var(--primary-color);
  margin-bottom: 15px;
`;

const ModalContent = styled.p`
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  margin-bottom: 20px;
  line-height: 1.4;
`;

const ModalStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
`;

const StatBox = styled.div`
  background-color: rgba(255, 107, 107, 0.1);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  min-width: 120px;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--dark-color);
`;

const CloseButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    background-color: var(--secondary-color);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99;
  display: ${props => props.show ? 'block' : 'none'};
`;

export function InteractiveElements() {
  // Relationship start date: April 6, 2025
  const startDate = new Date(2025, 3, 6); // Month is 0-indexed
  
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Stats states
  const [totalDays, setTotalDays] = useState(0);
  const [monthsCompleted, setMonthsCompleted] = useState(0);
  const [yearsCompleted, setYearsCompleted] = useState(0);
  
  // Anniversary states
  const [anniversaryType, setAnniversaryType] = useState('month');
  const [nextAnniversaryDate, setNextAnniversaryDate] = useState(new Date());
  const [currentMonthCount, setCurrentMonthCount] = useState(0);
  
  // Celebration states
  const [showCelebration, setShowCelebration] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Love message state
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  
  // Music player state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const loveMessages = [
    "Every moment with you is a treasure I hold dear to my heart.",
    "Your love gives me strength to overcome any challenge.",
    "Distance means nothing when someone means everything.",
    "In a world full of people, my heart chose you.",
    "Your smile is my favorite part of any day.",
    "Loving you is as natural as breathing.",
    "You're the missing piece of my heart I never knew I needed.",
    "Meeting you was fate, becoming your boyfriend was a choice, but falling in love with you was beyond my control.",
    "If I had to choose between breathing and loving you, I would use my last breath to say 'I love you.'",
    "Every love story is beautiful, but ours is my favorite."
  ];
  
  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  useEffect(() => {
    // Calculate and update statistics
    const updateRelationshipStats = () => {
      const today = new Date();
      
      // Calculate total days together
      const timeDiff = today - startDate;
      const daysTogether = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      setTotalDays(daysTogether);
      
      // Calculate total months together
      let months = (today.getFullYear() - startDate.getFullYear()) * 12;
      months += today.getMonth() - startDate.getMonth();
      
      // Adjust for day of month
      if (today.getDate() < startDate.getDate()) {
        months--;
      }
      
      setMonthsCompleted(Math.max(0, months));
      
      // Calculate completed years
      const years = Math.floor(months / 12);
      setYearsCompleted(years);
      
      // Current month in the relationship (for next anniversary)
      setCurrentMonthCount(months);
      
      // Create next anniversary date
      let nextDate = new Date(startDate);
      
      // If approaching 1 year anniversary or any other year anniversary
      if ((months % 12) === 11) {
        // Next year anniversary
        nextDate.setFullYear(startDate.getFullYear() + Math.floor(months / 12) + 1);
        setAnniversaryType('year');
      } else {
        // Next month anniversary
        const nextMonthCount = months + 1;
        nextDate.setMonth(startDate.getMonth() + nextMonthCount);
        setAnniversaryType('month');
      }
      
      setNextAnniversaryDate(nextDate);
      return nextDate;
    };
    
    const anniversaryDate = updateRelationshipStats();
    
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const diff = anniversaryDate - now;
      
      if (diff <= 0) {
        // Recalculate for the next anniversary
        updateRelationshipStats();
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    // Update stats every day
    const statsInterval = setInterval(updateRelationshipStats, 86400000); // 24 hours
    
    return () => {
      clearInterval(countdownInterval);
      clearInterval(statsInterval);
    };
  }, [startDate]);
  
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const sendLoveMessage = () => {
    if (isTyping) return;
    
    setShowMessage(true);
    setCurrentMessage('');
    setIsTyping(true);
    
    const message = loveMessages[messageIndex];
    setMessageIndex((messageIndex + 1) % loveMessages.length);
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < message.length) {
        setCurrentMessage(prev => prev + message.charAt(i));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        
        // Hide message after some time
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      }
    }, 50);
  };
  
  const triggerCelebration = () => {
    setShowConfetti(true);
    setShowCelebration(true);
    
    // Stop confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };
  
  const closeCelebration = () => {
    setShowCelebration(false);
  };
  
  // Calculate celebration message
  // Calculate celebration message based on current timeline
  const getCelebrationMessage = () => {
    // If we haven't reached one month yet
    if (totalDays < 30) {
      return `We've been together for ${totalDays} wonderful days since April 6, 2025. Every day with you is a blessing! 🎉`;
    } 
    // If we've completed some months but not a year yet
    else if (yearsCompleted === 0 && monthsCompleted > 0) {
      return `We've been together for ${monthsCompleted} wonderful month${monthsCompleted > 1 ? 's' : ''} and ${totalDays - (monthsCompleted * 30)} days since April 6, 2025! 🎉`;
    }
    // If we've completed years
    else if (yearsCompleted > 0) {
      const extraMonths = monthsCompleted % 12;
      const monthText = extraMonths > 0 ? ` and ${extraMonths} month${extraMonths > 1 ? 's' : ''}` : '';
      return `We've been together for ${yearsCompleted} year${yearsCompleted > 1 ? 's' : ''}${monthText} since April 6, 2025! 🎉 Our love grows stronger each day.`;
    }
    // Fallback for any other case
    else {
      return `We've been on this wonderful journey together since April 6, 2025. ${totalDays} days of love and counting! 🎉`;
    }
  };
  
  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
        />
      )}
      
      <Overlay show={showCelebration} onClick={closeCelebration} />
      
      <CelebrationModal show={showCelebration}>
        <ModalTitle>
          {totalDays < 30 ? "Our Journey Together ❤️" : 
          (yearsCompleted === 0 ? `${monthsCompleted} Month${monthsCompleted > 1 ? 's' : ''} Together ❤️` : 
          `${yearsCompleted} Year${yearsCompleted > 1 ? 's' : ''} Together ❤️`)}
        </ModalTitle>
        <ModalContent>
          {getCelebrationMessage()}
        </ModalContent>
        
        <ModalStats>
          <StatBox>
            <StatNumber>{totalDays}</StatNumber>
            <StatLabel>Days Together</StatLabel>
          </StatBox>
          
          <StatBox>
            <StatNumber>{monthsCompleted}</StatNumber>
            <StatLabel>Months</StatLabel>
          </StatBox>
          
          <StatBox>
            <StatNumber>{yearsCompleted}</StatNumber>
            <StatLabel>Years</StatLabel>
          </StatBox>
        </ModalStats>
        
        <CloseButton onClick={closeCelebration}>Close</CloseButton>
      </CelebrationModal>
      
      <CountdownContainer onClick={triggerCelebration}>
        {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
          <>Happy Anniversary! ❤</>
        ) : (
          <>Next {anniversaryType === 'year' ? 'Year' : 'Month'} Anniversary: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s ❤</>
        )}
      </CountdownContainer>
      
      <LoveButton onClick={sendLoveMessage}>💌 Send Love</LoveButton>
      <LoveMessageBox show={showMessage}>
        {currentMessage}
        {!isTyping && showMessage && <Heart> ❤</Heart>}
      </LoveMessageBox>
      
      <MusicPlayer playing={isPlaying} onClick={toggleMusic}>
        <MusicIcon>♫</MusicIcon>
      </MusicPlayer>
    </>
  );
}

export default InteractiveElements;
