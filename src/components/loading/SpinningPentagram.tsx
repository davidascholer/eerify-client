import Pentagram from "@/assets/icons/Pentagram";
import React from "react";

// SpinningPentagram component
const SpinningPentagram: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <div
    style={{
      display: "inline-block",
      animation: "spin 1.5s linear infinite",
    }}
  >
    <style>
      {`
                @keyframes spin {
                    100% { transform: rotate(360deg); }
                }
            `}
    </style>
    <Pentagram {...props} />
  </div>
);

export default SpinningPentagram;
