// components/ui/VisuallyHidden.tsx

import React, { ReactNode } from 'react';

export const VisuallyHidden: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap clip-path-rect">
      {children}
    </span>
  );
};
