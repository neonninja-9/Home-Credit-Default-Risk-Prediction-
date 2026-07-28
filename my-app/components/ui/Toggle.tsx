"use client";

import React, { useState } from 'react';

interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
}

export default function Toggle({ checked: controlledChecked, defaultChecked = false, onChange, label, description }: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleClick = () => {
    const newValue = !checked;
    if (!isControlled) {
      setInternalChecked(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-glass-stroke last:border-0">
      <div>
        {label && <div className="font-body-md text-on-surface">{label}</div>}
        {description && <div className="font-body-sm text-on-surface-variant mt-1">{description}</div>}
      </div>
      <button 
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleClick}
        className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
          checked ? 'bg-primary' : 'bg-surface-container-highest'
        }`}
      >
        <div 
          className={`w-4 h-4 rounded-full transition-transform ${
            checked ? 'bg-on-primary translate-x-6' : 'bg-on-surface-variant translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
