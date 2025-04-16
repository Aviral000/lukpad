import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background: linear-gradient(135deg, rgba(255,107,107,0.95) 0%, rgba(255,107,107,0.85) 100%);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 100;
  font-family: 'Dancing Script', cursive;
  
  @media (max-width: 768px) {
    padding: 12px 15px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoText = styled.h1`
  color: white;
  font-size: 2rem;
  font-family: 'Pacifico', cursive;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HeartIcon = styled.span`
  font-size: 1.8rem;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 25px;
  
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.3rem;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    color: #ffe6e6;
    transform: scale(1.05);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: white;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover:after {
    transform: scaleX(1);
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const DisabledLink = styled.div`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 1.3rem;
  position: relative;
  cursor: default;
  margin-right: 8px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ComingSoonTag = styled.span`
  position: absolute;
  top: -8px;
  right: -40px;
  background-color: #ff3636;
  color: white;
  font-size: 0.6rem;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  transform: rotate(15deg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    right: -35px;
    font-size: 0.5rem;
  }
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <HeartIcon>❤️</HeartIcon>
        <LogoText>Cyral</LogoText>
      </Logo>
      
      <NavLinks>
        <StyledLink to="/gallery">Gallery</StyledLink>
        
        <DisabledLink>
          Future Plans
          <ComingSoonTag>SOON</ComingSoonTag>
        </DisabledLink>
        
        <DisabledLink>
          Goals
          <ComingSoonTag>SOON</ComingSoonTag>
        </DisabledLink>
        
        <DisabledLink>
          Vlogs
          <ComingSoonTag>SOON</ComingSoonTag>
        </DisabledLink>
        
        <DisabledLink>
          Blogs
          <ComingSoonTag>SOON</ComingSoonTag>
        </DisabledLink>
      </NavLinks>
    </HeaderContainer>
  );
};
