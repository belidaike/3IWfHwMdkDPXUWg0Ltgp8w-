// components/ui/Dialog.tsx

import React, { ReactNode } from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onOpenChange?: (open: boolean) => void; // Add this prop
  children: ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onClose, onOpenChange, children }) => {
  if (!open) return null;

  const handleClose = () => {
    onClose();
    if (onOpenChange) onOpenChange(false); // Call onOpenChange if provided
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <button onClick={handleClose} className="mb-2">Close</button>
        {children}
      </div>
    </div>
  );
};

export const DialogTitle: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <h2 className="text-xl font-bold">{children}</h2>;
};

export const DialogContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};
