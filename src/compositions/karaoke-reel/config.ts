// Duration configuration in seconds
// Extracted from content for easy timing adjustments

export const HOOK_DURATION = 5;

export const BODY_DURATIONS = [12, 8, 12, 13, 10];

export const CTA_DURATION = 5;

export const TOTAL_DURATION =
  HOOK_DURATION +
  BODY_DURATIONS.reduce((sum, duration) => sum + duration, 0) +
  CTA_DURATION;

// FPS configuration
export const FPS = 30;

// Helper function to convert seconds to frames
export const secondsToFrames = (seconds: number, fps: number = FPS): number => {
  return Math.round(seconds * fps);
};
