import React from "react";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  children?: React.ReactNode;
  className?: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ children = "Submit", className }) => {
  return (
    <Button type="submit" className={className}>
      {children}
    </Button>
  );
};

export default SubmitButton;
