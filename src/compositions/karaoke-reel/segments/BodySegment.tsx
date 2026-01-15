import React from "react";
import { AbsoluteFill } from "remotion";
import { KaraokeText } from "../components";

interface BodySegmentProps {
  text: string;
  durationFrames: number;
}

export const BodySegment: React.FC<BodySegmentProps> = ({
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
