import React from 'react';
import { Header } from '../components/Header';
import GlobalStyles from '../utils/GlobalStyles';
import { BirthdayVow } from '../components/BirthdayVow';
import { Hero } from '../components/Hero';
import { AboutUs } from '../components/AboutUs';
import { OurStory } from '../components/OurStory';
import { Gallery } from '../components/Gallery';
import { Messages } from '../components/Messages';
import { UpcomingEvents } from '../components/UpcomingEvents';
import { Footer } from '../components/Footer';
import { InteractiveElements } from '../components/InteractiveElements';

export function HomePage() {
  return (
    <>
      <Header />
      <GlobalStyles />
      <BirthdayVow />
      <Hero />
      <AboutUs />
      <OurStory />
      <Gallery />
      <Messages />
      <UpcomingEvents />
      <Footer />
      <InteractiveElements />
    </>
  );
}
