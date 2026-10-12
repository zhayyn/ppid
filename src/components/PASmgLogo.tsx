import React from 'react';

interface PASmgLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
  withText?: boolean;
}

export const PASmgLogo: React.FC<PASmgLogoProps> = ({
  size = 56,
  className = '',
  animated = false,
  withText = false,
}) => {
  return (
    <div className={`relative inline-flex items-center gap-3 shrink-0 ${className}`}>
      {/* Outer Golden Aura / Rotating Radiance Animation (As seen in the official video) */}
      {animated && (
        <>
          {/* Pulsing ambient gold glow */}
          <div
            className="absolute inset-0 rounded-full bg-amber-400/25 blur-xl pointer-events-none animate-pulse"
            style={{ transform: 'scale(1.4)' }}
          />

          {/* Rotating golden sun rays (360 deg continuous rotation) */}
          <div
            className="absolute -inset-4 pointer-events-none opacity-60 animate-[spin_18s_linear_infinite]"
            style={{ width: size + 32, height: size + 32, left: -16, top: -16 }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-300">
              <defs>
                <radialGradient id="rayGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                </radialGradient>
              </defs>
              {Array.from({ length: 16 }).map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 46 * Math.cos((i * Math.PI) / 8)}
                  y2={50 + 46 * Math.sin((i * Math.PI) / 8)}
                  stroke="url(#rayGlow)"
                  strokeWidth="1.2"
                  strokeDasharray="2 3"
                />
              ))}
            </svg>
          </div>
        </>
      )}

      {/* Main Oval Seal of Pengadilan Agama Semarang */}
      <div
        style={{ width: size, height: size * 1.14 }}
        className="relative shrink-0 flex items-center justify-center transition-transform hover:scale-105 duration-300"
      >
        <svg
          viewBox="0 0 200 228"
          className="w-full h-full drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Gold Gradient */}
            <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="25%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#fef08a" />
              <stop offset="75%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>

            {/* Inner Gold Bevel */}
            <linearGradient id="goldBevel" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            {/* Deep Emerald Court Background */}
            <radialGradient id="emeraldField" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="55%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#022c22" />
            </radialGradient>

            {/* Starburst Sun Gold Gradient */}
            <linearGradient id="sunGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Curved Path for Text: PENGADILAN AGAMA SEMARANG */}
            <path
              id="textArcPath"
              d="M 30,114 A 72,82 0 1,1 170,114"
              fill="none"
            />
          </defs>

          {/* 1. Outer Oval Gold Trim */}
          <ellipse
            cx="100"
            cy="114"
            rx="94"
            ry="108"
            fill="url(#goldRim)"
            stroke="#78350f"
            strokeWidth="2.5"
          />

          {/* 2. Middle Gold Rim Inset */}
          <ellipse
            cx="100"
            cy="114"
            rx="89"
            ry="102"
            fill="#b45309"
          />

          {/* 3. Outer Emerald Oval Field */}
          <ellipse
            cx="100"
            cy="114"
            rx="86"
            ry="99"
            fill="url(#emeraldField)"
            stroke="url(#goldBevel)"
            strokeWidth="3"
          />

          {/* 4. Raised Gold Curved Text: PENGADILAN AGAMA SEMARANG */}
          <text
            fontSize="14.5"
            fontWeight="900"
            fontFamily="Arial, 'Plus Jakarta Sans', sans-serif"
            fill="url(#goldRim)"
            stroke="#78350f"
            strokeWidth="0.6"
            letterSpacing="2.2"
          >
            <textPath
              href="#textArcPath"
              startOffset="50%"
              textAnchor="middle"
            >
              PENGADILAN AGAMA SEMARANG
            </textPath>
          </text>

          {/* 5. Center Golden Starburst Sun (8 Curved Flaming Rays) */}
          <g transform="translate(100, 102)">
            {/* Outer golden sun wheel rays */}
            <path
              d="M 0,-42 
                 L 11,-24 L 28,-36 L 24,-17 L 42,-12 L 27,2 L 38,18 L 20,18 L 22,38 L 4,28 
                 L -6,40 L -12,24 L -32,30 L -24,14 L -42,5 L -26,-7 L -36,-24 L -18,-19 L -12,-38 L 0,-24 Z"
              fill="url(#sunGold)"
              stroke="#78350f"
              strokeWidth="1.8"
            />

            {/* Inner gold circular frame */}
            <circle cx="0" cy="0" r="23" fill="#fef08a" stroke="#b45309" strokeWidth="2" />

            {/* 6. GARUDA PANCASILA SHIELD (PERISAI 5 SILA) */}
            {/* Shield Outline */}
            <path
              d="M -15,-16 L 15,-16 L 15,3 C 15,12 0,19 0,19 C 0,19 -15,12 -15,3 Z"
              fill="#ffffff"
              stroke="#1e293b"
              strokeWidth="1.2"
            />

            {/* Top-Left: Red Quarter with Banteng (Bull Head) */}
            <path d="M -15,-16 L 0,-16 L 0,0 L -15,0 Z" fill="#b91c1c" />
            <path d="M -10,-10 C -12,-14 -6,-12 -8,-8 C -6,-6 -10,-6 -10,-10 Z" fill="#0f172a" />

            {/* Top-Right: White Quarter with Beringin (Banyan Tree) */}
            <path d="M 0,-16 L 15,-16 L 15,0 L 0,0 Z" fill="#f8fafc" />
            <circle cx="8" cy="-8" r="4.5" fill="#15803d" />
            <path d="M 7.5,-4 L 8.5,-4 L 8.5,0 L 7.5,0 Z" fill="#78350f" />

            {/* Bottom-Left: White Quarter with Padi & Kapas */}
            <path d="M -15,0 L 0,0 L 0,16 C -8,13 -15,7 -15,0 Z" fill="#f8fafc" />
            <path d="M -12,4 Q -8,10 -3,14" stroke="#eab308" strokeWidth="1.5" fill="none" />
            <path d="M -13,7 Q -10,12 -6,14" stroke="#16a34a" strokeWidth="1.2" fill="none" />

            {/* Bottom-Right: Red Quarter with Rantai Emas (Golden Chain) */}
            <path d="M 0,0 L 15,0 C 15,7 8,13 0,16 Z" fill="#b91c1c" />
            <ellipse cx="7" cy="8" rx="4" ry="2.5" fill="none" stroke="#fef08a" strokeWidth="1.2" />

            {/* Center Heart: Black Shield with Golden Star (Bintang Emas) */}
            <path
              d="M -6,-7 L 6,-7 L 6,5 C 6,9 0,11 0,11 C 0,11 -6,9 -6,5 Z"
              fill="#09090b"
              stroke="#fbbf24"
              strokeWidth="0.8"
            />
            {/* 5-pointed Gold Star */}
            <polygon
              points="0,-4 1.5,-0.5 5,-0.5 2,1.8 3.2,5.2 0,3.2 -3.2,5.2 -2,1.8 -5,-0.5 -1.5,-0.5"
              fill="#fbbf24"
            />
          </g>

          {/* 7. DHARMMAYUKTI RIBBON (BANNER HIJAU & EMAS) */}
          <g transform="translate(100, 168)">
            {/* Green folded ribbon */}
            <path
              d="M -48,-8 L -36,-15 L -26,-9 L 0,-13 L 26,-9 L 36,-15 L 48,-8 L 40,4 L 28,-1 L 0,-5 L -28,-1 L -40,4 Z"
              fill="#065f46"
              stroke="url(#goldRim)"
              strokeWidth="1.5"
            />
            {/* Ribbon gold text */}
            <text
              y="-4"
              textAnchor="middle"
              fontSize="7.5"
              fontWeight="900"
              fontFamily="Arial, sans-serif"
              fill="#fef08a"
              letterSpacing="1.2"
            >
              DHARMMAYUKTI
            </text>
          </g>

          {/* 8. GOLDEN CHAIN & PADI-KAPAS WREATH LINKS AT BOTTOM */}
          <path
            d="M 52,148 Q 100,208 148,148"
            fill="none"
            stroke="url(#goldRim)"
            strokeWidth="3.5"
            strokeDasharray="4 3"
            strokeLinecap="round"
          />
          <path
            d="M 58,154 Q 100,202 142,154"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeDasharray="2 4"
          />
        </svg>
      </div>

      {/* Optional Wordmark Label */}
      {withText && (
        <div className="flex flex-col text-left">
          <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-400">
            Pengadilan Agama Semarang Kelas 1-A
          </span>
          <span className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
            PPID — Pejabat Pengelola Informasi dan Dokumentasi
          </span>
        </div>
      )}
    </div>
  );
};
