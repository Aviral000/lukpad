import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const GallerySection = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  margin-bottom: 50px;
  color: var(--primary-color);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  margin-top: 30px;
`;

const GalleryItem = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transform: translateY(50px);
  opacity: 0;
  transition: all 0.3s ease-in-out;
  
  &.visible {
    transform: translateY(0);
    opacity: 1;
  }
`;

const GalleryImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
  
  ${GalleryItem}:hover & {
    transform: scale(1.1);
  }
`;

const GalleryCaption = styled.div`
  position: absolute;
  bottom: -60px;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 15px;
  transition: all 0.3s ease-in-out;
  
  ${GalleryItem}:hover & {
    bottom: 0;
  }
`;

const Modal = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
  opacity: ${props => props.show ? '1' : '0'};
  transition: opacity 0.3s ease-in-out;
`;

const ModalContent = styled.img`
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  max-height: 80vh;
  object-fit: contain;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const ModalCaption = styled.div`
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 10px auto;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
  cursor: pointer;
  
  &:hover {
    color: var(--primary-color);
  }
`;

export function Gallery() {
  const [modalImage, setModalImage] = useState({
    show: false,
    src: '',
    caption: ''
  });
  
  const galleryItemsRef = useRef([]);
  
  const galleryData = [
    {
      src: "https://i.ibb.co/60Xd8Lbw/IMG-0964.jpg",
      caption: "Our first virtual date"
    },
    {
      src: "https://gmvnonline.com/uploads/images/destinations/Tehri%20Garhwal/Dhanaulti/dhanaulti-img3.jpg",
      caption: "Beautiful places in India"
    },
    {
      src: "https://i.ibb.co/6SYqZm4/IMG-1073.jpg",
      caption: "Paradise in the Philippines"
    },
    {
      src: "https://i.ibb.co/kgq0nyxV/IMG-1042.jpg",
      caption: "Our late-night video calls"
    },
    {
      src: "https://i.ibb.co/Mj49s9w/IMG-0969.jpg",
      caption: "Cry-Babies"
    },
    {
      src: "https://keystoneacademic-res.cloudinary.com/image/upload/v1733331993/Switzerland_rkswd8.png",
      caption: "Where we dream of traveling together"
    }
  ];
  
  // Set up refs array
  galleryItemsRef.current = Array(galleryData.length).fill().map((_, i) => galleryItemsRef.current[i] || React.createRef());
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    galleryItemsRef.current.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });
    
    return () => {
      galleryItemsRef.current.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);
  
  const openModal = (src, caption) => {
    setModalImage({
      show: true,
      src,
      caption
    });
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setModalImage({
      ...modalImage,
      show: false
    });
    document.body.style.overflow = 'auto';
  };
  
  return (
    <>
      <GallerySection id="gallery">
        <SectionTitle>Our Moments</SectionTitle>
        <GalleryGrid>
          {galleryData.map((item, index) => (
            <GalleryItem 
              key={index} 
              ref={galleryItemsRef.current[index]} 
              className="gallery-item"
              onClick={() => openModal(item.src, item.caption)}
            >
              <GalleryImg src={item.src} alt={item.caption} />
              <GalleryCaption>{item.caption}</GalleryCaption>
            </GalleryItem>
          ))}
        </GalleryGrid>
      </GallerySection>
      
      <Modal show={modalImage.show} onClick={closeModal}>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <ModalContent src={modalImage.src} alt={modalImage.caption} />
        <ModalCaption>{modalImage.caption}</ModalCaption>
      </Modal>
    </>
  );
}
