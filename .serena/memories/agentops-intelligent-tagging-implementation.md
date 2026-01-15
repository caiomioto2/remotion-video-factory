# AgentOps Intelligent Tagging System

**Date:** 2025-12-30
**Status:** Implemented and Verified

## Overview

Enhanced the AgentOps integration with an intelligent, hierarchical tagging system using OpenTelemetry-style namespacing for better observability and filtering in the AgentOps dashboard.

## Tagging Strategy

### Session Tags (Fixed per session)
```python
{
    "project": "agent-content-factory",
    "env": environment,  # from AGENTOPS_ENVIRONMENT
    "version": "0.1.0",
    "language": "pt-BR"
}
```

### Pipeline Tags (Per pipeline run)
```python
{
    "pipeline_id": "pipeline_abc123",
    "content_type": "carousel|video_script|text_post",
    "platform": "instagram|linkedin",
    "count": "3",
    "resume": "true|false"
}
```

### Agent Tags (Per agent operation)
- `agent.name`: carousel_creator, quality_reviewer, etc.
- `agent.model`: glm-4-plus, claude-sonnet, etc.
- `agent.type`: collector, creator, reviewer, base

### Content Tags (Per content piece)
- `content.title`: Draft title
- `content.format`: carousel, video_script, text_post
- `content.agent`: Creating agent name

### Quality Tags (Per review)
- `quality.score`: 0-10 numeric score
- `quality.status`: "approved" (≥7.0) or "needs_revision" (<7.0)
- `quality.title`: Reviewed content title
- `quality.reviewer`: Reviewing agent name

## Modified Files

### 1. `src/utils/agentops_config.py`
- `build_session_tags()` - Intelligent session tags
- `start_pipeline_trace()` - Creates pipeline trace with contextual tags
- `end_pipeline_trace()` - Ends trace with success/failure metrics
- `get_pipeline_context()` - Returns current pipeline context
- `add_span_attributes()` - Adds custom OpenTelemetry-style attributes
- `record_event()` - Now auto-includes pipeline context

### 2. `execution/pipeline.py`
- Integrates `start_pipeline_trace()` at pipeline start
- Integrates `end_pipeline_trace()` with success/failure metrics
- Tracks: total_drafts, approved_drafts, failed_drafts, execution_time_seconds

### 3. `src/agents/base.py`
- `_get_agent_type()` - Classifies agents by MRO inspection
- BaseAgent adds agent.* span attributes on init
- CreatorAgent adds content.* span attributes on execute
- ReviewerAgent adds quality.* span attributes on execute

## Dashboard Filtering Examples

In AgentOps dashboard, you can now filter by:
- `content_type:carousel` - All carousel pipeline runs
- `platform:instagram` - All Instagram content
- `quality.status:needs_revision` - Content needing review
- `agent.type:creator` - All creator agent operations
- `env:production` - Production runs only

## Verification

All files compile successfully:
```bash
python -m py_compile src/utils/agentops_config.py  # ✅
python -m py_compile execution/pipeline.py          # ✅
python -m py_compile src/agents/base.py             # ✅
```

## Technical Notes

- Used MRO (Method Resolution Order) string comparison in `_get_agent_type()` to avoid circular import issues
- Pipeline context is stored in global `_pipeline_context` dict and auto-propagated to events
- Span attributes use OpenTelemetry namespacing convention: `namespace.attribute`
- AgentOps `start_trace()` uses `trace_name` parameter (not `name`) - fixed during testing
- Deprecation warnings for v4 (ActionEvent, record, end_session) are informational only

## Test Results (2025-12-30)

✅ Unit tests: 5/5 passed
✅ Integration test: Pipeline trace working correctly
✅ Dashboard URL generated: https://app.agentops.ai/sessions?trace_id=...
✅ Tags visible: content_type, platform, count, pipeline_id
