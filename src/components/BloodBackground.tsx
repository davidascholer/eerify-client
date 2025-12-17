/**
 * BloodDrip
 * Full-screen SVG blood drip animation with
 * snap, recoil, wobble, and full-width streak.
 *
 * Usage:
 * <BloodDrip />
 */

const ANIM_DURATION = "30s";
export default function BloodBackground() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 140"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      <g>
        {/* Full-width blood streak */}
        <rect
          x="0"
          y="-120"
          width="100"
          height="0"
          fill="rgba(120, 0, 0, 0.85)"
        >
          <animate
            attributeName="height"
            values="0;0;320"
            keyTimes="0;0.26;1"
            dur={ANIM_DURATION}
            repeatCount="indefinite"
          />
        </rect>

        {/* Thin neck */}
        <rect x="52" y="0" width="1" height="0" fill="rgba(255, 0, 0, 0.9)">
          <animate
            attributeName="height"
            values="0;18;30;0"
            keyTimes="0;0.15;0.22;0.26"
            dur={ANIM_DURATION}
            repeatCount="indefinite"
          />
          <animate
            attributeName="width"
            values="1;0.6;0.3;0"
            keyTimes="0;0.18;0.24;0.26"
            dur={ANIM_DURATION}
            repeatCount="indefinite"
          />
        </rect>

        {/* Blood drop */}
        <path
          d="M56 8 C48 28, 38 48, 38 64 C38 76, 42 88, 50 94 C58 88, 62 76, 62 64 C62 48, 58 28, 56 8 Z"
          fill="rgb(255, 0, 0)"
        >
          {/* Hold → release → fall */}
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 -120; 0 -120; 0 -112; 0 160"
            keyTimes="0;0.22;0.26;1"
            dur={ANIM_DURATION}
            repeatCount="indefinite"
            additive="sum"
          />

          {/* Surface tension stretch */}
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1 1; 0.96 1.06; 0.92 1.14; 1.05 0.96; 1 1"
            keyTimes="0;0.15;0.22;0.3;1"
            dur={ANIM_DURATION}
            repeatCount="indefinite"
            additive="sum"
          />

          {/* Snap recoil */}
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -4; 0 0"
            keyTimes="0;0.27;0.32"
            dur={ANIM_DURATION}
            repeatCount="indefinite"
            additive="sum"
          />

          {/* Gentle wobble */}
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; -0.8 0; 0.8 0; -0.4 0; 0 0"
            dur="6s"
            repeatCount="indefinite"
            additive="sum"
          />

          {/* Fade at bottom */}
          <animate
            attributeName="opacity"
            values="1;1;0"
            keyTimes="0;0.93;1"
            dur={ANIM_DURATION}
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M56 8 C48 28, 38 48, 38 64 C38 76, 42 88, 50 94 C58 88, 62 76, 62 64 C62 48, 58 28, 56 8 Z"
          fill="rgb(255, 0, 0)"
        >
          {/* Hold → release → fall */}
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 -120; 0 -120; 0 -112; 0 160"
            keyTimes="0;0.22;0.26;1"
            dur={ANIM_DURATION}
            repeatCount="indefinite"
            additive="sum"
          />

          {/* Surface tension stretch */}
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1 1; 0.96 1.06; 0.92 1.14; 1.05 0.96; 1 1"
            keyTimes="0;0.15;0.22;0.3;1"
            dur={ANIM_DURATION}
            repeatCount="indefinite"
            additive="sum"
          />

          {/* Snap recoil */}
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -4; 0 0"
            keyTimes="0;0.27;0.32"
            dur={ANIM_DURATION}
            repeatCount="indefinite"
            additive="sum"
          />

          {/* Gentle wobble */}
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; -0.8 0; 0.8 0; -0.4 0; 0 0"
            dur="6s"
            repeatCount="indefinite"
            additive="sum"
          />

          {/* Fade at bottom */}
          <animate
            attributeName="opacity"
            values="1;1;0"
            keyTimes="0;0.93;1"
            dur={ANIM_DURATION}
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  );
}
