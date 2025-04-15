import React from 'react';
import GlobalStyles from './utils/GlobalStyles';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { OurStory } from './components/OurStory';
import { Gallery } from './components/Gallery';
import { Messages } from './components/Messages';
import { Footer } from './components/Footer';
import { InteractiveElements } from './components/InteractiveElements';
import { UpcomingEvents } from './components/UpcomingEvents';
import { BirthdayVow } from './components/BirthdayVow';

function App() {
  return (
    <>
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

export default App;
