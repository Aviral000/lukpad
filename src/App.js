import React from 'react';
import GlobalStyles from './utils/GlobalStyles';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { OurStory } from './components/OurStory';
import { Gallery } from './components/Gallery';
import { Messages } from './components/Messages';
import { Footer } from './components/Footer';
import { InteractiveElements } from './components/InteractiveElements';

function App() {
  return (
    <>
      <GlobalStyles />
      <Hero />
      <AboutUs />
      <OurStory />
      <Gallery />
      <Messages />
      <Footer />
      <InteractiveElements />
    </>
  );
}

export default App;
