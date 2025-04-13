import React from 'react';
import styled from 'styled-components';

const FooterSection = styled.footer`
  background-color: var(--dark-color);
  color: white;
  text-align: center;
  padding: 30px 20px;
`;

const FooterHeart = styled.span`
  color: var(--primary-color);
  font-size: 1.5rem;
  margin: 0 5px;
`;

export function Footer() {
  return (
    <FooterSection>
      <p>Avi <FooterHeart>❤</FooterHeart> Cyra</p>
      <p>Love knows no distance, no borders, no time zones.</p>
      <p>&copy; {new Date().getFullYear()} | Made with love</p>
    </FooterSection>
  );
}
