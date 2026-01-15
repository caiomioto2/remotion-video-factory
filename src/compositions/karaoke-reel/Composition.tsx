import React from "react";
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  staticFile,
} from "remotion";
import { CONTENT } from "./content";
import { secondsToFrames } from "./config";
import { ProgressBar, SegmentIndicator } from "./components";
import { HookSegment } from "./segments/HookSegment";
import { BodySegment } from "./segments/BodySegment";
import { CTASegment } from "./segments/CTASegment";

export const KaraokeReelComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Calculate frame durations for each segment
  const hookDuration = secondsToFrames(CONTENT.hook.duration, fps);
  const bodyDurations = CONTENT.body.map((segment) =>
    secondsToFrames(segment.duration, fps)
  );
  const ctaDuration = secondsToFrames(CONTENT.cta.duration, fps);

  // Determine current segment for indicator
  let currentSegmentLabel = "HOOK";
  let currentFrame = 0;

  currentFrame += hookDuration;
  if (frame >= currentFrame) {
    CONTENT.body.forEach((_, index) => {
      const segmentEnd = currentFrame + bodyDurations[index];
      if (frame >= currentFrame && frame < segmentEnd) {
        currentSegmentLabel = `PARTE ${index + 1}`;
      }
      currentFrame = segmentEnd;
    });
  }

  if (frame >= currentFrame) {
    currentSegmentLabel = "CTA";
  }

  const progress = frame / durationInFrames;

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a0a0a 100%)",
      }}
    >
      {/* Animated background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% ${
            30 + Math.sin(frame / 30) * 10
          }%, rgba(138, 43, 226, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Segment indicator */}
      <SegmentIndicator label={currentSegmentLabel} isActive={true} />

      {/* Main content area using Series */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Series>
          {/* Hook Segment */}
          <Series.Sequence durationInFrames={hookDuration}>
            <HookSegment
              text={CONTENT.hook.text}
              durationFrames={hookDuration}
            />
          </Series.Sequence>

          {/* Body Segments */}
          {CONTENT.body.map((segment, index) => (
            <Series.Sequence
              key={index}
              durationInFrames={bodyDurations[index]}
            >
              <BodySegment
                text={segment.text}
                durationFrames={bodyDurations[index]}
              />
            </Series.Sequence>
          ))}

          {/* CTA Segment */}
          <Series.Sequence durationInFrames={ctaDuration}>
            <CTASegment text={CONTENT.cta.text} durationFrames={ctaDuration} />
          </Series.Sequence>
        </Series>
      </AbsoluteFill>

      {/* Progress bar */}
      <ProgressBar progress={progress} />

      {/* Audio track - Gemini TTS */}
      <Audio src={staticFile("narration.mp3")} />
    </AbsoluteFill>
  );
};
