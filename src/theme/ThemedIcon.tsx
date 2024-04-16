import React from "react";
import { SvgIcon as MUIIcon } from "@mui/material";
import { colorPalette } from "./theme";

const lightThemedStyles = {
  color: colorPalette.blue,
};

const darkThemedStyles = {
  color: colorPalette.blue,
};

export interface ThemedIconProps {
  Icon: typeof MUIIcon;
  sx?: any;
}
const ThemedIcon: React.FC<ThemedIconProps> = (props: ThemedIconProps) => {
  const isLightMode = true;
  const { Icon } = props;
  const styles = props.sx ? props.sx : {};
  const themedStyles = isLightMode ? lightThemedStyles : darkThemedStyles;

  return <Icon sx={[themedStyles, styles]} />;
};

export default ThemedIcon;
