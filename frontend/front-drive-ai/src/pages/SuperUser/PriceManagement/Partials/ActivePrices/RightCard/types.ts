import React, { SetStateAction } from "react";

export interface RightCardProps {
    activeCardIndex: number;
    change: React.Dispatch<SetStateAction<boolean>>;
  }