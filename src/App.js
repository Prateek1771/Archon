import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import mermaid from 'mermaid';

// ─── Responsive Hook ─────────────────────────────────────────────────────────
function useBreakpoint() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    let raf;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setWidth(window.innerWidth));
    };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, []);
  return useMemo(() => ({
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    width,
  }), [width]);
}

// ─── Design Tokens ──────────────────────────────────────────────────────────
const T = {
  bg: '#08080D',
  bgSubtle: '#0B0B14',
  surface: '#10101C',
  surfaceRaised: '#151522',
  border: '#1C1C30',
  borderHover: '#2A2A45',
  borderActive: '#3A3A55',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#526077',
  teal: '#00BCD4',
  orange: '#F5A623',
  green: '#10B981',
  deepTeal: '#0097A7',
  warmOrange: '#E8873A',
  red: '#EF4444',
  lightCyan: '#22D3EE',
  codeText: '#7DD3FC',
  codeBg: '#0C0C16',
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'Plus Jakarta Sans', sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
  // Glow helpers
  glowTeal: '0 0 20px rgba(0,188,212,0.15), 0 0 40px rgba(0,188,212,0.05)',
  glowOrange: '0 0 20px rgba(245,166,35,0.15), 0 0 40px rgba(245,166,35,0.05)',
  glowGreen: '0 0 20px rgba(16,185,129,0.15), 0 0 40px rgba(16,185,129,0.05)',
  radius: { sm: 6, md: 10, lg: 14, xl: 20 },
};

// ─── Typewriter Hook ─────────────────────────────────────────────────────────
function useTypewriter(text, speed = 15) {
  const [displayed, setDisplayed] = useState('');
  const prevText = useRef('');

  useEffect(() => {
    if (!text) { setDisplayed(''); return; }
    if (text === prevText.current) return;
    prevText.current = text;
    setDisplayed('');
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return text ? displayed : '';
}

const SDLC_COLORS = {
  planning: T.teal,
  design: T.orange,
  development: T.green,
  testing: T.warmOrange,
  deployment: T.red,
  documentation: T.deepTeal,
};

const TAB_CONFIG = [
  { key: 'phases', label: 'Phases', accent: T.teal, icon: PhaseIcon },
  { key: 'agents', label: 'Agents', accent: T.orange, icon: AgentIcon },
  { key: 'skills', label: 'Skills', accent: T.green, icon: SkillIcon },
  { key: 'mcp', label: 'MCP', accent: T.deepTeal, icon: McpIcon },
  { key: 'docs', label: 'Docs Agent', accent: T.warmOrange, icon: DocsIcon },
  { key: 'flow', label: 'Flow', accent: T.lightCyan, icon: FlowIcon },
];

const PLACEHOLDER_PRD = `# Example: Task Management SaaS

## Overview
Build a collaborative task management application with real-time updates, team workspaces, and AI-powered task prioritization.

## Tech Stack
- Frontend: React + TypeScript
- Backend: Node.js + Express
- Database: PostgreSQL with Prisma ORM
- Real-time: WebSocket (Socket.io)
- Auth: JWT + OAuth (Google, GitHub)
- Deployment: Docker + AWS ECS

## Core Features
1. User authentication (email/password + OAuth)
2. Team workspaces with role-based access
3. Kanban boards with drag-and-drop
4. Real-time collaboration (live cursors, instant updates)
5. AI task prioritization using Claude API
6. File attachments (S3 storage)
7. Email notifications + in-app notifications
8. Activity audit log
9. REST API for third-party integrations
10. Dashboard with analytics charts

Paste your own PRD here and click "Generate CLI Architecture"...`;

// ─── SVG Icon Components ────────────────────────────────────────────────────
function PhaseIcon({ size = 16, color = T.teal }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
    </svg>
  );
}
function AgentIcon({ size = 16, color = T.orange }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /><circle cx="12" cy="16" r="1" />
    </svg>
  );
}
function SkillIcon({ size = 16, color = T.green }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}
function McpIcon({ size = 16, color = T.deepTeal }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
function DocsIcon({ size = 16, color = T.warmOrange }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10,9 9,9 8,9" />
    </svg>
  );
}
function CopyIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}
function CheckIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}
function ExternalLinkIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15,3 21,3 21,9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
function TypeIcon({ type, size = 14 }) {
  const colors = { agent: T.orange, mcp: T.deepTeal, skill: T.green, claude: T.teal, docs: T.warmOrange, command: T.textSecondary };
  const c = colors[type] || T.textMuted;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4,17 10,11 4,5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}
function UploadIcon({ size = 20, color = T.textMuted }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17,8 12,3 7,8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
function FileIcon({ size = 14, color = T.textSecondary }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13,2 13,9 20,9" />
    </svg>
  );
}
function CloseIcon({ size = 12, color = T.textMuted }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function DownloadIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function FolderIcon({ size = 14, color = T.deepTeal }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  );
}
function FlowIcon({ size = 16, color = T.lightCyan }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="3" width="6" height="6" rx="1" /><rect x="9" y="15" width="6" height="6" rx="1" /><path d="M6 9v3a1 1 0 001 1h4v2" /><path d="M18 9v3a1 1 0 01-1 1h-4v2" />
    </svg>
  );
}

// ─── System Prompt ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an elite software architect and Claude CLI expert. Your job is to analyze a Product Requirements Document (PRD) and generate a complete, structured Claude CLI project setup.

You MUST output ONLY valid JSON — no preamble, no backticks, no explanation, no markdown wrapping. Just raw JSON.

Output this exact schema:
{
  "projectName": "string",
  "projectSummary": "string — 2-3 sentence overview of what the project does",
  "phases": [
    {
      "id": "phase-N",
      "name": "Phase name",
      "description": "What this phase accomplishes",
      "steps": [
        {
          "id": "step-N-M",
          "type": "agent | mcp | skill | claude | docs | command",
          "label": "Short step title",
          "command": "Exact copy-paste CLI command",
          "description": "Why this step is needed",
          "sdlcStage": "planning | design | development | testing | deployment | documentation"
        }
      ]
    }
  ],
  "agents": [
    {
      "name": "Agent Name",
      "purpose": "Single clear responsibility",
      "command": "/agent create agent-name --role '...' --context '...'"
    }
  ],
  "skills": [
    {
      "name": "skill name",
      "url": "https://skills.sh/owner/repo/skill-name",
      "reason": "Why this skill is relevant",
      "installCommand": "npx skills add owner/repo@skill-name -g -y"
    }
  ],
  "mcpServers": [
    {
      "name": "MCP Server Name",
      "purpose": "What this server enables",
      "command": "/mcp add server-name"
    }
  ],
  "documentationPlan": {
    "overview": "What the doc agent will document",
    "docAgentCommand": "/agent create doc-agent --role '...' --context '...'",
    "artifacts": ["README.md", "ARCHITECTURE.md", "API_CONTRACTS.md", "CHANGELOG.md", "DECISIONS.md"]
  },
  "flowDiagram": {
    "title": "Short diagram title (e.g. 'System Architecture Flow')",
    "description": "1-2 sentence description of what the diagram shows",
    "mermaidCode": "Valid Mermaid flowchart/graph code — use graph TD or flowchart TD. Must show the systematic flow of the entire project: phases, agents, services, data flow, and deployment pipeline. Use subgraphs to group related nodes. Use meaningful labels. Use --> for connections with labels where helpful."
  },
  "generatedFiles": [
    {
      "filename": "README.md",
      "language": "markdown",
      "description": "What this file does",
      "content": "Full file content ready to save"
    },
    {
      "filename": "CLAUDE.md",
      "language": "markdown",
      "description": "Claude CLI project config",
      "content": "Full file content"
    },
    {
      "filename": ".env.example",
      "language": "env",
      "description": "Environment variable template",
      "content": "Full file content"
    },
    {
      "filename": "docker-compose.yml",
      "language": "yaml",
      "description": "Docker setup if applicable",
      "content": "Full file content"
    }
  ]
}

SDLC phases to follow strictly:
1. Requirements Analysis & Planning
2. System Design & Architecture
3. Environment Setup (MCP, Skills, Agent initialization)
4. Feature Development (broken into logical modules)
5. Testing & QA
6. Documentation & Knowledge Capture
7. Deployment & Release

Agent generation rules:
- Single Responsibility Principle — one agent, one domain
- Every agent command MUST include --role and --context flags
- --context must be a rich paragraph: full scope, tech stack, deliverables, acceptance criteria, error handling
- Agents must reference other agents by name for handoffs
- Include explicit error handling instructions

Skills detection (use https://skills.sh as the source of truth):
- Scan PRD for technology signals (framework names, feature types, integrations)
- Map signals to real skills from skills.sh — use actual owner/repo@skill-name format
- Known popular skills: vercel-labs/agent-skills@vercel-react-best-practices, vercel-labs/agent-skills@web-design-guidelines, anthropics/skills@frontend-design, vercel-labs/agent-skills@vercel-composition-patterns, vercel-labs/agent-browser@agent-browser, anthropics/skills@skill-creator, remotion-dev/skills@remotion-best-practices, nextlevelbuilder/ui-ux-pro-max-skill@ui-ux-pro-max, browser-use/browser-use@browser-use
- Install command format: npx skills add owner/repo@skill-name -g -y
- URL format: https://skills.sh/owner/repo/skill-name
- Always include the find-skills meta-skill: npx skills add vercel-labs/skills@find-skills -g -y (helps discover more skills at runtime)

Documentation Agent (ALWAYS include):
- Track architectural decisions (ADRs)
- Document every agent output format and contract
- Generate living README and CHANGELOG
- Create architecture diagrams (Mermaid/ASCII)
- Log handoffs between agents
- Run at end of every major phase

Flow Diagram (ALWAYS include):
- Generate a comprehensive Mermaid flowchart showing the project's systematic flow
- Include: SDLC phases as subgraphs, agent interactions, data flow between services, deployment pipeline
- Use flowchart TD (top-down) or flowchart LR (left-right) syntax
- Group related nodes using subgraph blocks
- Use styled nodes: rounded rectangles for processes, diamonds for decisions, cylinders for databases
- Connect nodes with labeled arrows showing data/control flow
- Make it detailed enough to serve as a project architecture overview
- The mermaidCode must be valid, renderable Mermaid syntax

Generated Files (ALWAYS include at least README.md, CLAUDE.md, .env.example):
- Always include: README.md (project readme), CLAUDE.md (Claude CLI project config), .env.example (env vars with placeholders)
- Optionally include ONE of: docker-compose.yml, package.json, .gitignore — only if clearly needed by the PRD
- Keep file content concise and focused — README should be under 80 lines, CLAUDE.md under 40 lines
- Content must be specific to the project described in the PRD

CRITICAL OUTPUT CONSTRAINTS:
- Keep total output under 20000 tokens. Prioritize quality over verbosity.
- Agent --context flags: 2-3 sentences max, not full paragraphs.
- Phases: max 6 phases, max 3 steps per phase. Merge small phases together.
- Generated files: concise and practical, not exhaustive. No filler sections.
- Mermaid diagram: keep under 30 nodes. Use subgraphs sparingly.
- Do NOT repeat information across sections.

Output ONLY valid JSON. No text before or after.`;

// ─── Copy Button Component ─────────────────────────────────────────────────
function CopyButton({ text, accent = T.teal }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '4px 10px', border: `1px solid ${copied ? T.green : T.border}`,
        borderRadius: 4, background: copied ? T.green + '18' : 'transparent',
        color: copied ? T.green : T.textSecondary, cursor: 'pointer',
        fontFamily: T.fontMono, fontSize: 11, fontWeight: 500,
        transition: 'all 200ms ease',
      }}
      onMouseEnter={e => { if (!copied) { e.target.style.borderColor = accent; e.target.style.color = accent; }}}
      onMouseLeave={e => { if (!copied) { e.target.style.borderColor = T.border; e.target.style.color = T.textSecondary; }}}
    >
      {copied ? <><CheckIcon /> COPIED</> : <><CopyIcon /> COPY</>}
    </button>
  );
}

// ─── Code Block Component ───────────────────────────────────────────────────
function CodeBlock({ command, accent = T.teal }) {
  return (
    <div style={{
      background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: T.radius.sm,
      padding: '10px 14px', marginTop: 10, display: 'flex',
      alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
      position: 'relative',
    }}>
      {/* Accent left bar */}
      <div style={{
        position: 'absolute', left: 0, top: 8, bottom: 8, width: 2,
        borderRadius: 1, background: accent + '40',
      }} />
      <code style={{
        fontFamily: T.fontMono, fontSize: 12, color: T.codeText,
        lineHeight: 1.6, wordBreak: 'break-all', flex: 1, whiteSpace: 'pre-wrap',
        paddingLeft: 6,
      }}>
        {command}
      </code>
      <CopyButton text={command} accent={accent} />
    </div>
  );
}

// ─── SDLC Badge ─────────────────────────────────────────────────────────────
function SdlcBadge({ stage }) {
  const color = SDLC_COLORS[stage] || T.textMuted;
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 9999,
      background: color + '18', color, fontSize: 10, fontWeight: 600,
      fontFamily: T.fontMono, textTransform: 'uppercase', letterSpacing: '0.05em',
    }}>
      {stage}
    </span>
  );
}

// ─── Stat Pill ──────────────────────────────────────────────────────────────
function StatPill({ label, count, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 14px', borderRadius: 9999, background: color + '10',
      border: `1px solid ${color}22`, fontFamily: T.fontMono, fontSize: 12,
      transition: 'all 200ms ease-out',
    }}>
      <span style={{ color, fontWeight: 700, fontSize: 13 }}>{count}</span>
      <span style={{ color: T.textSecondary, fontSize: 11 }}>{label}</span>
    </span>
  );
}

// ─── Phases Tab ─────────────────────────────────────────────────────────────
function PhasesTab({ phases }) {
  const [activePhase, setActivePhase] = useState(0);
  const bp = useBreakpoint();
  if (!phases?.length) return <EmptyState message="No phases generated." />;
  const phase = phases[activePhase];

  return (
    <div style={{
      display: 'flex',
      flexDirection: bp.isMobile ? 'column' : 'row',
      gap: bp.isMobile ? 14 : 18, height: '100%',
    }}>
      {/* Phase selector — horizontal scroll on mobile, vertical sidebar on desktop */}
      <div style={{
        display: 'flex',
        flexDirection: bp.isMobile ? 'row' : 'column',
        gap: 4,
        ...(bp.isMobile
          ? { overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }
          : { minWidth: 48, paddingTop: 4, position: 'relative' }),
      }}>
        {/* Connector line — only on desktop */}
        {!bp.isMobile && (
          <div style={{
            position: 'absolute', left: 19, top: 24, bottom: 24, width: 1,
            background: T.border, zIndex: 0,
          }} />
        )}
        {phases.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActivePhase(i)}
            style={{
              width: bp.isMobile ? 36 : 40, height: bp.isMobile ? 36 : 40,
              borderRadius: T.radius.md, border: 'none', flexShrink: 0,
              background: i === activePhase
                ? `linear-gradient(135deg, ${T.teal}25 0%, ${T.teal}10 100%)`
                : 'transparent',
              color: i === activePhase ? T.teal : T.textMuted,
              fontFamily: T.fontMono, fontSize: bp.isMobile ? 12 : 14, fontWeight: 600,
              cursor: 'pointer', transition: 'all 250ms ease-out',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', zIndex: 1,
              boxShadow: i === activePhase ? `0 0 12px ${T.teal}20` : 'none',
              outline: i === activePhase ? `1px solid ${T.teal}40` : 'none',
            }}
            onMouseEnter={e => { if (i !== activePhase) { e.currentTarget.style.color = T.teal; e.currentTarget.style.background = T.surface; } }}
            onMouseLeave={e => { if (i !== activePhase) { e.currentTarget.style.color = T.textMuted; e.currentTarget.style.background = 'transparent'; } }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Phase content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <h3 style={{
          fontFamily: T.fontDisplay, fontSize: bp.isMobile ? 16 : 18, fontWeight: 700,
          color: T.textPrimary, margin: '0 0 6px 0', letterSpacing: '-0.02em',
        }}>
          {phase.name}
        </h3>
        <p style={{
          fontFamily: T.fontBody, fontSize: 13, color: T.textSecondary,
          margin: '0 0 18px 0', lineHeight: 1.6,
        }}>
          {phase.description}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {phase.steps?.map((step, idx) => (
            <div key={step.id} style={{
              background: T.surface, border: `1px solid ${T.border}`,
              borderRadius: T.radius.md, padding: 16,
              transition: 'border-color 250ms ease-out, box-shadow 250ms ease-out',
              animation: `fadeSlideIn 0.4s ease-out ${idx * 0.08}s both`,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,0.2)`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                marginBottom: 6, flexWrap: 'wrap',
              }}>
                <TypeIcon type={step.type} />
                <span style={{
                  fontFamily: T.fontMono, fontSize: 13, fontWeight: 600,
                  color: T.textPrimary,
                }}>
                  {step.label}
                </span>
                <SdlcBadge stage={step.sdlcStage} />
              </div>
              <p style={{
                fontFamily: T.fontMono, fontSize: 12, color: T.textSecondary,
                margin: 0, lineHeight: 1.5,
              }}>
                {step.description}
              </p>
              {step.command && <CodeBlock command={step.command} accent={T.teal} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Agents Tab ─────────────────────────────────────────────────────────────
function AgentsTab({ agents }) {
  if (!agents?.length) return <EmptyState message="No agents required for this project." />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {agents.map((agent, i) => (
        <div key={i} style={{
          background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius.md,
          padding: 18, transition: 'border-color 250ms ease-out, box-shadow 250ms ease-out',
          animation: `fadeSlideIn 0.4s ease-out ${i * 0.08}s both`,
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.orange + '50'; e.currentTarget.style.boxShadow = `0 4px 20px ${T.orange}10`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <AgentIcon size={16} color={T.orange} />
            <span style={{
              fontFamily: T.fontMono, fontSize: 14, fontWeight: 600, color: T.orange,
            }}>
              {agent.name}
            </span>
          </div>
          <p style={{
            fontFamily: T.fontMono, fontSize: 12, color: T.textSecondary,
            margin: 0, lineHeight: 1.5,
          }}>
            {agent.purpose}
          </p>
          <CodeBlock command={agent.command} accent={T.orange} />
        </div>
      ))}
    </div>
  );
}

// ─── Skills Tab ─────────────────────────────────────────────────────────────
function SkillsTab({ skills }) {
  if (!skills?.length) return <EmptyState message="No skills required for this project." />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{
        background: T.green + '10', border: `1px solid ${T.green}30`,
        borderRadius: 8, padding: '10px 14px', fontFamily: T.fontMono,
        fontSize: 11, color: T.green, display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <SkillIcon size={14} color={T.green} />
        Skills sourced from skills.sh — visit for the full catalog
      </div>

      {skills.map((skill, i) => (
        <div key={i} style={{
          background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius.md,
          padding: 18, transition: 'border-color 250ms ease-out, box-shadow 250ms ease-out',
          animation: `fadeSlideIn 0.4s ease-out ${i * 0.08}s both`,
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.green + '50'; e.currentTarget.style.boxShadow = `0 4px 20px ${T.green}10`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <SkillIcon size={16} color={T.green} />
              <span style={{
                fontFamily: T.fontMono, fontSize: 14, fontWeight: 600, color: T.green,
              }}>
                {skill.name}
              </span>
            </div>
            {skill.url && (
              <a
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  color: T.textMuted, fontFamily: T.fontMono, fontSize: 11,
                  textDecoration: 'none', transition: 'color 200ms',
                }}
                onMouseEnter={e => e.currentTarget.style.color = T.green}
                onMouseLeave={e => e.currentTarget.style.color = T.textMuted}
              >
                skills.sh <ExternalLinkIcon />
              </a>
            )}
          </div>
          <p style={{
            fontFamily: T.fontMono, fontSize: 12, color: T.textSecondary,
            margin: 0, lineHeight: 1.5,
          }}>
            {skill.reason}
          </p>
          <CodeBlock command={skill.installCommand} accent={T.green} />
        </div>
      ))}
    </div>
  );
}

// ─── MCP Tab ────────────────────────────────────────────────────────────────
function McpTab({ mcpServers }) {
  if (!mcpServers?.length) return <EmptyState message="No MCP servers required for this project." />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {mcpServers.map((server, i) => (
        <div key={i} style={{
          background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius.md,
          padding: 18, transition: 'border-color 250ms ease-out, box-shadow 250ms ease-out',
          animation: `fadeSlideIn 0.4s ease-out ${i * 0.08}s both`,
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.deepTeal + '50'; e.currentTarget.style.boxShadow = `0 4px 20px ${T.deepTeal}10`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <McpIcon size={16} color={T.deepTeal} />
            <span style={{
              fontFamily: T.fontMono, fontSize: 14, fontWeight: 600, color: T.deepTeal,
            }}>
              {server.name}
            </span>
          </div>
          <p style={{
            fontFamily: T.fontMono, fontSize: 12, color: T.textSecondary,
            margin: 0, lineHeight: 1.5,
          }}>
            {server.purpose}
          </p>
          <CodeBlock command={server.command} accent={T.deepTeal} />
        </div>
      ))}
    </div>
  );
}

// ─── Docs Tab ───────────────────────────────────────────────────────────────
function DocsTab({ documentationPlan }) {
  if (!documentationPlan) return <EmptyState message="No documentation plan generated." />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{
        background: T.surface, border: `1px solid ${T.warmOrange}30`, borderRadius: 8,
        padding: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <DocsIcon size={20} color={T.warmOrange} />
          <span style={{
            fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 700, color: T.warmOrange,
            letterSpacing: '-0.02em',
          }}>
            Documentation Agent
          </span>
        </div>

        <p style={{
          fontFamily: T.fontMono, fontSize: 13, color: T.textSecondary,
          margin: '0 0 16px 0', lineHeight: 1.6,
        }}>
          {documentationPlan.overview}
        </p>

        <CodeBlock command={documentationPlan.docAgentCommand} accent={T.warmOrange} />

        {documentationPlan.artifacts?.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <span style={{
              fontFamily: T.fontMono, fontSize: 11, fontWeight: 600,
              color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              Artifacts Produced
            </span>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8,
            }}>
              {documentationPlan.artifacts.map((artifact, i) => (
                <span key={i} style={{
                  display: 'inline-block', padding: '4px 10px', borderRadius: 6,
                  background: T.warmOrange + '14', border: `1px solid ${T.warmOrange}30`,
                  fontFamily: T.fontMono, fontSize: 12, color: T.warmOrange,
                }}>
                  {artifact}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Flow Diagram Tab ──────────────────────────────────────────────────────
function FlowTab({ flowDiagram }) {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [renderError, setRenderError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!flowDiagram?.mermaidCode) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#00ACC1',
        primaryTextColor: '#F1F5F9',
        primaryBorderColor: '#1E1E2E',
        lineColor: '#22D3EE',
        secondaryColor: '#F5A623',
        tertiaryColor: '#0F0F1A',
        background: '#0A0A0F',
        mainBkg: '#1E1E2E',
        nodeBorder: '#00ACC1',
        clusterBkg: '#0F0F1A',
        clusterBorder: '#1E1E2E',
        titleColor: '#F1F5F9',
        edgeLabelBackground: '#0F0F1A',
        nodeTextColor: '#F1F5F9',
      },
      flowchart: { curve: 'basis', padding: 16 },
      fontFamily: "'IBM Plex Mono', monospace",
    });

    const renderDiagram = async () => {
      try {
        setRenderError(null);
        const id = 'flow-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
        const { svg } = await mermaid.render(id, flowDiagram.mermaidCode);
        setSvgContent(svg);
      } catch (err) {
        setRenderError(err.message || 'Failed to render diagram');
        setSvgContent('');
      }
    };

    renderDiagram();
  }, [flowDiagram?.mermaidCode, retryCount]);

  if (!flowDiagram) return <EmptyState message="No flow diagram generated." />;

  const handleDownloadSVG = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flow-diagram.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = () => {
    if (!svgContent) return;
    const svgEl = containerRef.current?.querySelector('svg');
    if (!svgEl) return;

    const canvas = document.createElement('canvas');
    const bbox = svgEl.getBoundingClientRect();
    const scale = 2;
    canvas.width = bbox.width * scale;
    canvas.height = bbox.height * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    const svgData = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = '#0A0A0F';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, bbox.width, bbox.height);
      URL.revokeObjectURL(svgUrl);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const pngUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = 'flow-diagram.png';
        a.click();
        URL.revokeObjectURL(pngUrl);
      }, 'image/png');
    };
    img.src = svgUrl;
  };

  const handleDownloadMmd = () => {
    const blob = new Blob([flowDiagram.mermaidCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flow-diagram.mmd';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <FlowIcon size={20} color={T.lightCyan} />
            <span style={{
              fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 700, color: T.lightCyan,
              letterSpacing: '-0.02em',
            }}>
              {flowDiagram.title || 'Project Flow Diagram'}
            </span>
          </div>
          {flowDiagram.description && (
            <p style={{
              fontFamily: T.fontMono, fontSize: 12, color: T.textSecondary,
              margin: 0, lineHeight: 1.5,
            }}>
              {flowDiagram.description}
            </p>
          )}
        </div>

        {/* Download buttons */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button
            onClick={handleDownloadSVG}
            disabled={!svgContent}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '6px 12px', border: `1px solid ${T.border}`, borderRadius: 6,
              background: 'transparent', color: svgContent ? T.lightCyan : T.textMuted,
              cursor: svgContent ? 'pointer' : 'not-allowed',
              fontFamily: T.fontMono, fontSize: 11, fontWeight: 500,
              transition: 'all 200ms',
            }}
            onMouseEnter={e => { if (svgContent) { e.currentTarget.style.borderColor = T.lightCyan; e.currentTarget.style.background = T.lightCyan + '10'; }}}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = 'transparent'; }}
          >
            <DownloadIcon size={12} /> SVG
          </button>
          <button
            onClick={handleDownloadPNG}
            disabled={!svgContent}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '6px 12px', border: `1px solid ${T.border}`, borderRadius: 6,
              background: 'transparent', color: svgContent ? T.green : T.textMuted,
              cursor: svgContent ? 'pointer' : 'not-allowed',
              fontFamily: T.fontMono, fontSize: 11, fontWeight: 500,
              transition: 'all 200ms',
            }}
            onMouseEnter={e => { if (svgContent) { e.currentTarget.style.borderColor = T.green; e.currentTarget.style.background = T.green + '10'; }}}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = 'transparent'; }}
          >
            <DownloadIcon size={12} /> PNG
          </button>
          <button
            onClick={handleDownloadMmd}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '6px 12px', border: `1px solid ${T.border}`, borderRadius: 6,
              background: 'transparent', color: T.orange,
              cursor: 'pointer',
              fontFamily: T.fontMono, fontSize: 11, fontWeight: 500,
              transition: 'all 200ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.orange; e.currentTarget.style.background = T.orange + '10'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = 'transparent'; }}
          >
            <DownloadIcon size={12} /> .mmd
          </button>
        </div>
      </div>

      {/* Rendered diagram preview */}
      <div style={{
        background: T.surface, border: `1px solid ${T.lightCyan}30`, borderRadius: 8,
        padding: 24, overflow: 'auto', minHeight: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {renderError ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          }}>
            <span style={{
              fontFamily: T.fontMono, fontSize: 12, color: T.red,
            }}>
              Failed to render diagram
            </span>
            <span style={{
              fontFamily: T.fontMono, fontSize: 11, color: T.textMuted,
              maxWidth: 400, textAlign: 'center', lineHeight: 1.5,
            }}>
              {renderError}
            </span>
            <button
              onClick={() => setRetryCount(c => c + 1)}
              style={{
                padding: '6px 14px', border: `1px solid ${T.border}`, borderRadius: 6,
                background: 'transparent', color: T.lightCyan, cursor: 'pointer',
                fontFamily: T.fontMono, fontSize: 11, fontWeight: 500,
                transition: 'all 200ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.lightCyan; e.currentTarget.style.background = T.lightCyan + '10'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = 'transparent'; }}
            >
              Retry Render
            </button>
          </div>
        ) : svgContent ? (
          <div
            ref={containerRef}
            dangerouslySetInnerHTML={{ __html: svgContent }}
            style={{ maxWidth: '100%', overflow: 'auto' }}
          />
        ) : (
          <span style={{
            fontFamily: T.fontMono, fontSize: 12, color: T.textMuted,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}>
            Rendering diagram...
          </span>
        )}
      </div>

      {/* Toggle code view */}
      <button
        onClick={() => setShowCode(!showCode)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
          padding: '6px 14px', border: `1px solid ${T.border}`, borderRadius: 6,
          background: showCode ? T.lightCyan + '10' : 'transparent',
          color: showCode ? T.lightCyan : T.textSecondary,
          cursor: 'pointer', fontFamily: T.fontMono, fontSize: 11, fontWeight: 500,
          transition: 'all 200ms',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = T.lightCyan; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" />
        </svg>
        {showCode ? 'Hide Mermaid Code' : 'Show Mermaid Code'}
      </button>

      {/* Mermaid source code */}
      {showCode && (
        <div style={{
          background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8,
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 14px', borderBottom: `1px solid ${T.border}`,
            background: T.bg,
          }}>
            <span style={{
              fontFamily: T.fontMono, fontSize: 11, fontWeight: 600,
              color: T.lightCyan, textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              Mermaid
            </span>
            <CopyButton text={flowDiagram.mermaidCode} accent={T.lightCyan} />
          </div>
          <pre style={{
            padding: 16, margin: 0, overflow: 'auto',
            fontFamily: T.fontMono, fontSize: 12, color: T.codeText,
            lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
          }}>
            {flowDiagram.mermaidCode}
          </pre>
        </div>
      )}
    </div>
  );
}

// ─── Empty State ────────────────────────────────────────────────────────────
function EmptyState({ message }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: 200, fontFamily: T.fontMono, fontSize: 13, color: T.textMuted,
      border: `1px dashed ${T.border}`, borderRadius: T.radius.md,
      background: T.surface + '40',
    }}>
      {message}
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────────
// ─── Generated Files Tab Panel ──────────────────────────────────────────────
function GeneratedFilesPanel({ files }) {
  const [activeFile, setActiveFile] = useState(0);
  const bp = useBreakpoint();
  if (!files?.length) return null;

  const file = files[activeFile];
  const langColors = {
    markdown: T.teal, yaml: T.deepTeal, env: T.green, json: T.orange,
    typescript: T.teal, javascript: T.orange, dockerfile: T.warmOrange, gitignore: T.textMuted,
  };
  const accent = langColors[file.language] || T.textSecondary;

  const handleDownload = (f) => {
    const blob = new Blob([f.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = f.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    files.forEach(f => handleDownload(f));
  };

  return (
    <div style={{
      borderTop: `1px solid ${T.border}`, display: 'flex',
      flexDirection: 'column', height: '100%',
    }}>
      {/* File tabs bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        padding: bp.isMobile ? '0 10px' : '0 16px',
        borderBottom: `1px solid ${T.border}`,
        overflowX: 'auto', overflowY: 'hidden',
        scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
      }}>
        {!bp.isMobile && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px 8px 0',
            borderRight: `1px solid ${T.border}`, marginRight: 4, flexShrink: 0,
          }}>
            <FolderIcon size={13} color={T.deepTeal} />
            <span style={{
              fontFamily: T.fontMono, fontSize: 11, fontWeight: 600,
              color: T.deepTeal, textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              Files
            </span>
          </div>
        )}

        {files.map((f, i) => {
          const isActive = i === activeFile;
          const fc = langColors[f.language] || T.textSecondary;
          return (
            <button
              key={f.filename}
              onClick={() => setActiveFile(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: bp.isMobile ? '8px 10px' : '8px 12px', border: 'none',
                background: isActive ? T.surface : 'transparent',
                borderBottom: isActive ? `2px solid ${fc}` : '2px solid transparent',
                color: isActive ? fc : T.textMuted,
                fontFamily: T.fontMono, fontSize: bp.isMobile ? 10 : 11,
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer', transition: 'all 200ms',
                whiteSpace: 'nowrap', marginBottom: -1, flexShrink: 0,
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = fc; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = T.textMuted; }}
            >
              <FileIcon size={12} color={isActive ? fc : T.textMuted} />
              {f.filename}
            </button>
          );
        })}

        <div style={{ flex: 1 }} />
        <button
          onClick={handleDownloadAll}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 10px', border: `1px solid ${T.border}`, borderRadius: 4,
            background: 'transparent', color: T.textSecondary, cursor: 'pointer',
            fontFamily: T.fontMono, fontSize: 10, fontWeight: 500,
            transition: 'all 200ms',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.green; e.currentTarget.style.color = T.green; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textSecondary; }}
        >
          <DownloadIcon size={11} /> Download All
        </button>
      </div>

      {/* File content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 16px', background: T.surface,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              padding: '2px 6px', borderRadius: 4,
              background: accent + '18', color: accent,
              fontFamily: T.fontMono, fontSize: 10, fontWeight: 600,
              textTransform: 'uppercase',
            }}>
              {file.language}
            </span>
            <span style={{
              fontFamily: T.fontMono, fontSize: 11, color: T.textSecondary,
            }}>
              {file.description}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => handleDownload(file)}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '3px 8px', border: `1px solid ${T.border}`, borderRadius: 4,
                background: 'transparent', color: T.textSecondary, cursor: 'pointer',
                fontFamily: T.fontMono, fontSize: 10, transition: 'all 200ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textSecondary; }}
            >
              <DownloadIcon size={11} /> Save
            </button>
            <CopyButton text={file.content} accent={accent} />
          </div>
        </div>
        <pre style={{
          flex: 1, overflow: 'auto', padding: 16, margin: 0,
          background: T.codeBg, fontFamily: T.fontMono, fontSize: 12,
          color: T.codeText, lineHeight: 1.6, whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {file.content}
        </pre>
      </div>
    </div>
  );
}

// ─── Typewriter Text Component ───────────────────────────────────────────────
function TypewriterText({ text, speed = 15, style = {}, as: Tag = 'span' }) {
  const displayed = useTypewriter(text, speed);
  return <Tag style={style}>{displayed}<span style={{ opacity: displayed.length < (text || '').length ? 1 : 0, transition: 'opacity 300ms' }}>|</span></Tag>;
}

// ─── Skeleton Loader ─────────────────────────────────────────────────────────
function SkeletonBlock({ width = '100%', height = 14, radius = 6, style = {} }) {
  return (
    <div style={{
      width, height, borderRadius: radius,
      background: `linear-gradient(90deg, ${T.surface} 25%, ${T.border} 50%, ${T.surface} 75%)`,
      backgroundSize: '800px 100%',
      animation: 'shimmer 1.5s ease-in-out infinite',
      ...style,
    }} />
  );
}

function SkeletonLoader() {
  return (
    <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 20, overflow: 'hidden' }}>
      {/* Project name */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderBottom: `1px solid ${T.border}`, paddingBottom: 16 }}>
        <SkeletonBlock width="55%" height={24} radius={8} />
        <SkeletonBlock width="80%" height={12} />
        <SkeletonBlock width="65%" height={12} />
        {/* Stat pills row */}
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <SkeletonBlock width={72} height={24} radius={12} />
          <SkeletonBlock width={72} height={24} radius={12} />
          <SkeletonBlock width={80} height={24} radius={12} />
          <SkeletonBlock width={90} height={24} radius={12} />
        </div>
      </div>

      {/* Fake tab bar */}
      <div style={{ display: 'flex', gap: 12, borderBottom: `1px solid ${T.border}`, paddingBottom: 10 }}>
        <SkeletonBlock width={64} height={16} radius={4} />
        <SkeletonBlock width={56} height={16} radius={4} />
        <SkeletonBlock width={48} height={16} radius={4} />
        <SkeletonBlock width={72} height={16} radius={4} />
        <SkeletonBlock width={44} height={16} radius={4} />
      </div>

      {/* Content blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            background: T.surface, borderRadius: 10, border: `1px solid ${T.border}`,
            padding: 16, display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <SkeletonBlock width={28} height={28} radius={8} />
              <SkeletonBlock width="40%" height={16} radius={6} />
            </div>
            <SkeletonBlock width="90%" height={11} />
            <SkeletonBlock width="70%" height={11} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [prd, setPrd] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('phases');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [showInput, setShowInput] = useState(true); // mobile panel toggle
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const abortRef = useRef(null);
  const bp = useBreakpoint();

  const wordCount = prd.trim() ? prd.trim().split(/\s+/).length : 0;
  const charCount = prd.length;

  // ─── File Upload Handlers ─────────────────────────────────────────────
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve({ name: file.name, size: file.size, content: e.target.result });
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleFiles = useCallback(async (fileList) => {
    const allowed = ['.txt', '.md', '.json', '.yaml', '.yml', '.env', '.toml', '.cfg', '.ini', '.xml', '.html', '.css', '.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.rs', '.java', '.prisma', '.sql', '.graphql'];
    const valid = Array.from(fileList).filter(f => {
      const ext = '.' + f.name.split('.').pop().toLowerCase();
      return allowed.includes(ext) || f.type.startsWith('text/');
    });

    if (!valid.length) return;

    const results = await Promise.all(valid.map(readFileContent));
    setUploadedFiles(prev => {
      const existing = new Set(prev.map(f => f.name));
      const newFiles = results.filter(f => !existing.has(f.name));
      return [...prev, ...newFiles];
    });
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e) => { e.preventDefault(); setDragOver(true); }, []);
  const handleDragLeave = useCallback(() => setDragOver(false), []);
  const removeFile = useCallback((name) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== name));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!prd.trim() || loading) return;

    const key = process.env.REACT_APP_ANTHROPIC_API_KEY;
    if (!key) {
      setError('API key not configured. Add REACT_APP_ANTHROPIC_API_KEY to .env.local');
      return;
    }

    // Abort any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    setResult(null);

    // Build user message — include uploaded files as context
    let userMessage = prd;
    if (uploadedFiles.length > 0) {
      const fileContext = uploadedFiles.map(f =>
        `--- FILE: ${f.name} ---\n${f.content}\n--- END FILE ---`
      ).join('\n\n');
      userMessage = `${prd}\n\n=== UPLOADED REFERENCE FILES ===\n${fileContext}`;
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 32768,
          system: SYSTEM_PROMPT,
          messages: [
            { role: 'user', content: userMessage },
          ],
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`API call failed (${response.status}): ${errBody}`);
      }

      const data = await response.json();

      // Check for truncated response
      if (data.stop_reason === 'max_tokens') {
        throw new Error('Response was truncated (output too long). Try simplifying your PRD or breaking it into smaller sections.');
      }

      const text = data.content?.[0]?.text || '';

      // Try to parse JSON — handle markdown wrapping, thinking tags, extra text
      let cleaned = text.trim();
      // Remove <think>...</think> blocks (DeepSeek reasoning)
      cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      // Remove markdown code fences
      cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?\s*```\s*$/, '');
      // If still not starting with {, try to extract JSON object
      if (!cleaned.startsWith('{')) {
        const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
        if (jsonMatch) cleaned = jsonMatch[0];
      }

      const parsed = JSON.parse(cleaned);
      setResult(parsed);
      setActiveTab('phases');
    } catch (err) {
      if (err.name === 'AbortError') return;
      if (err.message.includes('truncated')) {
        setError(err.message);
      } else if (err instanceof SyntaxError) {
        setError('Failed to parse API response as JSON. The model may have returned an incomplete or malformed response. Try again or simplify your PRD.');
      } else if (err.message.includes('API call failed')) {
        setError(err.message);
      } else {
        setError('Request failed. Check your internet connection and API key.');
      }
    } finally {
      setLoading(false);
      if (abortRef.current === controller) abortRef.current = null;
    }
  }, [prd, loading, uploadedFiles]);

  const renderTabContent = () => {
    if (!result) return null;
    switch (activeTab) {
      case 'phases': return <PhasesTab phases={result.phases} />;
      case 'agents': return <AgentsTab agents={result.agents} />;
      case 'skills': return <SkillsTab skills={result.skills} />;
      case 'mcp': return <McpTab mcpServers={result.mcpServers} />;
      case 'docs': return <DocsTab documentationPlan={result.documentationPlan} />;
      case 'flow': return <FlowTab flowDiagram={result.flowDiagram} />;
      default: return null;
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: T.bg, color: T.textPrimary,
      fontFamily: T.fontMono, display: 'flex', flexDirection: 'column',
    }}>
      {/* Subtle scanline overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 4px)',
      }} />

      {/* Ambient background glow */}
      <div style={{
        position: 'fixed', top: '-20%', left: '30%', width: '40%', height: '40%',
        background: `radial-gradient(ellipse, ${T.teal}06 0%, transparent 70%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Header */}
      <header style={{
        padding: bp.isMobile ? '12px 16px' : '14px 28px',
        borderBottom: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: bp.isMobile ? 8 : 12,
        position: 'relative', zIndex: 1,
        background: `linear-gradient(180deg, ${T.bgSubtle} 0%, ${T.bg} 100%)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: bp.isMobile ? 10 : 14 }}>
          {/* Logo mark */}
          <div style={{
            width: bp.isMobile ? 32 : 36, height: bp.isMobile ? 32 : 36,
            borderRadius: T.radius.md,
            background: `linear-gradient(135deg, ${T.teal}20 0%, ${T.deepTeal}10 100%)`,
            border: `1px solid ${T.teal}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width={bp.isMobile ? 16 : 18} height={bp.isMobile ? 16 : 18} viewBox="0 0 24 24" fill="none" stroke={T.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4,17 10,11 4,5" /><line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          <div>
            <h1 style={{
              fontFamily: T.fontDisplay, fontSize: bp.isMobile ? 16 : 19, fontWeight: 800,
              margin: 0, letterSpacing: '-0.03em', color: T.textPrimary,
              lineHeight: 1.2,
            }}>
              Claude <span style={{ color: T.teal }}>Architect</span>
            </h1>
            {!bp.isMobile && (
              <p style={{
                fontFamily: T.fontMono, fontSize: 11, color: T.textMuted,
                margin: 0, letterSpacing: '0.02em',
              }}>
                PRD to CLI Architecture
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Mobile panel toggle */}
          {bp.isMobile && result && (
            <button
              onClick={() => setShowInput(prev => !prev)}
              style={{
                padding: '5px 12px', borderRadius: T.radius.sm,
                border: `1px solid ${T.border}`, background: 'transparent',
                color: T.textSecondary, fontFamily: T.fontMono, fontSize: 11,
                cursor: 'pointer', transition: 'all 200ms',
              }}
            >
              {showInput ? 'View Output' : 'Edit PRD'}
            </button>
          )}
          {/* Version pill */}
          <span style={{
            padding: '3px 10px', borderRadius: 9999,
            background: T.teal + '12', border: `1px solid ${T.teal}25`,
            fontFamily: T.fontMono, fontSize: 10, color: T.teal,
            fontWeight: 500, letterSpacing: '0.03em',
          }}>
            v0.1.0
          </span>
        </div>
      </header>

      {/* Main content — responsive layout */}
      <div style={{
        flex: 1, display: 'flex',
        flexDirection: bp.isDesktop ? 'row' : 'column',
        minHeight: 0, position: 'relative', zIndex: 1,
        overflow: bp.isDesktop ? 'hidden' : 'auto',
      }}>
        {/* LEFT PANEL — PRD Input + File Upload */}
        <div style={{
          ...(bp.isDesktop
            ? { width: '42%', minWidth: 360, borderRight: `1px solid ${T.border}` }
            : { width: '100%', borderBottom: `1px solid ${T.border}` }),
          display: (bp.isMobile && result && !showInput) ? 'none' : 'flex',
          flexDirection: 'column',
          padding: bp.isMobile ? '16px' : bp.isTablet ? '20px 24px' : '24px 28px',
          gap: bp.isMobile ? 14 : 18,
          background: T.bg,
          ...(bp.isDesktop ? {} : { maxHeight: bp.isTablet ? '50vh' : 'none' }),
        }}>
          <div>
            <h2 style={{
              fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 700,
              margin: '0 0 6px 0', color: T.textPrimary, letterSpacing: '-0.02em',
            }}>
              Paste Your PRD
            </h2>
            <p style={{
              fontFamily: T.fontBody, fontSize: 13, color: T.textMuted, margin: 0,
              lineHeight: 1.5,
            }}>
              Describe your project or upload files. The more detail, the better the output.
            </p>
          </div>

          {/* File Upload Zone */}
          <div
            role="button"
            aria-label="Upload files"
            tabIndex={0}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); }}}
            style={{
              border: `1.5px dashed ${dragOver ? T.teal : T.border}`,
              borderRadius: T.radius.lg, padding: '16px 18px', cursor: 'pointer',
              background: dragOver ? T.teal + '08' : T.surface + '60',
              transition: 'all 250ms ease-out', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 8,
              boxShadow: dragOver ? `inset 0 0 30px ${T.teal}08` : 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.background = T.surface; }}
            onMouseLeave={e => { if (!dragOver) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.surface + '60'; } }}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".txt,.md,.json,.yaml,.yml,.env,.toml,.js,.ts,.jsx,.tsx,.py,.go,.rs,.html,.css,.sql,.graphql,.prisma,.xml"
              style={{ display: 'none' }}
              onChange={e => { if (e.target.files.length) handleFiles(e.target.files); e.target.value = ''; }}
            />
            <UploadIcon size={20} color={dragOver ? T.teal : T.textMuted} />
            <span style={{
              fontFamily: T.fontMono, fontSize: 11, color: dragOver ? T.teal : T.textMuted,
              textAlign: 'center',
            }}>
              Drop files here or click to upload
            </span>
            <span style={{
              fontFamily: T.fontMono, fontSize: 10, color: T.textMuted,
              opacity: 0.6,
            }}>
              .md .txt .json .yaml .ts .js .py .sql and more
            </span>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {uploadedFiles.map(f => (
                <span
                  key={f.name}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '4px 8px 4px 10px', borderRadius: 6,
                    background: T.surface, border: `1px solid ${T.border}`,
                    fontFamily: T.fontMono, fontSize: 11, color: T.textSecondary,
                    transition: 'border-color 200ms',
                  }}
                >
                  <FileIcon size={11} color={T.teal} />
                  {f.name}
                  <span style={{
                    fontSize: 9, color: T.textMuted,
                  }}>
                    {(f.size / 1024).toFixed(1)}KB
                  </span>
                  <button
                    aria-label={`Remove ${f.name}`}
                    onClick={(e) => { e.stopPropagation(); removeFile(f.name); }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 16, height: 16, borderRadius: 4, border: 'none',
                      background: 'transparent', cursor: 'pointer', padding: 0,
                      transition: 'background 200ms',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = T.red + '20'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <CloseIcon size={10} color={T.textMuted} />
                  </button>
                </span>
              ))}
            </div>
          )}

          <textarea
            id="prd-input"
            name="prd"
            ref={textareaRef}
            value={prd}
            onChange={e => setPrd(e.target.value)}
            placeholder={PLACEHOLDER_PRD}
            style={{
              flex: 1, resize: 'vertical', background: T.surface,
              border: `1px solid ${T.border}`, borderRadius: T.radius.md,
              padding: bp.isMobile ? 12 : 16, color: T.textPrimary,
              fontFamily: T.fontMono,
              fontSize: bp.isMobile ? 12 : 13, lineHeight: 1.7, outline: 'none',
              transition: 'border-color 250ms ease-out, box-shadow 250ms ease-out',
              minHeight: bp.isMobile ? 180 : 240,
            }}
            onFocus={e => { e.target.style.borderColor = T.teal + '50'; e.target.style.boxShadow = `0 0 0 3px ${T.teal}12`; }}
            onBlur={e => { e.target.style.borderColor = T.border; e.target.style.boxShadow = 'none'; }}
          />

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: bp.isMobile ? 'wrap' : 'nowrap', gap: bp.isMobile ? 10 : 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                fontFamily: T.fontMono, fontSize: 11, color: T.textMuted,
              }}>
                {wordCount} words / {charCount} chars
              </span>
              {uploadedFiles.length > 0 && (
                <span style={{
                  fontFamily: T.fontMono, fontSize: 11, color: T.teal,
                }}>
                  + {uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''}
                </span>
              )}
            </div>

            <button
              onClick={() => { handleGenerate(); if (bp.isMobile) setShowInput(false); }}
              disabled={!prd.trim() || loading}
              style={{
                padding: bp.isMobile ? '12px 20px' : '11px 28px',
                borderRadius: T.radius.md, border: 'none',
                background: (!prd.trim() || loading)
                  ? T.border
                  : `linear-gradient(135deg, ${T.teal} 0%, ${T.deepTeal} 100%)`,
                color: (!prd.trim() || loading) ? T.textMuted : '#fff',
                fontFamily: T.fontMono, fontSize: bp.isMobile ? 12 : 13, fontWeight: 600,
                cursor: (!prd.trim() || loading) ? 'not-allowed' : 'pointer',
                transition: 'all 250ms ease-out', position: 'relative',
                boxShadow: (!prd.trim() || loading)
                  ? 'none'
                  : `0 4px 16px ${T.teal}30, 0 1px 3px rgba(0,0,0,0.3)`,
                animation: loading ? 'glowPulse 2s ease-in-out infinite' : 'none',
                letterSpacing: '0.02em',
                ...(bp.isMobile ? { width: '100%' } : {}),
              }}
              onMouseEnter={e => {
                if (prd.trim() && !loading) {
                  e.target.style.boxShadow = `0 6px 24px ${T.teal}45, 0 2px 6px rgba(0,0,0,0.4)`;
                  e.target.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={e => {
                if (prd.trim() && !loading) {
                  e.target.style.boxShadow = `0 4px 16px ${T.teal}30, 0 1px 3px rgba(0,0,0,0.3)`;
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {loading ? 'Analyzing PRD...' : 'Generate CLI Architecture'}
            </button>
          </div>

          {error && (
            <div style={{
              background: T.red + '0C', border: `1px solid ${T.red}30`,
              borderRadius: T.radius.md, padding: '12px 16px', fontFamily: T.fontMono,
              fontSize: 12, color: T.red, lineHeight: 1.6,
              boxShadow: `0 0 20px ${T.red}08`,
            }}>
              {error}
            </div>
          )}
        </div>

        {/* RIGHT PANEL — Structured Output (top) + Generated Files (bottom) */}
        <div style={{
          flex: 1, display: (bp.isMobile && showInput && result) ? 'none' : 'flex',
          flexDirection: 'column',
          overflow: bp.isDesktop ? 'hidden' : 'auto',
          minHeight: bp.isMobile ? 'calc(100vh - 60px)' : 0,
        }}>
          {loading && !result ? (
            <SkeletonLoader />
          ) : !result ? (
            <div style={{
              flex: 1, display: bp.isMobile ? 'none' : 'flex',
              alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 20,
              padding: bp.isTablet ? 32 : 48,
            }}>
              {/* Animated icon container */}
              <div style={{
                width: bp.isTablet ? 60 : 72, height: bp.isTablet ? 60 : 72,
                borderRadius: T.radius.xl,
                background: `linear-gradient(135deg, ${T.surface} 0%, ${T.surfaceRaised} 100%)`,
                border: `1px solid ${T.border}`, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                animation: 'subtleFloat 4s ease-in-out infinite',
                boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 ${T.borderHover}`,
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={T.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                  <polyline points="4,17 10,11 4,5" /><line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              </div>
              <div style={{ textAlign: 'center', maxWidth: 380 }}>
                <p style={{
                  fontFamily: T.fontBody, fontSize: 15, color: T.textSecondary,
                  lineHeight: 1.6, margin: '0 0 6px 0',
                }}>
                  Paste your PRD and click
                </p>
                <p style={{
                  fontFamily: T.fontMono, fontSize: 13, color: T.teal,
                  margin: 0, fontWeight: 500,
                }}>
                  Generate CLI Architecture
                </p>
              </div>
              <p style={{
                fontFamily: T.fontMono, fontSize: 11, color: T.textMuted,
                textAlign: 'center', lineHeight: 1.5, maxWidth: 320, opacity: 0.7,
              }}>
                Generates phases, agents, skills, MCP servers, flow diagrams, and project files
              </p>
            </div>
          ) : (
            <>
              {/* ── Top Section: Main Tabs ── */}
              <div style={{
                flex: (bp.isDesktop && result.generatedFiles?.length) ? '0 0 55%' : 1,
                display: 'flex', flexDirection: 'column',
                overflow: bp.isDesktop ? 'hidden' : 'visible',
              }}>
                {/* Project Summary Bar */}
                <div style={{
                  padding: bp.isMobile ? '16px' : '20px 28px 16px',
                  borderBottom: `1px solid ${T.border}`,
                  background: `linear-gradient(180deg, ${T.bgSubtle} 0%, transparent 100%)`,
                }}>
                  <TypewriterText
                    text={result.projectName}
                    speed={20}
                    as="h2"
                    style={{
                      fontFamily: T.fontDisplay,
                      fontSize: bp.isMobile ? 18 : bp.isTablet ? 20 : 24,
                      fontWeight: 800,
                      margin: '0 0 6px 0', letterSpacing: '-0.03em', color: T.textPrimary,
                    }}
                  />
                  <TypewriterText
                    text={result.projectSummary}
                    speed={8}
                    as="p"
                    style={{
                      fontFamily: T.fontBody, fontSize: bp.isMobile ? 12 : 13,
                      color: T.textSecondary,
                      margin: '0 0 14px 0', lineHeight: 1.6,
                    }}
                  />
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', animation: 'fadeSlideIn 0.5s ease-out 0.3s both' }}>
                    <StatPill label="Phases" count={result.phases?.length || 0} color={T.teal} />
                    <StatPill label="Agents" count={result.agents?.length || 0} color={T.orange} />
                    <StatPill label="Skills" count={result.skills?.length || 0} color={T.green} />
                    <StatPill label="MCP Servers" count={result.mcpServers?.length || 0} color={T.deepTeal} />
                    {result.flowDiagram && (
                      <StatPill label="Flow" count={1} color={T.lightCyan} />
                    )}
                    {result.generatedFiles?.length > 0 && (
                      <StatPill label="Files" count={result.generatedFiles.length} color={T.deepTeal} />
                    )}
                  </div>
                </div>

                {/* Tab Bar — horizontally scrollable on mobile */}
                <div style={{
                  display: 'flex',
                  padding: bp.isMobile ? '4px 12px 0' : '6px 24px 0',
                  borderBottom: `1px solid ${T.border}`,
                  gap: 2, background: T.bg,
                  overflowX: 'auto', overflowY: 'hidden',
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}>
                  {TAB_CONFIG.map(tab => {
                    const isActive = activeTab === tab.key;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: bp.isMobile ? 4 : 6,
                          padding: bp.isMobile ? '8px 10px' : '9px 16px',
                          border: 'none', whiteSpace: 'nowrap', flexShrink: 0,
                          background: isActive ? T.surface : 'transparent',
                          color: isActive ? tab.accent : T.textMuted,
                          fontFamily: T.fontMono,
                          fontSize: bp.isMobile ? 11 : 12,
                          fontWeight: isActive ? 600 : 400,
                          cursor: 'pointer',
                          borderBottom: isActive ? `2px solid ${tab.accent}` : '2px solid transparent',
                          borderRadius: `${T.radius.sm}px ${T.radius.sm}px 0 0`,
                          transition: 'all 200ms ease-out', marginBottom: -1,
                        }}
                        onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = tab.accent; e.currentTarget.style.background = T.surface + '60'; } }}
                        onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = T.textMuted; e.currentTarget.style.background = 'transparent'; } }}
                      >
                        <Icon size={bp.isMobile ? 12 : 14} color={isActive ? tab.accent : T.textMuted} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div style={{
                  flex: 1, overflow: 'auto',
                  padding: bp.isMobile ? '16px' : '20px 24px',
                }}>
                  {renderTabContent()}
                </div>
              </div>

              {/* ── Bottom Section: Generated Files ── */}
              {result.generatedFiles?.length > 0 && (
                <div style={{
                  flex: bp.isDesktop ? '0 0 45%' : 'none',
                  display: 'flex', flexDirection: 'column',
                  overflow: bp.isDesktop ? 'hidden' : 'visible',
                  ...(bp.isMobile ? { minHeight: 300 } : {}),
                }}>
                  <GeneratedFilesPanel files={result.generatedFiles} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* CSS Keyframes injected via style tag */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${T.bg}; overflow-x: hidden; }
        ::selection { background: ${T.teal}40; color: ${T.textPrimary}; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${T.borderHover}; }
        textarea::placeholder { color: ${T.textMuted}; }
        input::placeholder { color: ${T.textMuted}; }

        /* Hide scrollbar on tab bars */
        .tab-scroll::-webkit-scrollbar { display: none; }

        /* Focus-visible for keyboard nav */
        *:focus-visible {
          outline: 2px solid ${T.teal};
          outline-offset: 2px;
        }
        button:focus:not(:focus-visible) { outline: none; }

        /* Touch-friendly targets on mobile */
        @media (max-width: 767px) {
          button { min-height: 44px; }
          textarea { font-size: 16px !important; /* prevent iOS zoom */ }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0,188,212,0.2), 0 0 40px rgba(0,188,212,0.05); }
          50% { box-shadow: 0 0 30px rgba(0,188,212,0.35), 0 0 60px rgba(0,188,212,0.1); }
        }
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
