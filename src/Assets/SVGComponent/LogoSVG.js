export const LogoSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="180" height="60">
    <defs>
      <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor:'#ffffff', stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:'#ffe4e4', stopOpacity:1}} />
      </linearGradient>

      <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:'#ffffff', stopOpacity:0.95}} />
        <stop offset="100%" style={{stopColor:'#ffd6d6', stopOpacity:0.9}} />
      </linearGradient>

      <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.4"/>
      </filter>
    </defs>

    <g transform="translate(0,0)">
      <path 
        d="M10 35 c10,-20 30,-20 40,0 c10,-20 30,-20 40,0 c0,15 -20,30 -40,45 c-20,-15 -40,-30 -40,-45"
        fill="url(#heartGradient)" 
        style={{
          animation: 'heartbeat 1.5s ease-in-out infinite',
          transformOrigin: 'center center'
        }}
      />
      <style>
        {`
          @keyframes heartbeat {
            0% { transform: scale(0.8); }
            14% { transform: scale(0.85); }
            28% { transform: scale(0.8); }
            42% { transform: scale(0.85); }
            70% { transform: scale(0.8); }
            100% { transform: scale(0.8); }
          }
        `}
      </style>
    </g>
    
    <text x="100" y="60" fontFamily="Pacifico, cursive" fontSize="60" fill="url(#textGradient)" filter="url(#softShadow)">
      Cyral
    </text>
    
    <text x="103" y="85" fontFamily="Dancing Script, cursive" fontSize="16" fill="#ff8585" fontStyle="italic">
      A Journey of Love
    </text>
  </svg>
);
