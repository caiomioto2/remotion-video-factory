# Session Context: Agent Content Factory

**Date**: 2025-12-23
**Project**: agent-content-factory
**Status**: Architecture established, implementation in progress

## Project Overview

Multi-agent content factory for social media (Instagram & LinkedIn) using a 3-layer architecture:

### Architecture Layers
1. **Directive Layer** (`directives/`): SOPs in Markdown defining goals, inputs, tools, outputs
2. **Orchestration Layer**: AI agent for intelligent routing and decision-making
3. **Execution Layer** (`execution/`): Deterministic Python scripts for reliable operations

### Pipeline Structure
1. **Collectors** (Parallel): NotionCollector, TrendWatcher, DiaryMiner
2. **Creators** (Sequential): VideoScripter, CarouselCreator, TextComposer
3. **Reviewers**: QualityReviewer
4. **Production** (Parallel): VideoRenderer, GraphicsGenerator
5. **Publishing**: Via n8n workflows

### LLM Strategy
- **GLM 4.7 (via ZEIA)**: 90% of tasks - collection, drafts (FREE)
- **Claude**: High-quality tasks - review, refinement (QUALITY)
- **Gemini Flash**: Fallback/backup (RESILIENCE)
- Integration via **LiteLLM** for unified API

## Directory Structure
```
agent-content-factory/
├── directives/           # SOPs in Markdown
├── execution/            # Deterministic Python scripts
├── src/                  # Core library (agents, models, tools)
│   ├── agents/
│   ├── models/
│   └── tools/
├── .tmp/                 # Intermediate files
└── .env                  # Environment variables
```

## Key Principles
- **Self-annealing**: Errors → Fix → Update tool → Update directive
- **Deliverables in cloud**: Notion Draft Queue, Instagram, LinkedIn
- **Local files for processing only**: `.tmp/` is ephemeral

## Integration Points
- **Notion MCP**: Content source and Draft Queue
- **Serena MCP**: Session persistence and project memory
- **Tavily**: Trend monitoring
- **n8n**: Publishing workflows

## Next Steps
- Implement collectors (NotionCollector, TrendWatcher, DiaryMiner)
- Create directives for each pipeline stage
- Set up LiteLLM configuration for multi-LLM routing
