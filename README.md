# Remotion Video Factory

**Version 2.0** - Full-featured video creation toolkit integrated with claude-remotion-kickstart

A professional video generator powered by Remotion with karaoke-style reels, pre-built components, and AI-powered asset generation.

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start Remotion Studio
pnpm dev

# Render a video
pnpm render KaraokeReel out/reel.mp4
```

---

## 📦 What's Inside

### Karaoke Reels (Original)
Professional Instagram/TikTok reels with word-by-word animated captions:
- **KaraokeReel**: Full-featured karaoke-style video composition
- Modular segment structure (Hook, Body, CTA)
- Progress bars, segment indicators
- Synchronized audio support

### Component Library (New - from claude-remotion-kickstart)
14 pre-built, production-ready components:

**Slides & Text:**
- `TitleSlide` - Animated title screens
- `ContentSlide` - Header + content layouts
- `Caption` - Word-by-word animated captions

**Code & Technical:**
- `Code` - Syntax-highlighted code blocks (Shiki)
- `CodeSlide` - Code with animated line highlights
- `AsciiPlayer` - Terminal recording playback (.cast files)
- `Screenshot` - Scrollable screenshots

**Media:**
- `VideoSlide` - Video playback with trim controls
- `ZoomableVideo` - Videos with zoom segments
- `BRollVideo` - B-roll with zoom & playback rate
- `Music` - Background audio with fade in/out

**Diagrams & Graphics:**
- `Diagram` - Mermaid & D2 diagram renderer
- `DiagramSlide` - Diagram with title wrapper
- `Logo` - Animated logo with spring effects

---

## 🎨 Features

### Tailwind CSS Integration
All components support Tailwind classes for styling:

```tsx
<TitleSlide 
  title="My Video"
  className="bg-gradient-to-r from-purple-500 to-pink-500"
/>
```

### Video Presets
Pre-configured aspect ratios and frame rates:

```typescript
import { VIDEO_PRESETS } from './src/presets';

// Available presets:
VIDEO_PRESETS['Landscape-720p']  // 1280x720, 60fps
VIDEO_PRESETS['Landscape-1080p'] // 1920x1080, 60fps
VIDEO_PRESETS['Square-1080p']    // 1080x1080, 60fps
VIDEO_PRESETS['Portrait-1080p']  // 1080x1920, 60fps (Instagram/TikTok)
```

### MCP Integration (AI-Powered Assets)
Generate assets using AI via Model Context Protocol:

**Available MCP Servers:**
- **Playwright**: Capture screenshots and videos (`/screenshot`, `/video`)
- **ElevenLabs**: Generate voiceovers (`/voiceover`)
- **Replicate**: AI image/video generation
- **Remotion Docs**: Instant documentation access

**Usage in Claude Code:**
```
/screenshot https://example.com
/video https://example.com --duration 10
/voiceover "Your script here"
```

### Type Safety with Zod
All components have Zod schemas for runtime validation:

```tsx
import { titleSlideSchema } from './components/TitleSlide';

const props = titleSlideSchema.parse({
  title: "My Title",
  className: "bg-black"
});
```

---

## 📁 Project Structure

```
remotion-video-factory/
├── src/
│   ├── Root.tsx                    # Composition registry
│   ├── index.css                   # Tailwind imports
│   ├── config.ts                   # Global video config
│   ├── presets.ts                  # Aspect ratio presets
│   ├── types.ts                    # TypeScript types
│   ├── content.ts                  # Sample content
│   ├── components/                 # Component library (14 components)
│   │   ├── TitleSlide.tsx
│   │   ├── ContentSlide.tsx
│   │   ├── Code.tsx
│   │   ├── CodeSlide.tsx
│   │   ├── VideoSlide.tsx
│   │   ├── ZoomableVideo.tsx
│   │   ├── BRollVideo.tsx
│   │   ├── Music.tsx
│   │   ├── Caption.tsx
│   │   ├── AsciiPlayer.tsx
│   │   ├── Screenshot.tsx
│   │   ├── Diagram.tsx
│   │   ├── DiagramSlide.tsx
│   │   └── Logo.tsx
│   ├── compositions/               # Video compositions
│   │   └── karaoke-reel/          # Karaoke reel composition
│   │       ├── Composition.tsx
│   │       ├── components.tsx
│   │       ├── config.ts
│   │       ├── content.ts
│   │       └── segments/
│   │           ├── HookSegment.tsx
│   │           ├── BodySegment.tsx
│   │           └── CTASegment.tsx
│   └── utils/                      # Utility functions
├── public/                         # Static assets (audio, video, images)
├── .mcp.json                       # MCP server configuration
├── remotion.config.ts              # Remotion configuration
├── postcss.config.mjs              # PostCSS/Tailwind config
├── pnpm-workspace.yaml             # pnpm workspace config
├── package.json                    # Dependencies
└── tsconfig.json                   # TypeScript config
```

---

## 🎬 Creating Your First Video

### Option 1: Use Existing Compositions

```bash
# Open Remotion Studio
pnpm dev

# Browse to http://localhost:3000
# Select a composition from the sidebar
# Adjust props in the right panel
# Preview in real-time
```

### Option 2: Create Custom Composition

```tsx
// src/compositions/my-video/Composition.tsx
import { Composition } from 'remotion';
import { TitleSlide } from '../../components/TitleSlide';
import { VIDEO_CONFIG } from '../../config';

export const MyVideo = () => {
  return (
    <>
      <Composition
        id="MyVideo"
        component={TitleSlide}
        durationInFrames={300}
        fps={VIDEO_CONFIG.fps}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Hello World"
        }}
      />
    </>
  );
};
```

Register in `src/Root.tsx`:
```tsx
import { MyVideo } from './compositions/my-video/Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyVideo />
      {/* ... other compositions */}
    </>
  );
};
```

---

## 🎯 Component Examples

### Code Highlighting
```tsx
import { CodeSlide } from './components/CodeSlide';

<CodeSlide
  title="React Component"
  code={`function App() {
    return <div>Hello</div>;
  }`}
  language="tsx"
  animatedHighlights={[
    { timeInSeconds: 0, lines: "1" },
    { timeInSeconds: 2, lines: "2" }
  ]}
/>
```

### Diagrams
```tsx
import { DiagramSlide } from './components/DiagramSlide';

<DiagramSlide
  title="System Architecture"
  type="d2"
  diagram={`
    user -> api: Request
    api -> db: Query
    db -> api: Response
  `}
/>
```

### Zoomable Video
```tsx
import { ZoomableVideo } from './components/ZoomableVideo';

<ZoomableVideo
  src="video.mp4"
  zoomSegments={[
    { startTime: 0, endTime: 3, zoomStart: 1, zoomEnd: 1.5 }
  ]}
/>
```

---

## 🔧 Configuration

### Video Config (`src/config.ts`)
```typescript
export const VIDEO_CONFIG = {
  width: 1280,
  height: 720,
  fps: 60,
};

// Utility functions
secondsToFrames(5, 60) // 300 frames
framesToSeconds(300, 60) // 5 seconds
```

### Remotion Config (`remotion.config.ts`)
```typescript
import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);
```

---

## 🎨 Styling with Tailwind

All components accept `className` prop:

```tsx
<TitleSlide 
  title="Gradient Title"
  className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
/>

<ContentSlide
  header="Custom Styled"
  content="Beautiful content"
  className="bg-black text-white font-mono"
/>
```

---

## 📝 Scripts

```json
{
  "dev": "remotion studio",              // Start dev server
  "build": "remotion bundle",            // Bundle for production
  "render": "remotion render",           // Render video
  "render:reel": "remotion render KaraokeReel out/reel.mp4",
  "upgrade": "remotion upgrade",         // Upgrade Remotion
  "lint": "eslint src && tsc"            // Lint & type check
}
```

---

## 🔌 Python Integration

This project integrates with the parent `agent-content-factory` pipeline:

```python
# From agent-content-factory/execution/
from remotion_tool import render_video

render_video(
    composition="KaraokeReel",
    output_path=".tmp/renders/reel.mp4",
    props={"scriptPath": "script.json"}
)
```

---

## 🚀 Deployment

### Render Locally
```bash
pnpm render KaraokeReel out/video.mp4
```

### Render with Custom Props
```bash
pnpm render KaraokeReel out/video.mp4 --props='{"title":"My Title"}'
```

### Render All Compositions
```bash
for comp in $(remotion compositions src/index.ts); do
  pnpm render $comp out/$comp.mp4
done
```

---

## 📚 Resources

- **Remotion Docs**: https://remotion.dev/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Shiki**: https://shiki.style (syntax highlighting)
- **Mermaid**: https://mermaid.js.org (diagrams)
- **D2**: https://d2lang.com (diagrams)

---

## 🎯 Integration Status

✅ **Completed:**
- Component library (14 components)
- Tailwind CSS v4 integration
- MCP server configuration
- Video presets system
- Zod schema validation
- Type safety
- KaraokeReel preserved & enhanced

🎉 **Ready to use!**

---

## 📄 License

MIT

---

## 🙏 Credits

- Original project: `remotion-video-factory` (KaraokeReel composition)
- Integration source: [claude-remotion-kickstart](https://github.com/jhartquist/claude-remotion-kickstart)
- Built with [Remotion](https://remotion.dev)
