import React from "react";

interface FlagIconProps {
  className?: string;
}

export const FrenchFlagIcon: React.FC<FlagIconProps> = ({
  className = "w-4 h-4",
}) => (
  <svg
    viewBox="0 0 24 16"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="8" height="16" fill="#002395" />
    <rect x="8" width="8" height="16" fill="#FFFFFF" />
    <rect x="16" width="8" height="16" fill="#ED2939" />
  </svg>
);

export const BritishFlagIcon: React.FC<FlagIconProps> = ({
  className = "w-4 h-4",
}) => (
  <svg
    viewBox="0 0 24 16"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="16" fill="#012169" />
    <path d="M0 0L24 16M24 0L0 16" stroke="#FFFFFF" strokeWidth="2.4" />
    <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.6" />
    <path d="M12 0V16M0 8H24" stroke="#FFFFFF" strokeWidth="2.4" />
    <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="1.6" />
  </svg>
);
