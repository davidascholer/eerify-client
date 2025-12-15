import React from "react";

const CrawlingSpider = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((_props, ref) => {
  // Helper function to calculate leg positions based on angle in degrees
  const getLegPosition = (
    angle: number,
    length: number,
    centerX = 50,
    centerY = 50
  ) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: centerX + Math.cos(rad) * length,
      y: centerY + Math.sin(rad) * length,
    };
  };

  // 4 legs on top (angles 270-90), 4 legs on bottom (angles 90-270)
  const legs = [
    // TOP LEGS (going upward)
    { angle: 300, offset: 0 }, // top left front
    { angle: 330, offset: 0.15 }, // top left back
    { angle: 30, offset: 0.3 }, // top right back
    { angle: 60, offset: 0.45 }, // top right front

    // BOTTOM LEGS (going downward)
    { angle: 120, offset: 0 }, // bottom right front
    { angle: 150, offset: 0.15 }, // bottom right back
    { angle: 210, offset: 0.3 }, // bottom left back
    { angle: 240, offset: 0.45 }, // bottom left front
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      <svg
        ref={ref}
        className="absolute"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMinYMin meet"
        overflow="visible"
        style={{
          // Positioning driven by Web Animations in useAnimation.ts
          zIndex: 9999,
        }}
      >
        <defs>
          <radialGradient id="bodyGradient">
            <stop offset="0%" stopColor="#009AF2" />
            <stop offset="50%" stopColor="#007ED1" />
            <stop offset="100%" stopColor="#0062A8" />
          </radialGradient>

          <radialGradient id="glossGradient">
            <stop offset="0%" stopColor="#4DB8FF" opacity="0.6" />
            <stop offset="100%" stopColor="#007ED1" opacity="0" />
          </radialGradient>
        </defs>

        {legs.map((leg, index) => {
          const firstSegment = getLegPosition(leg.angle, 14, 45, 50);
          const secondSegment = getLegPosition(leg.angle, 22, 45, 50);
          // Freeze leg positions to avoid internal Y-axis animations that look like drift

          return (
            <g key={index} className="leg">
              <line
                x1="45"
                y1="50"
                x2={firstSegment.x}
                y2={firstSegment.y}
                stroke="#005A9C"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <line
                x1={firstSegment.x}
                y1={firstSegment.y}
                x2={secondSegment.x}
                y2={secondSegment.y}
                stroke="#005A9C"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </g>
          );
        })}

        {/* Body */}
        <ellipse cx="55" cy="50" rx="9" ry="11" fill="url(#bodyGradient)" />

        {/* Head */}
        <ellipse cx="44" cy="50" rx="6" ry="6" fill="url(#bodyGradient)" />

        {/* Eyes */}
        <circle cx="41" cy="48" r="0.8" fill="#003D66" />
        <circle cx="43" cy="48" r="0.8" fill="#003D66" />
        <circle cx="41" cy="50.5" r="0.7" fill="#003D66" />
        <circle cx="43" cy="50.5" r="0.7" fill="#003D66" />
        <circle cx="42" cy="46.5" r="0.6" fill="#003D66" />
        <circle cx="42" cy="52" r="0.6" fill="#003D66" />
        <circle cx="40" cy="49" r="0.5" fill="#003D66" />
        <circle cx="44" cy="49" r="0.5" fill="#003D66" />

        {/* Mouth lines */}
        <line
          x1="38"
          y1="49"
          x2="35"
          y2="49"
          stroke="#005A9C"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <line
          x1="38"
          y1="51"
          x2="35"
          y2="51"
          stroke="#005A9C"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>

      {/* Crawl keyframes handled via Web Animations API */}
    </div>
  );
});

export default CrawlingSpider;
