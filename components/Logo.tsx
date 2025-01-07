import { Clock } from "lucide-react";
import React from "react";

const Logo = ({ height, width }: { height: number; width: number }) => {
  return (
    <div className="flex items-center gap-2 bg-gradient-to-b p-2 from-pink-400  to-blue-400 rounded-lg">
      <Clock size={24} className="text-white" />
    </div>
  );
};

export default Logo;
