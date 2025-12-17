import React from "react";
import { Loader2 } from "lucide-react";

const CenteredCircularProgress: React.FC = () => {
  return (
    <div className="flex w-full justify-center my-2">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
};

export default CenteredCircularProgress;
