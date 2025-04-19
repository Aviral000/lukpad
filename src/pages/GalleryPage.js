import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import video1 from '../Assets/Videos/IMG_1025.MOV';
import thumbnail1 from '../Assets/Images/thumbnails/IMG_1019.PNG';
import { Header } from '../components/Header';

// Main container for the gallery page
const GalleryContainer = styled.div`
  padding: 100px 30px 30px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff8f8;
  font-family: 'Dancing Script', cursive;
`;

const PageTitle = styled.h1`
  font-family: 'Pacifico', cursive;
  color: var(--primary-color, #ff6b6b);
  text-align: center;
  margin-bottom: 40px;
  font-size: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 30px;
  }
`;

// Flex container for the gallery and the display board
const GalleryLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  
  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
`;

// The thumbnails container
const ThumbnailsContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 15px;
  max-height: 600px;
  overflow-y: auto;
  padding: 10px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ff6b6b;
    border-radius: 10px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    max-height: 400px;
  }
`;

// Individual thumbnail item
const ThumbnailItem = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
  }
  
  ${props => props.isVideo && `
    &::after {
      content: '▶';
      position: absolute;
      bottom: 5px;
      right: 5px;
      background-color: rgba(255, 107, 107, 0.8);
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
    }
  `}
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
`;

// The display board
const DisplayBoard = styled.div`
  flex: 1.5;
  height: 600px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '❤️ Hover over an image or video to view it here ❤️';
    position: absolute;
    color: var(--primary-color, #ff6b6b);
    font-family: 'Dancing Script', cursive;
    font-size: 1.8rem;
    opacity: ${props => props.isEmpty ? 1 : 0};
    transition: opacity 0.3s ease;
    text-align: center;
    padding: 0 20px;
  }
  
  @media (max-width: 768px) {
    height: 350px;
    
    &::before {
      font-size: 1.5rem;
    }
  }
`;

const DisplayImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  display: ${props => props.show ? 'block' : 'none'};
  object-fit: contain;
`;

const DisplayVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  display: ${props => props.show ? 'block' : 'none'};
  object-fit: contain;
`;

// Date grouping for gallery items
const DateGroup = styled.div`
  margin-bottom: 30px;
`;

const DateHeading = styled.h2`
  color: var(--primary-color, #ff6b6b);
  font-family: 'Pacifico', cursive;
  margin-bottom: 15px;
  font-size: 1.8rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Gallery Page Component
export const GalleryPage = () => {
  // State for the currently displayed media
  const [activeMedia, setActiveMedia] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);
  
  // Sample gallery items - you would normally fetch these from a database or API
  const galleryItems = [
    // April 2025
    // {
    //   id: 1,
    //   src: '/images/gallery/first-date.jpg',
    //   thumbnail: '/images/gallery/thumbnails/first-date-thumb.jpg',
    //   type: 'image',
    //   date: '2025-04-06',
    //   description: 'Our first date'
    // },
    // {
    //   id: 2,
    //   src: '/images/gallery/picnic.jpg',
    //   thumbnail: '/images/gallery/thumbnails/picnic-thumb.jpg',
    //   type: 'image',
    //   date: '2025-04-15',
    //   description: 'Picnic in the park'
    // },
    {
      id: 1,
      src: video1,
      thumbnail: thumbnail1,
      type: 'video',
      date: '2025-04-07',
      description: 'My Pookie'
    },
    // May 2025
    // {
    //   id: 4,
    //   src: '/images/gallery/dinner.jpg',
    //   thumbnail: '/images/gallery/thumbnails/dinner-thumb.jpg',
    //   type: 'image',
    //   date: '2025-05-05',
    //   description: 'Anniversary dinner'
    // },
    // {
    //   id: 5,
    //   src: '/videos/dance.mp4',
    //   thumbnail: '/images/gallery/thumbnails/dance-thumb.jpg',
    //   type: 'video',
    //   date: '2025-05-12',
    //   description: 'Dancing in the rain'
    // },
    // Add more items as needed
  ];
  
  // Group gallery items by month
  const groupedItems = galleryItems.reduce((acc, item) => {
    const date = new Date(item.date);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    
    acc[monthYear].push(item);
    return acc;
  }, {});
  
  // Handle mouse enter on thumbnail
  const handleMouseEnter = (item) => {
    setActiveMedia(item);
    setIsHovering(true);
    
    // If it's a video, play it
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.play();
    }
  };
  
  // Handle mouse leave from thumbnail
  const handleMouseLeave = () => {
    setIsHovering(false);
    
    // If it's a video, pause it
    if (activeMedia?.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  
  // Use effect to handle the video element when active media changes
  useEffect(() => {
    if (activeMedia?.type === 'video' && videoRef.current && isHovering) {
      videoRef.current.play();
    }
  }, [activeMedia, isHovering]);
  
  return (
    <>
    <Header />
    <GalleryContainer>
      <PageTitle>Our Memories Gallery</PageTitle>
      
      <GalleryLayout>
        <ThumbnailsContainer>
          {Object.entries(groupedItems).map(([monthYear, items]) => (
            <DateGroup key={monthYear}>
              <DateHeading>{monthYear}</DateHeading>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                {items.map(item => (
                  <ThumbnailItem 
                    key={item.id}
                    isVideo={item.type === 'video'}
                    onMouseEnter={() => handleMouseEnter(item)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleMouseEnter(item)} // For mobile support
                  >
                    <ThumbnailImage 
                      src={item.thumbnail || item.src} 
                      alt={item.description}
                    />
                  </ThumbnailItem>
                ))}
              </div>
            </DateGroup>
          ))}
        </ThumbnailsContainer>
        
        <DisplayBoard isEmpty={!isHovering}>
          <DisplayImage 
            src={activeMedia?.type === 'image' ? activeMedia.src : ''}
            alt={activeMedia?.description || ''}
            show={isHovering && activeMedia?.type === 'image'}
          />
          
          <DisplayVideo 
            ref={videoRef}
            src={activeMedia?.type === 'video' ? activeMedia.src : ''}
            loop
            muted
            show={isHovering && activeMedia?.type === 'video'}
          />
        </DisplayBoard>
      </GalleryLayout>
    </GalleryContainer>
    </>
  );
};
