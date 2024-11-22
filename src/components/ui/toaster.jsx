"use client";

import React from 'react';
import { useToast } from './use-toast';
import { ToastProvider, ToastViewport, Toast } from './toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="flex">
            <div className="flex-1">
              {title && <p className="font-bold">{title}</p>}
              {description && <p>{description}</p>}
            </div>
            {action}
          </div>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
