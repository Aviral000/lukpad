import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LogoSVG } from "../../Assets/SVGComponent/LogoSVG";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background: linear-gradient(
    135deg,
    rgba(255, 107, 107, 0.95) 0%,
    rgba(255, 107, 107, 0.85) 100%
  );
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 100;
  font-family: "Dancing Script", cursive;

  @media (max-width: 768px) {
    padding: 12px 15px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  svg {
    width: 180px;
    height: 60px;
    
    @media (max-width: 768px) {
      width: 140px;
      height: 46px;
    }
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px; /* Reduced from 25px to save horizontal space */
  flex-wrap: wrap; /* Allow wrapping if needed */
  margin-right: 10px; /* Add some margin on the right */

  @media (max-width: 768px) {
    display: none; /* Hide on mobile */
  }
  
  @media (min-width: 769px) and (max-width: 1100px) {
    gap: 15px; /* Even smaller gap for medium sized screens */
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.3rem;
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap; /* Prevent text wrapping within links */

  &:hover {
    color: #ffe6e6;
    transform: scale(1.05);
  }

  &:after {
    content: "";
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

  @media (min-width: 769px) and (max-width: 1100px) {
    font-size: 1.2rem; /* Slightly smaller font for medium screens */
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Create an external link styled component that looks like StyledLink
const StyledExternalLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.3rem;
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap; /* Prevent text wrapping within links */

  &:hover {
    color: #ffe6e6;
    transform: scale(1.05);
  }

  &:after {
    content: "";
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

  @media (min-width: 769px) and (max-width: 1100px) {
    font-size: 1.2rem; /* Slightly smaller font for medium screens */
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
  white-space: nowrap; /* Prevent text wrapping within links */
  padding-right: 45px; /* Make room for the SOON tag */

  @media (min-width: 769px) and (max-width: 1100px) {
    font-size: 1.2rem; /* Slightly smaller font for medium screens */
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ComingSoonTag = styled.span`
  position: absolute;
  top: -8px;
  right: 0px;
  background-color: #ff3636;
  color: white;
  font-size: 0.6rem;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: "Arial", sans-serif;
  font-weight: bold;
  transform: rotate(15deg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    right: -35px;
    font-size: 0.5rem;
  }
`;

// New mobile menu components
const MobileMenuIcon = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 110;

  @media (max-width: 768px) {
    display: flex;
  }

  div {
    width: 30px;
    height: 3px;
    background-color: white;
    border-radius: 10px;
    transition: all 0.3s ease;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) =>
        open ? "translateX(-20px)" : "translateX(0)"};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const MobileMenu = styled.div`
  display: none;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 70%;
  max-width: 300px;
  background: linear-gradient(
    135deg,
    rgba(255, 107, 107, 0.98) 0%,
    rgba(255, 85, 85, 0.95) 100%
  );
  padding-top: 80px;
  padding-left: 30px;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 105;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileNavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  margin: 15px 0;
  padding: 5px 0;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: #ffe6e6;
    transform: translateX(5px);
  }
`;

// Create a mobile external link component
const MobileExternalLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  margin: 15px 0;
  padding: 5px 0;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: #ffe6e6;
    transform: translateX(5px);
  }
`;

const MobileDisabledLink = styled.div`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 1.5rem;
  margin: 15px 0;
  padding: 5px 0;
  position: relative;
  cursor: default;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? "block" : "none")};
  z-index: 104;
`;

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when clicking outside or resizing window
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (isOpen && e.target.id === "overlay") {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <HeaderContainer>
      <Logo>
        <LogoSVG />
      </Logo>

      {/* Desktop Navigation */}
      <NavLinks>
        <StyledLink to="/">Home</StyledLink>

        <StyledLink to="/love-countdown">Countdown</StyledLink>

        {/* <StyledLink to="/gallery">Gallery</StyledLink> */}

        {/* <DisabledLink>
          Future Plans
          <ComingSoonTag>SOON</ComingSoonTag>
        </DisabledLink> */}

        <StyledExternalLink href="/workout" target="_blank" rel="noopener noreferrer">
          Workout
        </StyledExternalLink>

        <DisabledLink>
          Vlogs
          <ComingSoonTag>SOON</ComingSoonTag>
        </DisabledLink>

        <DisabledLink>
          Blogs
          <ComingSoonTag>SOON</ComingSoonTag>
        </DisabledLink>
      </NavLinks>

      {/* Mobile Menu Toggle */}
      <MobileMenuIcon open={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <div />
        <div />
        <div />
      </MobileMenuIcon>

      {/* Mobile Menu Overlay */}
      <Overlay open={isOpen} id="overlay" />

      {/* Mobile Menu */}
      <MobileMenu open={isOpen}>
        <MobileNavLink to="/" onClick={() => setIsOpen(false)}>
          Home
        </MobileNavLink>
        
        <MobileNavLink to="/love-countdown" onClick={() => setIsOpen(false)}>
          Countdown
        </MobileNavLink>

        {/* <MobileNavLink to="/gallery" onClick={() => setIsOpen(false)}>
          Gallery
        </MobileNavLink> */}

        {/* <MobileDisabledLink>
          Future Plans
          <ComingSoonTag>SOON</ComingSoonTag>
        </MobileDisabledLink> */}

        <MobileExternalLink href="/workout" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
          Workout
        </MobileExternalLink>

        <MobileDisabledLink>
          Vlogs
          <ComingSoonTag>SOON</ComingSoonTag>
        </MobileDisabledLink>

        <MobileDisabledLink>
          Blogs
          <ComingSoonTag>SOON</ComingSoonTag>
        </MobileDisabledLink>
      </MobileMenu>
    </HeaderContainer>
  );
};
