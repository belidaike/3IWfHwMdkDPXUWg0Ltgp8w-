"use client"; // Ensure this file is treated as a client component

import React, { useState, ReactNode } from 'react';

interface CollapsibleProps {
  children: [ReactNode, ReactNode]; // Expecting exactly two children
}

export const Collapsible: React.FC<CollapsibleProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Check if children are provided
  if (!children || children.length !== 2) {
    console.error("Collapsible component expects exactly two children.");
    return null; // Or you could render a fallback UI
  }

  return (
    <div>
      <div onClick={toggleOpen} style={{ cursor: 'pointer' }}>
        {children[0]} {/* Trigger content */}
      </div>
      {isOpen && <div>{children[1]}</div>} {/* Collapsible content */}
    </div>
  );
};

export const CollapsibleTrigger: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);

export const CollapsibleContent: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);
