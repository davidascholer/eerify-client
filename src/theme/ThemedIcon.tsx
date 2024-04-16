import React from "react";
import { SvgIcon as MUIIcon } from "@mui/material";

export interface ThemedIconProps {
  Icon: typeof MUIIcon;
  sx?: object;
}
const ThemedIcon: React.FC<ThemedIconProps> = ({
  Icon,
  sx = {},
}: ThemedIconProps) => {
  return (
    <Icon
      sx={[
        sx,
        {
          color: (theme) => theme.colors.iconColor,
        },
      ]}
    />
  );
};

export default ThemedIcon;
