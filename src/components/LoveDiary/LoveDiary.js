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
    },
    {
      date: "April 24, 2025",
      content: `Dear Diary,
  
  My sweetest Cyra,
  
  I seriously can’t believe that in just 11 days… it'll be one whole month since you officially became mine — and somehow, even now, every time I think about it, I feel that same excitement I had when you first messaged me, asking why I looked heartbroken. I swear, you had no idea what kind of love story you were about to walk into. Or maybe you did — because you're magic like that. ✨
  
  This one month… has felt like a lifetime and a second, all at once. Every good morning text, every silly joke, every random “are you eating?” moment — they’ve become little rituals that my heart has fallen in love with. Even your sleepy voice on call feels like home now.
  
  And I know we haven’t even met in person yet, but isn’t it crazy how you already feel like the most familiar part of me? I’m here in India… you're over there in the Philippines… and yet somehow, you live rent-free in my heart and mind 24/7. 🫠
  
  I love how your laugh makes me feel like everything’s okay. I love how you care so deeply, even when you pretend you don’t. I love how strong and soft you are at the same time. I love how, even when we fight or tease each other, we come back stronger. And I love how even your silence speaks to me.
  
  Cyra, I don’t know what I did right to find you — but I do know this: you’re the reason I now look forward to every tomorrow.
  
  When we hit that 1-month mark… I’ll be celebrating way more than just a date. I’ll be celebrating the little universe we’ve built. The one where an Indian boy and a Filipino girl beat the odds and found love between pixels and timezones.
  
  So, here’s me — 11 days early — just reminding you that no matter what life throws at us… I’ll always choose us. I’ll wait, I’ll grow, I’ll love, and I’ll be the man you deserve.
  
  You’re not just my girlfriend, Cyra. You’re my favorite notification, my daily smile, my peace, my peanut baby, and my everything.
  
  I love you. With every bit of me.
  
  Here’s to us… and to all the months, years, and lifetimes to come. 🫶
  
  Yours — fully, stupidly, and forever,
  Avi 💛`
    },
    {
      date: "April 26, 2025",
      content: `Dear Diary,
  
  Hey my dearest Cyra,
  
  I can't believe it, but it's happening... in just 9 days, 6 hours, and a few magical minutes, it'll be our very first month together.
  One whole month since destiny, luck, and maybe a little bit of Cupid’s overtime job brought us together. 🏹❤️
  
  And honestly, it still feels like a dream — because somehow, out of billions of people in this world, I found you.
  Not just a girl. Not just a girlfriend.
  But my person. My favorite hello. My sweetest "how are you?" My silliest laugh. My warmest good night.
  And even though we’re miles apart right now, you’re always with me — in my heart, in my thoughts, in everything beautiful around me. 🌎
  
  Cyra, you’re the girl who turned my boring, normal days into something worth waiting for.
  The one who made late-night calls feel like little adventures.
  The one who made even “good morning” texts feel like getting a gift every single day.
  The one who makes me smile like an idiot when I look at my phone.
  And yes, the one who’s going to make me grow abs from laughing so much at our random jokes. 😆
  
  I swear, every single moment with you feels like a page from a book I never want to finish.
  Even when you tease me. Even when you act cute and pretend you’re not.
  Even when you get shy and cover your face with your hands (yes, I notice everything, my love 😚).
  
  You make my heart so full, Cyra.
  And it’s crazy to think… this is just the beginning. Imagine how much more love I have stored for you...
  I'm literally planning to love you until we're two little cute grandmas and grandpas bickering over who stole the last cookie. 🍪👵🏻👴🏻
  
  I’m so thankful for you.
  Thankful for your soft heart, your beautiful soul, your adorable stubbornness, and your laugh that feels like the best music I’ve ever heard.
  
  And I promise you this —
  When the clock strikes our 1-month anniversary,
  I’ll be right here, loving you louder than ever,
  smiling like a complete fool,
  and feeling like the luckiest man alive.
  Because I am.
  Because you chose me.
  
  I love you, my peanut butter, my sunshine, my everything. ☀️🥜
  
  Let's make this love story so legendary that even the stars in the sky will want to write fan letters to us. 🌌💌
  
  Counting every second until I can celebrate you, my Cyra. 🫶
  
  Always yours, forever and beyond,
  Avi 💛`
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
