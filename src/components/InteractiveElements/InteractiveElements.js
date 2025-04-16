import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import Countdown from 'react-countdown';
import Confetti from 'react-confetti';
import LoveLetter from '../../Assets/Audio/love-letter-312044.mp3';
import { LoveDiary } from '../LoveDiary';

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

const MusicPlayer = styled.div`
  position: fixed;
  top: 100px;
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

// Custom renderer for the countdown component
const CountdownRenderer = ({ days, hours, minutes, seconds, completed, onComplete }) => {
  // Only trigger onComplete if it's a genuine completion, not on first render
  useEffect(() => {
    if (completed && onComplete) {
      onComplete();
    }
  }, [completed, onComplete]);

  if (completed) {
    return <span>Happy Anniversary! ❤</span>;
  } else {
    return (
      <span>
        Next {days > 60 ? 'Month' : 'Month'} Anniversary: {days}d {hours}h {minutes}m {seconds}s ❤
      </span>
    );
  }
};

export function InteractiveElements() {
  // Relationship start date: April 6, 2025
  const startDate = useMemo(() => new Date(2025, 3, 6), []); // Month is 0-indexed
  
  // Stats states
  const [totalDays, setTotalDays] = useState(0);
  const [monthsCompleted, setMonthsCompleted] = useState(0);
  const [yearsCompleted, setYearsCompleted] = useState(0);
  
  // Anniversary states
  const [anniversaryType, setAnniversaryType] = useState('month');
  const [nextAnniversaryDate, setNextAnniversaryDate] = useState(null); // Initialize as null
  
  // Celebration states
  const [showCelebration, setShowCelebration] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Music player state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Flag to track if component has mounted
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Set isMounted to true once the component has mounted
    setIsMounted(true);
    
    // Create audio element
    audioRef.current = new Audio(LoveLetter);
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  useEffect(() => {
    // Only run once the component has mounted
    if (!isMounted) return;
    
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
      
      // Ensure next anniversary date is in the future
      if (nextDate <= today) {
        // If the calculated date is in the past, move to the next month
        nextDate.setMonth(nextDate.getMonth() + 1);
      }
      
      setNextAnniversaryDate(nextDate);
      return nextDate;
    };
    
    updateRelationshipStats();
    
    // Update stats every day
    const statsInterval = setInterval(updateRelationshipStats, 86400000); // 24 hours
    
    return () => {
      clearInterval(statsInterval);
    };
  }, [startDate, isMounted]);
  
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
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
  
  const handleCountdownComplete = () => {
    // Trigger celebration when countdown reaches zero
    triggerCelebration();
    
    // Update stats and calculate next anniversary
    const today = new Date();
    
    // Calculate next anniversary date
    let nextDate = new Date(startDate);
    let months = (today.getFullYear() - startDate.getFullYear()) * 12;
    months += today.getMonth() - startDate.getMonth() + 1;
    
    nextDate.setMonth(startDate.getMonth() + months);
    setNextAnniversaryDate(nextDate);
  };
  
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
  
  // Don't render anything if nextAnniversaryDate hasn't been set yet
  if (!nextAnniversaryDate) {
    return null;
  }
  
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
        <Countdown 
          date={nextAnniversaryDate}
          renderer={(props) => <CountdownRenderer {...props} onComplete={handleCountdownComplete} />}
        />
      </CountdownContainer>

      <LoveDiary />
      
      <MusicPlayer playing={isPlaying} onClick={toggleMusic}>
        <MusicIcon>♫</MusicIcon>
      </MusicPlayer>
    </>
  );
}
