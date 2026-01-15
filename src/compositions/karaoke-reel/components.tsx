import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Karaoke text component with word-by-word animation
export const KaraokeText: React.FC<{
  text: string;
  startFrame: number;
  durationFrames: number;
}> = ({ text, startFrame, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");
  const framesPerWord = durationFrames / words.length;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        padding: "40px",
        maxWidth: "900px",
      }}
    >
      {words.map((word, index) => {
        const wordStartFrame = startFrame + index * framesPerWord;
        const isActive = frame >= wordStartFrame;
        const isCurrentWord =
          frame >= wordStartFrame && frame < wordStartFrame + framesPerWord;

        const scale = isCurrentWord
          ? spring({
              frame: frame - wordStartFrame,
              fps,
              config: { damping: 12, stiffness: 200 },
            })
          : 1;

        const opacity = interpolate(
          frame,
          [wordStartFrame - 5, wordStartFrame],
          [0.3, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <span
            key={index}
            style={{
              fontSize: "72px",
              fontWeight: 900,
              fontFamily: "Inter, sans-serif",
              color: isActive ? "#FFFFFF" : "#666666",
              textShadow: isCurrentWord
                ? "0 0 40px rgba(138, 43, 226, 0.8), 0 4px 20px rgba(0,0,0,0.5)"
                : "0 4px 20px rgba(0,0,0,0.5)",
              transform: `scale(${isCurrentWord ? 1 + scale * 0.15 : 1})`,
              opacity: isActive ? opacity : 0.3,
              transition: "color 0.1s ease",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// Progress bar component
export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: 40,
        right: 40,
        height: 6,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 3,
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          backgroundColor: "#8A2BE2",
          borderRadius: 3,
          boxShadow: "0 0 20px rgba(138, 43, 226, 0.6)",
        }}
      />
    </div>
  );
};

// Segment indicator
export const SegmentIndicator: React.FC<{
  label: string;
  isActive: boolean;
}> = ({ label, isActive }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 40,
        padding: "12px 24px",
        backgroundColor: isActive ? "#8A2BE2" : "rgba(0,0,0,0.5)",
        borderRadius: 8,
        fontSize: "24px",
        fontWeight: 700,
        color: "#FFFFFF",
        fontFamily: "Inter, sans-serif",
        textTransform: "uppercase",
        letterSpacing: "3px",
      }}
    >
      {label}
    </div>
  );
};
