import React, { useEffect, useRef, useState } from 'react';
import { Heart, Star, Sparkles, Moon, Sun } from 'lucide-react';

const HeartfeltStory = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef([]);
  const [isVisible, setIsVisible] = useState({});

  const storyParts = [
    {
      title: "Once Upon A Time...",
      content:
        "In a world where hearts speak louder than words, two souls collided in a way fate couldn’t ignore — and that's when I first felt the magic of you.",
      icon: <Star className="w-8 h-8" />,
      gradient: "from-purple-400 to-pink-400"
    },
    {
      title: "The Meeting",
      content:
        "Like stars forming their perfect dance, we found each other in the chaos. It wasn’t planned, but it felt destined, like you were the chapter my heart was waiting to write.",
      icon: <Sparkles className="w-8 h-8" />,
      gradient: "from-blue-400 to-purple-400"
    },
    {
      title: "Growing Closer",
      content:
        "Every message from you made my world brighter. I kept falling for your smile, your thoughts, your soul — deeper than I ever expected.",
      icon: <Heart className="w-8 h-8" />,
      gradient: "from-pink-400 to-red-400"
    },
    {
      title: "The Truth",
      content:
        "Sometimes, love chooses the most complicated path. I never wanted to be a storm in your sky — only the calm that made you smile again.",
      icon: <Moon className="w-8 h-8" />,
      gradient: "from-indigo-400 to-blue-400"
    },
    {
      title: "Understanding",
      content:
        "I know it's wrong… but if loving you means showing the side of me that fights for you — then let me be that fighter. Because I will and surely will win your heart.",
      icon: <Sun className="w-8 h-8" />,
      gradient: "from-yellow-400 to-orange-400"
    },
    {
      title: "My Heartfelt Apology",
      content:
        "I'm sorry if I ever made your heart heavy. I never wanted to bring pain — only warmth. If I could take away every confusion, I would replace it with comfort and care.",
      icon: <Heart className="w-8 h-8" />,
      gradient: "from-red-400 to-pink-400"
    },
    {
      title: "What You Mean To Me",
      content:
        "You’re more than just someone I like — you’re someone I feel in every heartbeat. You bring color where there was gray, and a melody where there was silence.",
      icon: <Sparkles className="w-8 h-8" />,
      gradient: "from-amber-400 to-yellow-400"
    },
    {
      title: "Respect & Love",
      content:
        "I don’t love you to possess you. I love you to uplift you, respect you, and protect that beautiful smile. Because loving you isn’t about me — it’s about seeing you happy.",
      icon: <Star className="w-8 h-8" />,
      gradient: "from-green-400 to-blue-400"
    },
    {
      title: "Always In My Heart",
      content:
        "Even if life draws maps we didn’t plan, you’ll always be a glowing dot on mine — circled in love, marked with hope, and carried in every beat of my heart.",
      icon: <Heart className="w-8 h-8" />,
      gradient: "from-purple-400 to-pink-400"
    },
    {
      title: "Until We Meet Again",
      content:
        "Until your eyes find mine again, I’ll keep loving you in silence, cheering for you from afar, and waiting — because I believe in ‘us’, no matter how long it takes.",
      icon: <Sun className="w-8 h-8" />,
      gradient: "from-orange-400 to-red-400"
    },
    {
        title: "A Wish From My Heart",
        content:
          "When I first met you, I smiled and said — 'Give me a chance, you’ll never regret it.' I know it sounds wrong, but my heart still whispers… just one secret place in your heart, that's all I ask.\n\nEven if I fail, even if you marry someone someday — I promise, I’ll never cross your peace, never disturb your life. Not until destiny changes… (and hopefully never has to). But until then, I’ll keep this quiet little love safe — just for you.",
        icon: <Heart className="w-8 h-8" />,
        gradient: "from-rose-400 to-purple-500"
    },
  ];
  

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = parseInt(entry.target.dataset.index);
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [index]: true }));
          setCurrentSection(index);
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const FloatingElements = () => {
    const elements = Array.from({ length: 15 }, (_, i) => (
      <div
        key={i}
        className="fixed pointer-events-none"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }}
      >
        <div className="animate-pulse">
          {Math.random() > 0.5 ? (
            <Heart className="w-4 h-4 text-pink-300 opacity-30" />
          ) : (
            <Star className="w-3 h-3 text-yellow-300 opacity-30" />
          )}
        </div>
      </div>
    ));
    return <>{elements}</>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      <FloatingElements />
      
      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {storyParts.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              currentSection === index ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => {
              sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      {/* Story sections */}
      {storyParts.map((part, index) => (
        <section
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          data-index={index}
          className="min-h-screen flex items-center justify-center px-8 py-16 relative"
        >
          <div
            className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
              isVisible[index] 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-20 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            {/* Icon */}
            <div 
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${part.gradient} mb-8 transform transition-all duration-700 ${
                isVisible[index] ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
              }`}
              style={{ transitionDelay: `${index * 200 + 300}ms` }}
            >
              <div className="text-white">
                {part.icon}
              </div>
            </div>

            {/* Title */}
            <h2 
              className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${part.gradient} bg-clip-text text-transparent mb-8 transform transition-all duration-700 ${
                isVisible[index] ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200 + 500}ms` }}
            >
              {part.title}
            </h2>

            {/* Content */}
            <p 
              className={`text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto transform transition-all duration-700 ${
                isVisible[index] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200 + 700}ms` }}
            >
              {part.content}
            </p>

            {/* Decorative elements */}
            <div 
              className={`flex justify-center space-x-4 mt-12 transform transition-all duration-700 ${
                isVisible[index] ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200 + 900}ms` }}
            >
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white/40 animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
          </div>

          {/* Section-specific background elements */}
          {index === 0 && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 20 }, (_, i) => (
                <Star
                  key={i}
                  className="absolute text-yellow-300/20 animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          )}

          {(index === 2 || index === 5 || index === 8) && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 15 }, (_, i) => (
                <Heart
                  key={i}
                  className="absolute text-pink-300/20 animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 15 + 8}px`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Final message */}
      <section className="min-h-screen flex items-center justify-center px-8 py-16 relative bg-gradient-to-t from-purple-900/50 to-transparent">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-pink-400 to-red-400 mb-8 animate-pulse">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            With All My Love
          </h3>
          
          <p className="text-lg text-white/80 mb-8">
            Thank you for being the beautiful person you are. I wish you nothing but happiness and love.
          </p>
          
          <div className="text-6xl mb-4">💕</div>
          
          <p className="text-sm text-white/60 italic">
            "Sometimes the heart sees what is invisible to the eye."
          </p>
        </div>
      </section>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeartfeltStory;