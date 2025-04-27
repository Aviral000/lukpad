import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { InteractiveElements } from '../components/InteractiveElements';
import { MonthsaryCountdown } from '../components/MonthsaryCountdown';

export function CountdownPage() {
  return (
    <>
      <Header />
      <MonthsaryCountdown />
      <Footer />
      <InteractiveElements />
    </>
  );
}
