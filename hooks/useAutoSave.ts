"use client";

import * as React from "react";

type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

interface AutoSaveState {
  status: AutoSaveStatus;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
}

interface UseAutoSaveOptions {
  /** Interval in milliseconds for auto-save (default: 30000 = 30 seconds) */
  interval?: number;
  /** Whether auto-save is enabled (default: true) */
  enabled?: boolean;
  /** Callback function to perform the actual save operation */
  onSave: () => Promise<void>;
  /** Optional callback when save completes successfully */
  onSaveSuccess?: () => void;
  /** Optional callback when save fails */
  onSaveError?: (error: Error) => void;
}

interface UseAutoSaveReturn {
  /** Current auto-save status */
  status: AutoSaveStatus;
  /** Last saved timestamp */
  lastSaved: Date | null;
  /** Whether there are unsaved changes */
  hasUnsavedChanges: boolean;
  /** Manually trigger a save */
  save: () => Promise<void>;
  /** Mark that there are unsaved changes */
  markDirty: () => void;
  /** Clear unsaved changes flag (e.g., after successful save) */
  clearDirty: () => void;
}

/**
 * Auto-save hook that saves draft content at a configurable interval.
 * Tracks unsaved changes and save status.
 */
export function useAutoSave({
  interval = 30000,
  enabled = true,
  onSave,
  onSaveSuccess,
  onSaveError,
}: UseAutoSaveOptions): UseAutoSaveReturn {
  const [state, setState] = React.useState<AutoSaveState>({
    status: "idle",
    lastSaved: null,
    hasUnsavedChanges: false,
  });

  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const onSaveRef = React.useRef(onSave);
  const onSaveSuccessRef = React.useRef(onSaveSuccess);
  const onSaveErrorRef = React.useRef(onSaveError);

  // Keep refs up to date
  React.useEffect(() => {
    onSaveRef.current = onSave;
    onSaveSuccessRef.current = onSaveSuccess;
    onSaveErrorRef.current = onSaveError;
  }, [onSave, onSaveSuccess, onSaveError]);

  const save = React.useCallback(async () => {
    setState((prev) => ({ ...prev, status: "saving" }));

    try {
      await onSaveRef.current();
      const now = new Date();
      setState({
        status: "saved",
        lastSaved: now,
        hasUnsavedChanges: false,
      });

      if (onSaveSuccessRef.current) {
        onSaveSuccessRef.current();
      }

      // Reset status to idle after 2 seconds
      setTimeout(() => {
        setState((prev) =>
          prev.status === "saved" ? { ...prev, status: "idle" } : prev
        );
      }, 2000);
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Unknown error");
      setState((prev) => ({
        ...prev,
        status: "error",
        hasUnsavedChanges: true,
      }));

      if (onSaveErrorRef.current) {
        onSaveErrorRef.current(err);
      }
    }
  }, []);

  const markDirty = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      hasUnsavedChanges: true,
      status: prev.status === "saved" ? "idle" : prev.status,
    }));
  }, []);

  const clearDirty = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      hasUnsavedChanges: false,
    }));
  }, []);

  // Set up auto-save interval
  React.useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setState((prev) => {
        // Only auto-save if there are unsaved changes
        if (prev.hasUnsavedChanges) {
          // Trigger save outside of state setter
          setTimeout(() => save(), 0);
        }
        return prev;
      });
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, interval, save]);

  return {
    status: state.status,
    lastSaved: state.lastSaved,
    hasUnsavedChanges: state.hasUnsavedChanges,
    save,
    markDirty,
    clearDirty,
  };
}
