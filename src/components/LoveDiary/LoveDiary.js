import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pageFlip = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(-180deg); }
`;

// Styled Components
const DiaryButton = styled.button`
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
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    transform: scale(1.05);
    background-color: #e55c5c;
  }
`;

const BookIcon = styled.span`
  font-size: 1.2rem;
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
  opacity: ${props => props.show ? '1' : '0'};
  transition: opacity 0.5s ease;
`;

const BookContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px;
  height: 80vh;
  max-height: 600px;
  perspective: 1500px;
  z-index: 100;
  display: ${props => props.show ? 'block' : 'none'};
  animation: ${fadeIn} 0.5s ease;
`;

const Book = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateY(${props => props.isOpen ? '180deg' : '0deg'});
  transition: transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const BookCover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(135deg, #ff6b6b 0%, #e05252 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  backface-visibility: hidden;
  padding: 30px;
  color: white;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    pointer-events: none;
  }
`;

const BookInside = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fffbf6;
  border-radius: 10px;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  overflow: hidden;
  padding: 0;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.1);
`;

const PagesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1500px;
  transform-style: preserve-3d;
`;

const Page = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 40px;
  background-color: #fffbf6;
  background-image: 
    linear-gradient(#f1e6d0 1px, transparent 1px),
    linear-gradient(90deg, #f1e6d0 1px, transparent 1px);
  background-size: 20px 30px;
  color: #333;
  transition: transform 1s, z-index 0.5s;
  transform-origin: left center;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  box-shadow: ${props => props.isActive ? '0 0 30px rgba(0, 0, 0, 0.2)' : 'none'};
  z-index: ${props => props.zIndex};
  transform: ${props => props.flipped ? 'rotateY(-180deg)' : 'rotateY(0deg)'};
  
  /* Add page fold shadow */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(to right, rgba(0,0,0,0.05), transparent);
    pointer-events: none;
  }
`;

const BookTitle = styled.h2`
  font-family: 'Pacifico', cursive;
  font-size: 2.5rem;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const BookSubtitle = styled.p`
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  margin-top: 0;
`;

const HeartDecoration = styled.div`
  font-size: 3rem;
  margin: 20px 0;
  color: rgba(255, 255, 255, 0.8);
`;

const DiaryContent = styled.div`
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  line-height: 1.8;
  color: #333;
  white-space: pre-wrap;
  height: 100%;
  overflow-y: auto;
  padding-right: 15px;
  
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1e6d0;
    border-radius: 5px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 107, 107, 0.6);
    border-radius: 5px;
  }
`;

const DateEntry = styled.p`
  font-family: 'Dancing Script', cursive;
  font-weight: bold;
  font-size: 1.3rem;
  text-align: right;
  margin-bottom: 20px;
  color: #ff6b6b;
`;

const PageNumber = styled.div`
  position: absolute;
  bottom: 15px;
  font-family: 'Dancing Script', cursive;
  font-size: 1rem;
  color: #888;
  
  ${props => props.left ? 'left: 40px;' : 'right: 40px;'}
`;

const NavigationButtons = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  z-index: 10;
`;

const NavButton = styled.button`
  background: rgba(255, 107, 107, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: scale(1.1);
    background: rgba(255, 107, 107, 1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: scale(1);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${props => props.inside ? '#ff6b6b' : 'white'};
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 11;
  
  &:hover {
    transform: scale(1.2);
  }
`;

export function LoveDiary() {
  const [showBook, setShowBook] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [flippedPages, setFlippedPages] = useState([]);

  const diaryEntries = [
    {
      date: "April 6, 2025",
      content: `Dear Diary,

Today marks the beginning of the most beautiful chapter of my life. I asked Cyra to be my girlfriend, and she said yes! My heart is overflowing with joy and gratitude.

From the first moment we connected, I knew there was something special about her. Her smile, her kindness, the way she listens and understands me - everything about her captivates me.

Though we're separated by oceans and continents, I've never felt closer to anyone. It's incredible how someone so far away can feel so close to my heart.

I promise to cherish her, to make her feel loved every single day, and to work towards building a future where distance is just a memory.

This is just the beginning of our story, and I can't wait to fill these pages with our journey together.

With a heart full of love,
Avi`
    },
    {
      date: "April 10, 2025",
      content: `Dear Diary,

Four days into our relationship, and I find myself falling deeper in love with Cyra. Every morning begins with her messages, and every night ends with her voice. The time difference between India and the Philippines doesn't matter when your hearts beat as one.

Today, we had our first "virtual date." We cooked the same meal together over video call—a fusion of Indian and Filipino cuisine. Her laugh when I nearly burned the rice was the most beautiful sound I've ever heard.

We're already making plans. Dreams of meeting in person, traveling together, and someday, building a life where we wake up next to each other every morning.

Distance is teaching us patience and appreciation. Every moment we share becomes precious, every conversation a treasure.

With love that grows stronger each day,
Avi`
    },
    {
      date: "April 14, 2025",
      content: `Dear Diary,

Today marks another beautiful day in my journey with Cyra. Every morning, I wake up with her on my mind, and every night, I fall asleep with her in my heart. The distance between us may be great, but our love bridges any gap.

I find myself smiling at random moments throughout the day, remembering her laugh, her voice, the way she looks at me. It's incredible how someone so far away can feel so close.

We shared our dreams today—the places we want to visit together, the life we want to build. From the beaches of the Philippines to the mountains of India, we've mapped out our adventures. Someday soon, these dreams will become memories we create together.

What amazes me most is how perfectly we complement each other. When I'm feeling down, she knows exactly what to say to lift my spirits. When I'm excited, she celebrates with me wholeheartedly. We've found a rare harmony that most people spend lifetimes searching for.

The countdown until we're together keeps me going. Each passing day brings us one step closer to holding each other, to turning our virtual connection into a physical reality.

Until then, I'll cherish every call, every message, every moment we share across the distance. My love for her grows stronger with each passing day.

Cyra Camille—the most beautiful name, belonging to the most beautiful soul. I am endlessly grateful that fate brought us together.

With all my love,
Avi`
    }
  ];
  
  const handleOpenBook = () => {
    setShowBook(true);
    setCurrentPage(0);
    setFlippedPages([]);
    setTimeout(() => {
      setIsBookOpen(true);
    }, 100);
  };
  
  const handleCloseBook = () => {
    setIsBookOpen(false);
    setTimeout(() => {
      setShowBook(false);
      setCurrentPage(0);
      setFlippedPages([]);
    }, 1000);
  };
  
  const nextPage = () => {
    if (currentPage < diaryEntries.length - 1) {
      // Add current page to flipped pages
      setFlippedPages(prev => [...prev, currentPage]);
      // Move to next page after animation
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
      }, 500);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 0) {
      // Remove last flipped page
      setFlippedPages(prev => prev.filter(p => p !== currentPage - 1));
      // Move to previous page
      setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <>
      <DiaryButton onClick={handleOpenBook}>
        <BookIcon>📖</BookIcon> Love Diary
      </DiaryButton>
      
      <Overlay show={showBook} onClick={handleCloseBook} />
      
      <BookContainer show={showBook}>
        <Book isOpen={isBookOpen}>
          <BookCover>
            <CloseButton onClick={handleCloseBook}>×</CloseButton>
            <BookTitle>Our Love Story</BookTitle>
            <HeartDecoration>❤</HeartDecoration>
            <BookSubtitle>Avi & Cyra</BookSubtitle>
          </BookCover>
          
          <BookInside>
            <CloseButton inside onClick={handleCloseBook}>×</CloseButton>
            
            <PagesContainer>
              {diaryEntries.map((entry, index) => (
                <Page 
                  key={index}
                  zIndex={diaryEntries.length - index}
                  flipped={flippedPages.includes(index)}
                  isActive={currentPage === index}
                >
                  <DateEntry>{entry.date}</DateEntry>
                  <DiaryContent>
                    {entry.content}
                  </DiaryContent>
                  <PageNumber left={index % 2 === 0}>{index + 1}</PageNumber>
                </Page>
              ))}
            </PagesContainer>
            
            <NavigationButtons>
              <NavButton 
                onClick={prevPage} 
                disabled={currentPage === 0}
                aria-label="Previous page"
              >
                ←
              </NavButton>
              <NavButton 
                onClick={nextPage} 
                disabled={currentPage === diaryEntries.length - 1}
                aria-label="Next page"
              >
                →
              </NavButton>
            </NavigationButtons>
          </BookInside>
        </Book>
      </BookContainer>
    </>
  );
}

export default LoveDiary;
