import React from "react";
import { AbsoluteFill } from "remotion";
import { KaraokeText } from "../components";

interface HookSegmentProps {
  text: string;
  durationFrames: number;
}

export const HookSegment: React.FC<HookSegmentProps> = ({
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
