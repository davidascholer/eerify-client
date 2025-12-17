import React from "react";

export interface ThemedIconProps {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  className?: string;
  style?: React.CSSProperties;
}
const ThemedIcon: React.FC<ThemedIconProps> = ({ Icon, className, style }) => {
  return <Icon className={className} style={style} />;
};

export default ThemedIcon;
