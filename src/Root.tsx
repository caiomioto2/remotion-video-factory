import "./index.css";
import { Composition, Folder } from "remotion";
import { TitleSlide, titleSlideSchema } from "./components/TitleSlide";
import { ContentSlide, contentSlideSchema } from "./components/ContentSlide";
import { KaraokeReelComposition } from "./compositions/karaoke-reel/Composition";
import { TOTAL_DURATION, FPS } from "./compositions/karaoke-reel/config";
import { VIDEO_CONFIG, getDurationInFrames } from "./config";
import {
  sampleTypeScript,
  sampleHighlightedTypeScript,
  sampleD2Diagram,
} from "./content";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main Compositions */}
      <Folder name="Compositions">
        <Folder name="Karaoke Reels">
          {/* Modular KaraokeReel Composition */}
          <Composition
            id="KaraokeReel"
            component={KaraokeReelComposition}
            durationInFrames={TOTAL_DURATION * FPS}
            fps={FPS}
            width={1080}
            height={1920}
          />
        </Folder>
      </Folder>

      {/* Component Library */}
      <Folder name="Components">
        <Composition
          id="TitleSlide"
          component={TitleSlide}
          durationInFrames={getDurationInFrames(1, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={titleSlideSchema}
          defaultProps={{
            title: "Example Title",
          }}
        />
        <Composition
          id="ContentSlide"
          component={ContentSlide}
          durationInFrames={getDurationInFrames(1, VIDEO_CONFIG.fps)}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={contentSlideSchema}
          defaultProps={{
            header: "Example Header",
            content: "Example Content",
          }}
        />
      </Folder>
    </>
  );
};
