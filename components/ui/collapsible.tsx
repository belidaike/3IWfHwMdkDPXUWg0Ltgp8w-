"use client";

import React, { useState, ReactNode } from 'react';

interface CollapsibleProps {
  children: ReactNode[]; // Accepting multiple children
}

export const Collapsible: React.FC<CollapsibleProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Check if children are provided
  if (!children || children.length < 2) {
    console.error("Collapsible component expects at least two children: a trigger and content.");
    return null; // Or render a fallback UI
  }

  return (
    <div>
      <div onClick={toggleOpen} style={{ cursor: 'pointer' }}>
        {children[0]} {/* Trigger content */}
      </div>
      {isOpen && <div>{children.slice(1)}</div>} {/* Collapsible content */}
    </div>
  );
};

export const CollapsibleTrigger: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);

export const CollapsibleContent: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);
