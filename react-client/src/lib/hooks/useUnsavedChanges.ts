import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Custom hook to warn users about unsaved changes
 */
export const useUnsavedChanges = (hasUnsavedChanges: boolean, message?: string) => {
  const router = useRouter();
  const defaultMessage = message || 'You have unsaved changes. Are you sure you want to leave?';

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = defaultMessage;
        return defaultMessage;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges, defaultMessage]);

  return {
    hasUnsavedChanges,
  };
};


