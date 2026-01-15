# Integration Plan: claude-remotion-kickstart → remotion-video-factory

**Status:** Ready for Implementation  
**Date:** 2026-01-15  
**Objective:** Integrate all features from claude-remotion-kickstart while preserving existing KaraokeReel composition

---

## 📋 Current State Analysis

### Your Project (remotion-video-factory)
```
remotion-video-factory/
├── src/
│   ├── Root.tsx (1 composition: KaraokeReel)
│   ├── index.ts
│   └── compositions/
│       ├── KaraokeReel.tsx
│       └── karaoke-reel/
│           ├── Composition.tsx
│           ├── components.tsx
│           ├── config.ts
│           ├── content.ts
│           └── segments/ (Hook, Body, CTA)
├── package.json (Remotion 4.0.394, React 19.2.3)
├── remotion.config.ts
└── tsconfig.json
```

**Key Features:**
- Karaoke-style reel composition
- Modular segment structure (Hook, Body, CTA)
- Portuguese content support
- Integrated with Python content factory pipeline

### claude-remotion-kickstart
```
claude-remotion-kickstart/
├── src/
│   ├── Root.tsx (14 components + 3 example compositions)
│   ├── components/ (14 reusable components)
│   ├── compositions/ (example1, example2, my-video)
│   ├── utils/
│   ├── config.ts
│   ├── presets.ts
│   ├── types.ts
│   ├── content.ts
│   └── index.css (Tailwind)
├── .mcp.json (MCP integration)
├── pnpm-workspace.yaml
├── postcss.config.mjs
└── package.json (Remotion 4.0.382, Tailwind 4.0)
```

**Key Features:**
- 14 pre-built components (TitleSlide, CodeSlide, Diagrams, etc.)
- Tailwind CSS integration
- MCP servers (Playwright, ElevenLabs, Replicate, Remotion docs)
- Video presets system
- Zod schemas for type safety
- Advanced components (code highlighting, diagrams, ASCII player)

---

## 🎯 Integration Strategy

### Phase 1: Foundation (Non-Breaking)
1. **Update package.json** - Add new dependencies while keeping existing
2. **Add Tailwind CSS** - Configure without breaking existing styles
3. **Add MCP Integration** - Set up .mcp.json for AI asset generation
4. **Migrate to pnpm** - Switch from npm to pnpm workspace
5. **Add config files** - config.ts, presets.ts, types.ts

### Phase 2: Structure Migration
1. **Create directories** - components/, utils/, compositions/
2. **Move KaraokeReel** - Migrate to new structure under compositions/karaoke-reel/
3. **Add component library** - Import all 14 components from kickstart
4. **Update Root.tsx** - Organize with Folders (Compositions, Components)

### Phase 3: Enhancement
1. **Add utils** - Utility functions from kickstart
2. **Add example compositions** - For reference and testing
3. **Update documentation** - README, CLAUDE.md integration guide
4. **Test everything** - Verify KaraokeReel + new components work

---

## 📦 File-by-File Migration Plan

### 1. Package Dependencies
**Action:** Merge package.json dependencies

**New Dependencies to Add:**
```json
{
  "@remotion/preload": "^4.0.394",
  "@remotion/studio": "4.0.394",
  "@remotion/tailwind-v4": "4.0.394",
  "@remotion/transitions": "^4.0.394",
  "@remotion/zod-types": "^4.0.394",
  "@shikijs/transformers": "^3.19.0",
  "@terrastruct/d2": "^0.1.33",
  "asciinema-player": "^3.12.1",
  "mermaid": "^11.12.2",
  "shiki": "^3.19.0",
  "tailwindcss": "4.0.0",
  "zod": "3.22.3"
}
```

**New DevDependencies:**
```json
{
  "@remotion/eslint-config-flat": "4.0.394",
  "@types/web": "0.0.166",
  "prettier": "3.6.0",
  "tsx": "^4.21.0"
}
```

**New Scripts:**
```json
{
  "upgrade": "remotion upgrade",
  "lint": "eslint src && tsc"
}
```

### 2. Configuration Files

#### remotion.config.ts
**Action:** Update to enable Tailwind
```typescript
import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);
```

#### .mcp.json (NEW)
**Action:** Create for MCP integration
```json
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--save-video=1280x720"],
      "env": {}
    },
    "remotion-documentation": {
      "type": "stdio",
      "command": "npx",
      "args": ["@remotion/mcp@latest"],
      "env": {}
    },
    "elevenlabs": {
      "type": "stdio",
      "command": "uvx",
      "args": ["elevenlabs-mcp"],
      "env": {}
    },
    "replicate": {
      "type": "sse",
      "url": "https://mcp.replicate.com/sse"
    }
  }
}
```

#### postcss.config.mjs (NEW)
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

#### pnpm-workspace.yaml (NEW)
```yaml
onlyBuiltDependencies:
  - esbuild
```

### 3. New Source Files

#### src/config.ts (NEW)
```typescript
import { VideoConfig } from "./types";

export const VIDEO_CONFIG: VideoConfig = {
  width: 1280,
  height: 720,
  fps: 60,
};

export const DEFAULT_FPS = 60;

export const secondsToFrames = (seconds: number, fps: number = DEFAULT_FPS): number => {
  return Math.round(seconds * fps);
};

export const framesToSeconds = (frames: number, fps: number = DEFAULT_FPS): number => {
  return frames / fps;
};

export const getDurationInFrames = secondsToFrames;
```

#### src/presets.ts (NEW)
```typescript
export const VIDEO_PRESETS = {
  'Landscape-720p': { width: 1280, height: 720, fps: 60 },
  'Landscape-1080p': { width: 1920, height: 1080, fps: 60 },
  'Square-1080p': { width: 1080, height: 1080, fps: 60 },
  'Portrait-1080p': { width: 1080, height: 1920, fps: 60 },
} as const;

export type PresetName = keyof typeof VIDEO_PRESETS;
```

#### src/types.ts (NEW)
```typescript
export interface VideoConfig {
  width: number;
  height: number;
  fps: number;
}
```

#### src/index.css (UPDATE)
```css
@import "tailwindcss";
```

### 4. Directory Structure Changes

**Target Structure:**
```
remotion-video-factory/
├── src/
│   ├── Root.tsx (updated with Folders)
│   ├── index.ts
│   ├── index.css (Tailwind import)
│   ├── config.ts (NEW)
│   ├── presets.ts (NEW)
│   ├── types.ts (NEW)
│   ├── content.ts (NEW - sample content)
│   ├── asciinema-player.d.ts (NEW)
│   ├── components/ (NEW)
│   │   ├── TitleSlide.tsx
│   │   ├── ContentSlide.tsx
│   │   ├── VideoSlide.tsx
│   │   ├── Code.tsx
│   │   ├── CodeSlide.tsx
│   │   ├── AsciiPlayer.tsx
│   │   ├── Screenshot.tsx
│   │   ├── DiagramSlide.tsx
│   │   ├── Music.tsx
│   │   ├── ZoomableVideo.tsx
│   │   ├── BRollVideo.tsx
│   │   ├── Caption.tsx
│   │   ├── Diagram.tsx
│   │   └── Logo.tsx
│   ├── compositions/
│   │   ├── karaoke-reel/ (EXISTING - PRESERVED)
│   │   │   ├── Composition.tsx
│   │   │   ├── components.tsx
│   │   │   ├── config.ts
│   │   │   ├── content.ts
│   │   │   └── segments/
│   │   │       ├── HookSegment.tsx
│   │   │       ├── BodySegment.tsx
│   │   │       └── CTASegment.tsx
│   │   ├── example1/ (NEW - optional)
│   │   ├── example2/ (NEW - optional)
│   │   └── my-video/ (NEW - template)
│   └── utils/ (NEW)
│       └── (utility functions from kickstart)
├── public/ (EXISTING)
├── .mcp.json (NEW)
├── postcss.config.mjs (NEW)
├── pnpm-workspace.yaml (NEW)
├── package.json (UPDATED)
├── remotion.config.ts (UPDATED)
├── tsconfig.json (UPDATED)
├── CLAUDE.md (UPDATED)
└── README.md (UPDATED)
```

---

## 🔧 Step-by-Step Implementation

### Step 1: Backup & Preparation
```bash
# Create backup
cp -r remotion-video-factory remotion-video-factory-backup

# Switch to project directory
cd remotion-video-factory
```

### Step 2: Install pnpm
```bash
npm install -g pnpm
```

### Step 3: Update package.json
- Merge dependencies
- Add new scripts
- Update Remotion to 4.0.394 (latest stable)

### Step 4: Install Dependencies
```bash
pnpm install
```

### Step 5: Add Configuration Files
- Create .mcp.json
- Create postcss.config.mjs
- Create pnpm-workspace.yaml
- Update remotion.config.ts
- Update tsconfig.json

### Step 6: Add New Source Files
- Create src/config.ts
- Create src/presets.ts
- Create src/types.ts
- Create src/content.ts
- Update src/index.css

### Step 7: Create Component Library
- Create src/components/ directory
- Add all 14 components from kickstart
- Ensure each component has Zod schema

### Step 8: Restructure Compositions
- Move KaraokeReel to compositions/karaoke-reel/
- Update imports in all files
- Preserve all existing functionality

### Step 9: Update Root.tsx
- Import Tailwind CSS
- Organize with Folder components
- Add KaraokeReel under Compositions folder
- Add all 14 components under Components folder
- Add example compositions (optional)

### Step 10: Test Everything
```bash
pnpm dev  # Should open Remotion Studio
# Verify KaraokeReel still works
# Test new components
```

---

## ✅ Success Criteria

1. **KaraokeReel Preserved** - Existing composition works exactly as before
2. **Tailwind Working** - Can use Tailwind classes in components
3. **MCP Integration** - Can use /screenshot, /video, /voiceover commands
4. **Component Library** - All 14 components render correctly
5. **Build Success** - `pnpm build` completes without errors
6. **Python Integration** - Content factory pipeline still works
7. **Documentation Updated** - CLAUDE.md reflects new structure

---

## 🚨 Risk Mitigation

### Risk 1: Breaking KaraokeReel
**Mitigation:** 
- Create full backup first
- Test after each major change
- Keep separate branch for migration

### Risk 2: Dependency Conflicts
**Mitigation:**
- Use exact versions from kickstart
- Test incrementally
- Have rollback plan

### Risk 3: Python Pipeline Integration
**Mitigation:**
- Verify remotion CLI still works
- Test render commands
- Update Python scripts if needed

---

## 📚 Post-Integration Documentation

### Update CLAUDE.md
Add sections:
- Component library reference
- MCP integration guide
- Video presets usage
- Tailwind styling guide

### Create README.md
Include:
- Quick start guide
- Component examples
- MCP commands
- Rendering presets

---

## 🎬 Next Steps

Ready to begin implementation? I can:

1. **Full Automated Migration** - Run all steps automatically
2. **Step-by-Step Guided** - Guide you through each phase with validation
3. **Custom Approach** - Pick specific features to integrate first

Which approach would you prefer?
