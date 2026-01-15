import React from "react";
import { AbsoluteFill } from "remotion";
import { KaraokeText } from "../components";

interface CTASegmentProps {
  text: string;
  durationFrames: number;
}

export const CTASegment: React.FC<CTASegmentProps> = ({
  text,
  durationFrames,
}) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <KaraokeText text={text} startFrame={0} durationFrames={durationFrames} />
    </AbsoluteFill>
  );
};
