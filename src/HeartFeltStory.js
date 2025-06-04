import React, { useEffect, useRef, useState } from 'react';
import { Heart, Star, Sparkles, Moon, Sun } from 'lucide-react';

const HeartfeltStory = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef([]);
  const [isVisible, setIsVisible] = useState({});

  const storyParts = [
    {
      title: "Once Upon A Time...",
      content: "In a world where hearts speak louder than words, two souls found each other in the most unexpected way.",
      icon: <Star className="w-8 h-8" />,
      gradient: "from-purple-400 to-pink-400"
    },
    {
      title: "The Meeting",
      content: "Like stars aligning in the perfect constellation, we discovered a connection that felt written in the stars themselves.",
      icon: <Sparkles className="w-8 h-8" />,
      gradient: "from-blue-400 to-purple-400"
    },
    {
      title: "Growing Closer",
      content: "Every conversation became a treasure, every smile a gift, every moment together a page in our beautiful story.",
      icon: <Heart className="w-8 h-8" />,
      gradient: "from-pink-400 to-red-400"
    },
    {
      title: "The Truth",
      content: "Sometimes the most beautiful stories have the most complicated chapters, and truth has a way of changing everything.",
      icon: <Moon className="w-8 h-8" />,
      gradient: "from-indigo-400 to-blue-400"
    },
    {
      title: "Understanding",
      content: "I never meant to complicate your world. Your happiness means everything to me, even if it means letting go.",
      icon: <Sun className="w-8 h-8" />,
      gradient: "from-yellow-400 to-orange-400"
    },
    {
      title: "My Heartfelt Apology",
      content: "I'm sorry for any confusion, any pain, any difficulty I may have brought into your life. That was never my intention.",
      icon: <Heart className="w-8 h-8" />,
      gradient: "from-red-400 to-pink-400"
    },
    {
      title: "What You Mean To Me",
      content: "You brought sunshine into my cloudy days, laughter into my quiet moments, and hope into my dreams.",
      icon: <Sparkles className="w-8 h-8" />,
      gradient: "from-amber-400 to-yellow-400"
    },
    {
      title: "Respect & Love",
      content: "True love means wanting someone's happiness above your own. I respect your choices and your relationship.",
      icon: <Star className="w-8 h-8" />,
      gradient: "from-green-400 to-blue-400"
    },
    {
      title: "Always In My Heart",
      content: "Though our paths may lead us different ways, you'll always have a special place in my heart. Thank you for the beautiful memories.",
      icon: <Heart className="w-8 h-8" />,
      gradient: "from-purple-400 to-pink-400"
    },
    {
      title: "Until We Meet Again",
      content: "May your days be filled with love, laughter, and all the happiness you deserve. You are truly special.",
      icon: <Sun className="w-8 h-8" />,
      gradient: "from-orange-400 to-red-400"
    }
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