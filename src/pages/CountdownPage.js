import React from 'react';
import { Header } from '../components/Header';
import { InteractiveElements } from '../components/InteractiveElements';
import { FirstMeetCountdown } from '../components/FirstMeetCountdown';
// import { MonthsaryCountdown } from '../components/MonthsaryCountdown';

export function CountdownPage() {
  return (
    <>
      <Header />
      <FirstMeetCountdown />
      <InteractiveElements />
    </>
  );
}
