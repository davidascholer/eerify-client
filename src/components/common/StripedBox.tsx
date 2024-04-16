import { Box } from "@mui/material";
import React from "react";

interface StripedBoxProps {
  children: JSX.Element | JSX.Element[];
  color1: string;
  color2: string;
  styles?: undefined | any;
}

const StripedBox: React.FC<StripedBoxProps> = ({
  children,
  color1,
  color2,
  styles,
}) => {
  return (
    <Box
      sx={[
        {
          background: `repeating-linear-gradient(
        45deg,
        ${color1},
        ${color1}, 20px,
        ${color2} 20px,
        ${color2} 40px
      );`,
        },
        styles,
      ]}
    >
      {children}
    </Box>
  );
};

export default StripedBox;
