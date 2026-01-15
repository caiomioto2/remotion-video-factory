# CLAUDE.md - Remotion Video Factory v2.0

This is a remotion based video app that uses React to render videos. 

**Version 2.0 includes:**
- ✅ Original KaraokeReel composition (preserved)
- ✅ 14 pre-built component library
- ✅ Tailwind CSS v4 integration
- ✅ MCP integration for AI-powered assets
- ✅ Video presets system
- ✅ Zod schema validation

Full remotion docs can be found here: https://www.remotion.dev/docs/. Consult these docs often if you're uncertain.

---

## 🏗️ Project Structure (Updated v2.0)

```
src/
├── Root.tsx                     # Composition registry with Folder organization
├── index.css                    # Tailwind CSS imports
├── config.ts                    # Global video configuration & utilities
├── presets.ts                   # Aspect ratio presets (720p, 1080p, Square, Portrait)
├── types.ts                     # TypeScript type definitions
├── content.ts                   # Sample content for component demos
├── asciinema-player.d.ts        # Type definitions for ASCII player
├── components/                  # 14 reusable components
│   ├── TitleSlide.tsx          # Animated title screens
│   ├── ContentSlide.tsx        # Header + content layouts
│   ├── VideoSlide.tsx          # Video playback with trim
│   ├── Code.tsx                # Syntax highlighting (Shiki)
│   ├── CodeSlide.tsx           # Code with animated highlights
│   ├── AsciiPlayer.tsx         # Terminal recording player
│   ├── Screenshot.tsx          # Scrollable screenshots
│   ├── DiagramSlide.tsx        # Diagram wrapper with title
│   ├── Diagram.tsx             # Mermaid & D2 diagram renderer
│   ├── Music.tsx               # Background audio with fades
│   ├── ZoomableVideo.tsx       # Video with zoom segments
│   ├── BRollVideo.tsx          # B-roll with zoom & playback rate
│   ├── Caption.tsx             # Word-by-word animated captions
│   └── Logo.tsx                # Animated logo with spring effects
├── compositions/
│   └── karaoke-reel/           # Original KaraokeReel composition
│       ├── Composition.tsx
│       ├── components.tsx
│       ├── config.ts
│       ├── content.ts
│       └── segments/
│           ├── HookSegment.tsx
│           ├── BodySegment.tsx
│           └── CTASegment.tsx
└── utils/                       # Utility functions
```

---

## 🆕 New Features in v2.0

### 1. Tailwind CSS Integration

All components support Tailwind classes via `className` prop:

```tsx
<TitleSlide 
  title="My Video"
  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
/>

<ContentSlide
  header="Styled Content"
  content="Beautiful layouts"
  className="bg-black text-gray-100 font-mono"
/>
```

### 2. Video Presets

Use pre-configured aspect ratios from `src/presets.ts`:

```typescript
import { VIDEO_PRESETS } from './presets';

// Available presets:
VIDEO_PRESETS['Landscape-720p']  // 1280x720, 60fps
VIDEO_PRESETS['Landscape-1080p'] // 1920x1080, 60fps
VIDEO_PRESETS['Square-1080p']    // 1080x1080, 60fps (Instagram post)
VIDEO_PRESETS['Portrait-1080p']  // 1080x1920, 60fps (Instagram Reels/TikTok)
```

### 3. Utility Functions

From `src/config.ts`:

```typescript
import { secondsToFrames, framesToSeconds } from './config';

// Convert seconds to frames
const frames = secondsToFrames(5, 60); // 300 frames at 60fps

// Convert frames to seconds
const seconds = framesToSeconds(300, 60); // 5 seconds at 60fps

// Legacy alias
const duration = getDurationInFrames(5, 60); // Same as secondsToFrames
```

### 4. Zod Schema Validation

All components have runtime type validation:

```tsx
import { titleSlideSchema } from './components/TitleSlide';

// Validates props at runtime
const props = titleSlideSchema.parse({
  title: "My Title",
  className: "bg-black"
});
```

### 5. MCP Integration (AI-Powered Assets)

Generate assets using AI via Model Context Protocol (configured in `.mcp.json`):

**Available MCP Servers:**
- **Playwright**: `npx @playwright/mcp@latest --save-video=1280x720`
  - Commands: `/screenshot`, `/video`
- **ElevenLabs**: `uvx elevenlabs-mcp`
  - Commands: `/voiceover`
- **Replicate**: `https://mcp.replicate.com/sse`
  - AI image/video generation
- **Remotion Docs**: `npx @remotion/mcp@latest`
  - Instant documentation access

**Usage in Claude Code:**
```
/screenshot https://example.com
/video https://example.com --duration 10
/voiceover "Your script text here"
```

---

## 📝 Component Library Reference

### TitleSlide
Animated title screen with fade-in:
```tsx
<TitleSlide title="Welcome" className="bg-black" />
```

### ContentSlide
Header + content layout:
```tsx
<ContentSlide 
  header="Section Title"
  content="Your content here"
  className="px-32 pt-24"
/>
```

### Code / CodeSlide
Syntax-highlighted code with optional line highlighting:
```tsx
<CodeSlide
  title="React Example"
  code={`function App() { return <div>Hello</div>; }`}
  language="tsx"
  animatedHighlights={[
    { timeInSeconds: 0, lines: "1" },
    { timeInSeconds: 2, lines: "2-3" }
  ]}
/>
```

### DiagramSlide / Diagram
Render Mermaid or D2 diagrams:
```tsx
<DiagramSlide
  title="Architecture"
  type="d2"
  diagram={`
    user -> api: Request
    api -> db: Query
  `}
  sketch={false}
/>
```

### VideoSlide / ZoomableVideo / BRollVideo
Video playback with advanced controls:
```tsx
<ZoomableVideo
  src="video.mp4"
  zoomSegments={[
    { startTime: 0, endTime: 3, zoomStart: 1, zoomEnd: 1.5 }
  ]}
/>
```

### Caption
Word-by-word animated captions:
```tsx
<Caption
  words={[
    { text: "Hello", start: 0, end: 0.5 },
    { text: "World", start: 0.5, end: 1 }
  ]}
/>
```

### Music
Background audio with fades:
```tsx
<Music
  src="audio.mp3"
  volume={0.5}
  fadeInSeconds={1}
  fadeOutSeconds={2}
/>
```

### AsciiPlayer
Terminal recording playback:
```tsx
<AsciiPlayer
  mode="animated"
  castFile="recording.cast"
  playbackSpeed={1}
  theme="nord"
/>
```

### Screenshot
Scrollable screenshot:
```tsx
<Screenshot
  src="screenshot.png"
  scrollSpeed={100}
/>
```

### Logo
Animated logo with spring effects:
```tsx
<Logo
  src="logo.png"
  position="top-left"
/>
```

---

## 🎬 Original Remotion Guide

The Root file is named `src/Root.tsx` and now uses Folder organization:

```tsx
import "./index.css";
import { Composition, Folder } from "remotion";
import { TitleSlide, titleSlideSchema } from "./components/TitleSlide";
import { VIDEO_CONFIG } from "./config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Compositions">
        <Composition
          id="MyVideo"
          component={TitleSlide}
          durationInFrames={300}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
          schema={titleSlideSchema}
          defaultProps={{ title: "Hello World" }}
        />
      </Folder>
    </>
  );
};
```

A `<Composition>` defines a video that can be rendered. It consists of:
- **component**: React component to render
- **id**: Unique identifier for rendering
- **durationInFrames**: Total length in frames
- **width/height**: Video dimensions
- **fps**: Frame rate (default: 60)
- **schema**: Zod schema for props validation (optional)
- **defaultProps**: Default props for the component

---

## 🎨 Component Rules

### Frame-Based Animation

Inside a component, use `useCurrentFrame()` to drive animations:

```tsx
import { useCurrentFrame, interpolate } from 'remotion';

export const MyComp: React.FC = () => {
  const frame = useCurrentFrame();
  
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  return <div style={{ opacity }}>Frame {frame}</div>;
};
```

### Media Elements

**Video:**
```tsx
import { OffthreadVideo, staticFile } from 'remotion';

<OffthreadVideo 
  src={staticFile('video.mp4')} 
  startFrom={30}    // Trim first 30 frames
  endAt={180}       // End at 180 frames
  volume={0.8}      // 0-1 volume
/>
```

**Audio:**
```tsx
import { Audio, staticFile } from 'remotion';

<Audio 
  src={staticFile('audio.mp3')}
  volume={0.5}
  startFrom={0}
  endAt={300}
/>
```

**Images:**
```tsx
import { Img, staticFile } from 'remotion';

<Img src={staticFile('image.png')} />
```

### Layering with AbsoluteFill

```tsx
import { AbsoluteFill } from 'remotion';

<AbsoluteFill>
  <AbsoluteFill style={{ background: 'blue' }}>
    <div>Background layer</div>
  </AbsoluteFill>
  <AbsoluteFill>
    <div>Foreground layer</div>
  </AbsoluteFill>
</AbsoluteFill>
```

### Timing with Sequence

```tsx
import { Sequence } from 'remotion';

<Sequence from={30} durationInFrames={60}>
  <div>Appears at frame 30 for 60 frames</div>
</Sequence>
```

### Sequential Display with Series

```tsx
import { Series } from 'remotion';

<Series>
  <Series.Sequence durationInFrames={60}>
    <div>First (0-60)</div>
  </Series.Sequence>
  <Series.Sequence durationInFrames={60}>
    <div>Second (60-120)</div>
  </Series.Sequence>
  <Series.Sequence durationInFrames={60} offset={-10}>
    <div>Third (110-170) - overlaps by 10 frames</div>
  </Series.Sequence>
</Series>
```

### Transitions with TransitionSeries

```tsx
import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { wipe } from '@remotion/transitions/wipe';

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <Fill color="blue" />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    timing={springTiming({ config: { damping: 200 } })}
    presentation={fade()}
  />
  <TransitionSeries.Sequence durationInFrames={60}>
    <Fill color="black" />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

---

## 🔧 Animation Helpers

### interpolate()

Animate values linearly:

```tsx
import { interpolate, useCurrentFrame } from 'remotion';

const frame = useCurrentFrame();
const value = interpolate(frame, [0, 100], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
```

### spring()

Physics-based animations:

```tsx
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const value = spring({
  fps,
  frame,
  config: { damping: 200, stiffness: 100 },
});
```

### random()

Deterministic randomness (required for reproducible renders):

```tsx
import { random } from 'remotion';

const randomValue = random('my-seed'); // Returns 0-1
const randomColor = random('color-seed') > 0.5 ? 'blue' : 'red';
```

**⚠️ NEVER use Math.random()** - videos must be deterministic!

---

## 🎯 Best Practices for Remotion Components

### Remotion Components vs Interactive React

**Remotion Components:**
- Frame-by-frame rendering
- NO user interaction (onClick, onHover)
- NO useState for interactivity
- Must be deterministic
- Animations driven by frame number
- Pure visual presentation

**Normal React:**
- User interactions & events
- State management (useState)
- Real-time responses
- Async data fetching
- Lifecycle effects

### Key Implementation Differences

1. **State**: Use `useCurrentFrame()`, not `useState()`
2. **Animation**: Use `interpolate()`/`spring()`, not CSS transitions
3. **Input**: Props only, no event handlers
4. **Effects**: Avoid `useEffect`, keep calculations pure

### Example: Button

**Interactive React Button:**
```tsx
const Button = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <button onClick={() => setClicked(true)}>
      {clicked ? 'Clicked!' : 'Click me'}
    </button>
  );
};
```

**Remotion Animated Button:**
```tsx
import { useCurrentFrame, interpolate } from 'remotion';

const AnimatedButton = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 30], [1, 1.2], {
    extrapolateRight: 'clamp'
  });
  
  return (
    <div style={{
      transform: `scale(${scale})`,
      background: 'blue',
      padding: '10px 20px'
    }}>
      Click me!
    </div>
  );
};
```

---

## 📚 Additional Resources

- **Remotion Docs**: https://remotion.dev/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Shiki (Syntax Highlighting)**: https://shiki.style
- **Mermaid (Diagrams)**: https://mermaid.js.org
- **D2 (Diagrams)**: https://d2lang.com
- **Zod (Validation)**: https://zod.dev

---

## 🚀 Quick Commands

```bash
# Development
pnpm dev              # Start Remotion Studio
pnpm build            # Bundle for production

# Rendering
pnpm render KaraokeReel out/reel.mp4
pnpm render TitleSlide out/title.mp4 --props='{"title":"My Title"}'

# Maintenance
pnpm upgrade          # Upgrade Remotion
pnpm lint             # Lint & type check
```

---

**Version**: 2.0.0  
**Integration**: claude-remotion-kickstart  
**Status**: ✅ Production Ready
