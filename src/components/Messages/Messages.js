import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const MessagesSection = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: rgba(78, 205, 196, 0.1);
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-family: "Dancing Script", cursive;
  font-size: 3rem;
  margin-bottom: 50px;
  color: var(--primary-color);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MessageCard = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  position: relative;
  transform: translateY(50px);
  opacity: 0;
  transition: all 0.3s ease-in-out;

  &.visible {
    transform: translateY(0);
    opacity: 1;
  }
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const MessageAuthorImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const MessageAuthor = styled.h3`
  font-family: "Pacifico", cursive;
  font-size: 1.5rem;
  margin-left: 15px;
`;

const MessageContent = styled.p`
  font-family: "Dancing Script", cursive;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const MessageDate = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 10px;
  text-align: right;
`;

export function Messages() {
  const messageRefs = useRef([]);

  // Set up refs array
  messageRefs.current = Array(2)
    .fill()
    .map((_, i) => messageRefs.current[i] || React.createRef());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    messageRefs.current.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      messageRefs.current.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const messagesData = [
    {
      author: "Avi",
      image:
        "https://i.ibb.co/gMJFVZJH/IMG-9805.jpg",
      content:
        "My dearest Cyra, the day you became my girlfriend was the happiest day of my life. Your smile brightens my darkest days, and your voice is the melody that plays in my heart. Distance may separate us physically, but my love for you travels across oceans, mountains, and time zones. I cherish every moment we share, and I can't wait for the day when I can hold your hand and walk beside you. You are my dream come true.",
      signature: "With all my love, Avi",
    },
    {
      author: "Cyra",
      image:
        "https://i.ibb.co/GQb8bJx7/213319b3-ff82-4363-85f2-3b926b0aa5ec.jpg",
      content:
        "To my Avi, you came into my life unexpectedly, but now I can't imagine my days without you. Your kindness, your humor, and your loving heart have shown me what true love feels like. Though we are miles apart, you feel so close to my heart. Every message, every call, every moment we share makes me fall deeper in love with you. Thank you for loving me across the distance. I'm so grateful for you.",
      signature: "Forever yours, Cyra",
    },
  ];

  return (
    <MessagesSection id="messages">
      <SectionTitle>Love Notes</SectionTitle>
      {messagesData.map((message, index) => (
        <MessageCard
          key={index}
          ref={messageRefs.current[index]}
          className="message-card"
        >
          <MessageHeader>
            <MessageAuthorImg src={message.image} alt={message.author} />
            <MessageAuthor>From {message.author}</MessageAuthor>
          </MessageHeader>
          <MessageContent>{message.content}</MessageContent>
          <MessageDate>{message.signature}</MessageDate>
        </MessageCard>
      ))}
    </MessagesSection>
  );
}
