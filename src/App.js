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
  // Backgrounds
  bg: '#08080D',
  bgDeep: '#050508',
  bgSubtle: '#0A0A10',
  bgSecondary: '#0F0F16',
  surface: '#16161E',
  surfaceRaised: '#1C1C26',
  // Borders
  border: '#1A1A1F',
  borderHover: '#2A2A35',
  borderActive: '#3A3A45',
  // Text
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#4A5568',
  // Accents
  teal: '#00BCD4',
  orange: '#F5A623',
  green: '#10B981',
  deepTeal: '#0097A7',
  warmOrange: '#E8873A',
  red: '#EF4444',
  lightCyan: '#22D3EE',
  cyan: '#22D3EE',
  // Code
  codeText: '#7DD3FC',
  codeBg: '#030306',
  // Fonts
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'Plus Jakarta Sans', sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
  // Structural — BRUTALIST
  borderWidth: '2px',
  hardShadow: (color) => `4px 4px 0px 0px ${color || '#000'}`,
  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  radius: { sm: 2, md: 4, lg: 4, xl: 4 },
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
        padding: '4px 10px',
        border: `${T.borderWidth} solid ${copied ? T.green : T.border}`,
        borderRadius: T.radius.sm,
        background: copied ? T.green + '18' : 'transparent',
        color: copied ? T.green : T.textSecondary, cursor: 'pointer',
        fontFamily: T.fontMono, fontSize: 11, fontWeight: 600,
        transition: T.transition,
        boxShadow: copied ? T.hardShadow(T.green) : 'none',
      }}
      onMouseEnter={e => { if (!copied) { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; e.currentTarget.style.boxShadow = T.hardShadow(accent); }}}
      onMouseLeave={e => { if (!copied) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textSecondary; e.currentTarget.style.boxShadow = 'none'; }}}
    >
      {copied ? <><CheckIcon /> COPIED</> : <><CopyIcon /> COPY</>}
    </button>
  );
}

// ─── Code Block Component ───────────────────────────────────────────────────
function CodeBlock({ command, accent = T.teal }) {
  const lines = (command || '').split('\n');
  return (
    <div style={{
      background: T.codeBg, border: `${T.borderWidth} solid ${T.border}`,
      borderRadius: T.radius.sm,
      marginTop: 10, display: 'flex',
      alignItems: 'stretch', justifyContent: 'space-between', gap: 0,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Hard accent left bar */}
      <div style={{
        width: 3, flexShrink: 0, background: accent,
      }} />
      {/* Line numbers */}
      <div style={{
        padding: '10px 8px', borderRight: `1px solid ${T.border}20`,
        display: 'flex', flexDirection: 'column', gap: 0, userSelect: 'none',
        flexShrink: 0,
      }}>
        {lines.map((_, i) => (
          <span key={i} style={{
            fontFamily: T.fontMono, fontSize: 10, color: T.teal + '50',
            lineHeight: 1.6, display: 'block', textAlign: 'right', minWidth: 16,
          }}>{i + 1}</span>
        ))}
      </div>
      <code style={{
        fontFamily: T.fontMono, fontSize: 12, color: T.codeText,
        lineHeight: 1.6, wordBreak: 'break-all', flex: 1, whiteSpace: 'pre-wrap',
        padding: '10px 12px',
      }}>
        {command}
      </code>
      <div style={{ padding: '8px 8px 0 0', flexShrink: 0 }}>
        <CopyButton text={command} accent={accent} />
      </div>
    </div>
  );
}

// ─── SDLC Badge ─────────────────────────────────────────────────────────────
function SdlcBadge({ stage }) {
  const color = SDLC_COLORS[stage] || T.textMuted;
  return (
    <span style={{
      display: 'inline-block', padding: '1px 6px', borderRadius: T.radius.sm,
      background: color + '14', color, fontSize: 9, fontWeight: 700,
      border: `1px solid ${color}40`,
      fontFamily: T.fontMono, textTransform: 'uppercase', letterSpacing: '0.08em',
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
      padding: '4px 10px', borderRadius: T.radius.sm, background: color + '10',
      border: `${T.borderWidth} solid ${color}40`, fontFamily: T.fontMono, fontSize: 11,
      transition: T.transition,
    }}>
      <span style={{ color, fontWeight: 700, fontSize: 13 }}>{count}</span>
      <span style={{ color: T.textSecondary, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
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
              width: bp.isMobile ? 34 : 38, height: bp.isMobile ? 34 : 38,
              borderRadius: T.radius.sm,
              border: i === activePhase ? `${T.borderWidth} solid ${T.teal}` : `${T.borderWidth} solid ${T.border}`,
              flexShrink: 0,
              background: i === activePhase ? T.teal + '18' : 'transparent',
              color: i === activePhase ? T.teal : T.textMuted,
              fontFamily: T.fontMono, fontSize: bp.isMobile ? 12 : 13, fontWeight: 700,
              cursor: 'pointer', transition: T.transition,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', zIndex: 1,
            }}
            onMouseEnter={e => { if (i !== activePhase) { e.currentTarget.style.color = T.teal; e.currentTarget.style.background = T.teal + '10'; e.currentTarget.style.borderColor = T.teal + '50'; } }}
            onMouseLeave={e => { if (i !== activePhase) { e.currentTarget.style.color = T.textMuted; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = T.border; } }}
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
              background: T.bgSecondary,
              border: `${T.borderWidth} solid ${T.border}`,
              borderLeft: `4px solid ${T.teal}`,
              borderRadius: T.radius.md, padding: 16, paddingLeft: 20,
              transition: T.transition,
              animation: `kernelFadeIn 0.3s ease-out ${idx * 0.06}s both`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = T.hardShadow(T.teal); }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = 'none'; }}
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
          background: T.bgSecondary,
          border: `${T.borderWidth} solid ${T.border}`,
          borderLeft: `4px solid ${T.orange}`,
          borderRadius: T.radius.md,
          padding: 18, paddingLeft: 20, transition: T.transition,
          animation: `kernelFadeIn 0.3s ease-out ${i * 0.06}s both`,
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = T.hardShadow(T.orange); }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = 'none'; }}
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
        background: T.green + '10', border: `${T.borderWidth} solid ${T.green}`,
        borderRadius: T.radius.sm, padding: '8px 12px', fontFamily: T.fontMono,
        fontSize: 11, color: T.green, display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <SkillIcon size={14} color={T.green} />
        Skills sourced from skills.sh — visit for the full catalog
      </div>

      {skills.map((skill, i) => (
        <div key={i} style={{
          background: T.bgSecondary,
          border: `${T.borderWidth} solid ${T.border}`,
          borderLeft: `4px solid ${T.green}`,
          borderRadius: T.radius.md,
          padding: 18, paddingLeft: 20, transition: T.transition,
          animation: `kernelFadeIn 0.3s ease-out ${i * 0.06}s both`,
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = T.hardShadow(T.green); }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = 'none'; }}
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
          background: T.bgSecondary,
          border: `${T.borderWidth} solid ${T.border}`,
          borderLeft: `4px solid ${T.deepTeal}`,
          borderRadius: T.radius.md,
          padding: 18, paddingLeft: 20, transition: T.transition,
          animation: `kernelFadeIn 0.3s ease-out ${i * 0.06}s both`,
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = T.hardShadow(T.deepTeal); }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = 'none'; }}
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
        background: T.bgSecondary,
        border: `${T.borderWidth} solid ${T.warmOrange}`,
        borderRadius: T.radius.sm,
        padding: 20,
        boxShadow: T.hardShadow(T.warmOrange + '60'),
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
                  display: 'inline-block', padding: '3px 8px', borderRadius: T.radius.sm,
                  background: T.warmOrange + '14', border: `${T.borderWidth} solid ${T.warmOrange}40`,
                  fontFamily: T.fontMono, fontSize: 11, color: T.warmOrange,
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
        primaryColor: '#F5A623',
        primaryTextColor: '#050508',
        primaryBorderColor: '#22D3EE',
        lineColor: '#22D3EE',
        secondaryColor: '#16161E',
        tertiaryColor: '#0F0F16',
        background: '#050508',
        mainBkg: '#F5A623',
        nodeBorder: '#22D3EE',
        clusterBkg: '#0A0A10',
        clusterBorder: '#1A1A1F',
        titleColor: '#22D3EE',
        edgeLabelBackground: '#050508',
        nodeTextColor: '#050508',
        fontFamily: "'IBM Plex Mono', monospace",
      },
      flowchart: { curve: 'linear', padding: 12 },
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
const KERNEL_LOGS = [
  '[SYS] Booting Archon kernel...',
  '[PRD] Parsing requirements document...',
  '[AI]  Consulting claude-sonnet-4-5...',
  '[MAP] Mapping SDLC phase structure...',
  '[AGT] Generating agent definitions...',
  '[SKL] Resolving skills.sh catalog...',
  '[MCP] Configuring MCP server list...',
  '[DOC] Scaffolding documentation agent...',
  '[FLW] Rendering Mermaid flow diagram...',
  '[GEN] Writing project files...',
  '[SYS] Architecture blueprint ready.',
];

function KernelLogLoader() {
  const [visibleLines, setVisibleLines] = useState(1);
  useEffect(() => {
    const id = setInterval(() => {
      setVisibleLines(v => v < KERNEL_LOGS.length ? v + 1 : v);
    }, 420);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      flex: 1, padding: 28, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', gap: 0, overflow: 'hidden',
    }}>
      <div style={{
        border: `${T.borderWidth} solid ${T.teal}40`,
        borderRadius: T.radius.md,
        padding: 20, background: T.bgDeep,
        maxWidth: 480,
      }}>
        <div style={{
          fontFamily: T.fontMono, fontSize: 10, color: T.teal,
          letterSpacing: '0.1em', marginBottom: 14, textTransform: 'uppercase',
        }}>
          {'// ARCHON KERNEL — PROCESSING'}
        </div>
        {KERNEL_LOGS.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{
            fontFamily: T.fontMono, fontSize: 12, lineHeight: 2,
            color: i === visibleLines - 1 ? T.teal : T.textMuted,
            animation: 'kernelFadeIn 0.2s ease-out both',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            {i === visibleLines - 1 && (
              <span style={{ color: T.teal, animation: 'cursorBlink 0.8s step-end infinite' }}>▋</span>
            )}
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Mobile FAB ─────────────────────────────────────────────────────────────
function MobileFAB({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed', bottom: 20, right: 20,
        width: 44, height: 44, borderRadius: T.radius.sm,
        background: T.teal, color: T.bgDeep,
        border: `${T.borderWidth} solid ${T.teal}`,
        boxShadow: T.hardShadow(T.teal),
        fontFamily: T.fontMono, fontSize: 18, fontWeight: 700,
        cursor: 'pointer', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: T.transition,
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = T.hardShadow(T.deepTeal); }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = T.hardShadow(T.teal); }}
    >
      {label}
    </button>
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
      minHeight: (bp.isDesktop || result) ? '100vh' : 'auto', background: T.bg, color: T.textPrimary,
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
        padding: bp.isMobile ? '10px 16px' : '11px 24px',
        borderBottom: `${T.borderWidth} solid ${T.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'nowrap', gap: bp.isMobile ? 8 : 12,
        position: 'relative', zIndex: 1,
        background: T.bgDeep,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: bp.isMobile ? 10 : 14 }}>
          {/* Logo mark — solid teal square */}
          <div style={{
            width: bp.isMobile ? 30 : 34, height: bp.isMobile ? 30 : 34,
            borderRadius: T.radius.sm,
            background: T.teal,
            border: `${T.borderWidth} solid ${T.teal}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: T.hardShadow(T.teal + '80'),
          }}>
            <svg width={bp.isMobile ? 14 : 16} height={bp.isMobile ? 14 : 16} viewBox="0 0 24 24" fill="none" stroke={T.bgDeep} strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
              <polyline points="4,17 10,11 4,5" /><line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          <div>
            <h1 style={{
              fontFamily: T.fontDisplay, fontSize: bp.isMobile ? 13 : 17, fontWeight: 800,
              margin: 0, letterSpacing: '0.06em', color: T.textPrimary,
              lineHeight: 1.1, textTransform: 'uppercase', whiteSpace: 'nowrap',
            }}>
              ARCHON <span style={{ color: T.teal, fontWeight: 400, letterSpacing: '0.04em' }}>{bp.isMobile ? '// ARCHITECT' : '// PROJECT ARCHITECT'}</span>
            </h1>
            {!bp.isMobile && (
              <p style={{
                fontFamily: T.fontMono, fontSize: 10, color: T.textMuted,
                margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                PRD → CLI ARCHITECTURE GENERATOR
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Version badge — sharp, not pill */}
          <span style={{
            padding: bp.isMobile ? '2px 6px' : '3px 8px',
            borderRadius: T.radius.sm,
            background: 'transparent',
            border: `${T.borderWidth} solid ${T.teal}50`,
            fontFamily: T.fontMono, fontSize: bp.isMobile ? 9 : 10, color: T.teal,
            fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            v0.1.0-STABLE
          </span>
        </div>
      </header>

      {/* Main content — responsive layout */}
      <div style={{
        flex: (bp.isDesktop || result) ? 1 : 'none', display: 'flex',
        flexDirection: bp.isDesktop ? 'row' : 'column',
        minHeight: 0, position: 'relative', zIndex: 1,
        overflow: bp.isDesktop ? 'hidden' : 'auto',
      }}>
        {/* LEFT PANEL — PRD Input + File Upload */}
        <div style={{
          ...(bp.isDesktop
            ? { width: '42%', minWidth: 360, borderRight: `${T.borderWidth} solid ${T.border}`, animation: loading ? 'dividerPulse 1.5s ease-in-out infinite' : 'none' }
            : { width: '100%', borderBottom: `${T.borderWidth} solid ${T.border}` }),
          display: (bp.isMobile && result && !showInput) ? 'none' : 'flex',
          flexDirection: 'column',
          padding: bp.isMobile ? '14px' : bp.isTablet ? '18px 22px' : '20px 24px',
          gap: bp.isMobile ? 12 : 16,
          background: T.bgDeep,
          ...(bp.isDesktop ? {} : {}),
        }}>
          <div>
            <h2 style={{
              fontFamily: T.fontMono, fontSize: 11, fontWeight: 700,
              margin: '0 0 4px 0', color: T.teal, letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {'// INPUT.PRD'}
            </h2>
            <p style={{
              fontFamily: T.fontMono, fontSize: 11, color: T.textMuted, margin: 0,
              lineHeight: 1.5, letterSpacing: '0.02em',
            }}>
              Describe your project — more detail = better output.
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
              border: `2px dashed ${dragOver ? T.teal : T.border}`,
              borderRadius: T.radius.sm, padding: '14px 16px', cursor: 'pointer',
              background: dragOver ? T.teal + '08' : T.bgSecondary,
              transition: T.transition, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 6,
              boxShadow: dragOver ? T.hardShadow(T.teal) : 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.teal + '80'; e.currentTarget.style.background = T.surface; }}
            onMouseLeave={e => { if (!dragOver) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.bgSecondary; } }}
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
              flex: 1, resize: 'vertical', background: T.bgDeep,
              border: `${T.borderWidth} solid ${T.teal}`,
              borderRadius: T.radius.sm,
              padding: bp.isMobile ? 12 : 16, color: T.textPrimary,
              fontFamily: T.fontMono,
              fontSize: bp.isMobile ? 12 : 13, lineHeight: 1.7, outline: 'none',
              transition: T.transition,
              minHeight: bp.isMobile ? 'calc(100dvh - 320px)' : bp.isTablet ? 'calc(100vh - 360px)' : 240,
              backgroundImage: `radial-gradient(circle, ${T.teal}10 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
            onFocus={e => { e.target.style.boxShadow = `0 0 0 2px ${T.teal}40`; }}
            onBlur={e => { e.target.style.boxShadow = 'none'; }}
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
              disabled={(!prd.trim() && uploadedFiles.length === 0) || loading}
              style={{
                padding: bp.isMobile ? '11px 20px' : '10px 22px',
                borderRadius: T.radius.sm,
                border: `${T.borderWidth} solid ${(!prd.trim() || loading) ? T.border : T.teal}`,
                background: (!prd.trim() || loading) ? T.surface : T.teal,
                color: (!prd.trim() || loading) ? T.textMuted : T.bgDeep,
                fontFamily: T.fontMono, fontSize: 12, fontWeight: 700,
                cursor: (!prd.trim() || loading) ? 'not-allowed' : 'pointer',
                transition: T.transition,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                boxShadow: (!prd.trim() || loading) ? 'none' : T.hardShadow(T.deepTeal),
                ...(bp.isMobile ? { width: '100%' } : {}),
              }}
              onMouseEnter={e => {
                if (prd.trim() && !loading) {
                  e.currentTarget.style.transform = 'translate(-2px,-2px)';
                  e.currentTarget.style.boxShadow = T.hardShadow(T.teal);
                }
              }}
              onMouseLeave={e => {
                if (prd.trim() && !loading) {
                  e.currentTarget.style.transform = 'translate(0,0)';
                  e.currentTarget.style.boxShadow = T.hardShadow(T.deepTeal);
                }
              }}
            >
              {loading ? '// PROCESSING...' : '> GENERATE ARCHITECTURE'}
            </button>
          </div>

          {error && (
            <div style={{
              background: T.bgDeep, border: `${T.borderWidth} solid ${T.red}`,
              borderRadius: T.radius.sm, padding: '10px 14px', fontFamily: T.fontMono,
              fontSize: 11, color: T.red, lineHeight: 1.6,
              boxShadow: T.hardShadow(T.red + '80'),
            }}>
              [ERR] {error}
            </div>
          )}
        </div>

        {/* RIGHT PANEL — Structured Output (top) + Generated Files (bottom) */}
        <div style={{
          flex: 1, display: (!bp.isDesktop && !result) ? 'none' : (bp.isMobile && showInput && result) ? 'none' : 'flex',
          flexDirection: 'column',
          overflow: bp.isDesktop ? 'hidden' : 'auto',
          minHeight: bp.isMobile ? 'calc(100vh - 60px)' : 0,
        }}>
          {loading && !result ? (
            <KernelLogLoader />
          ) : !result ? (
            <div style={{
              flex: 1, display: bp.isDesktop ? 'flex' : 'none',
              alignItems: 'center', justifyContent: 'center',
              padding: bp.isTablet ? 32 : 48,
            }}>
              <div style={{
                background: T.bgSecondary,
                border: `${T.borderWidth} solid ${T.teal}40`,
                borderRadius: T.radius.sm,
                padding: bp.isTablet ? '24px 28px' : '28px 36px',
                textAlign: 'center', maxWidth: 340,
              }}>
                <div style={{
                  fontFamily: T.fontMono, fontSize: 36, color: T.teal,
                  marginBottom: 16, letterSpacing: '0.05em', fontWeight: 800,
                }}>
                  &gt;_
                </div>
                <div style={{
                  fontFamily: T.fontMono, fontSize: 10, color: T.textMuted,
                  marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  AWAITING INPUT
                </div>
                <div style={{
                  fontFamily: T.fontMono, fontSize: 12, color: T.teal,
                  marginBottom: 16, letterSpacing: '0.02em',
                }}>
                  Paste PRD → Generate Architecture
                </div>
                <div style={{
                  paddingTop: 14, borderTop: `1px solid ${T.border}`,
                  fontFamily: T.fontMono, fontSize: 10, color: T.textMuted,
                  lineHeight: 1.9, letterSpacing: '0.03em',
                }}>
                  phases · agents · skills<br />mcp · flow · files
                </div>
              </div>
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
                          display: 'flex', alignItems: 'center', gap: bp.isMobile ? 4 : 5,
                          padding: bp.isMobile ? '7px 10px' : '8px 14px',
                          whiteSpace: 'nowrap', flexShrink: 0,
                          background: isActive ? tab.accent + '18' : 'transparent',
                          color: isActive ? tab.accent : T.textMuted,
                          fontFamily: T.fontMono,
                          fontSize: bp.isMobile ? 10 : 11,
                          fontWeight: 700,
                          cursor: 'pointer',
                          border: isActive ? `${T.borderWidth} solid ${tab.accent}` : `${T.borderWidth} solid transparent`,
                          borderBottom: isActive ? `${T.borderWidth} solid ${T.bg}` : `${T.borderWidth} solid transparent`,
                          borderRadius: `${T.radius.sm}px ${T.radius.sm}px 0 0`,
                          transition: T.transition, marginBottom: -2,
                          textTransform: 'uppercase', letterSpacing: '0.05em',
                        }}
                        onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = tab.accent; e.currentTarget.style.background = tab.accent + '10'; e.currentTarget.style.borderColor = tab.accent + '40'; } }}
                        onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = T.textMuted; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; } }}
                      >
                        <Icon size={bp.isMobile ? 11 : 12} color={isActive ? tab.accent : T.textMuted} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div key={activeTab} style={{
                  flex: 1, overflow: 'auto',
                  padding: bp.isMobile ? '14px' : '18px 22px',
                  animation: 'tabSlideIn 0.15s ease-out both',
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

      {/* Mobile FAB */}
      {bp.isMobile && result && (
        <MobileFAB
          label={showInput ? '>' : '<'}
          onClick={() => setShowInput(prev => !prev)}
        />
      )}

      {/* CSS Keyframes injected via style tag */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${T.bgDeep}; overflow-x: hidden; animation: powerOn 0.5s ease-out both; }

        /* CRT Power-On Effect */
        @keyframes powerOn {
          0%   { opacity: 0.1; transform: scale(0.98); filter: brightness(0.2); }
          35%  { opacity: 1;   filter: brightness(1.5); }
          55%  { opacity: 0.7; filter: brightness(0.8); }
          75%  { opacity: 1;   filter: brightness(1.1); }
          100% { opacity: 1;   transform: scale(1); filter: brightness(1); }
        }

        /* Moving scanline */
        body::before {
          content: '';
          position: fixed; left: 0; right: 0; height: 2px; top: 0;
          background: rgba(0, 188, 212, 0.05);
          animation: scanline 8s linear infinite;
          pointer-events: none; z-index: 9999;
        }

        /* Static CRT scanline overlay */
        body::after {
          content: '';
          position: fixed; inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px
          );
          pointer-events: none; z-index: 9998;
        }

        ::selection { background: ${T.teal}50; color: ${T.bgDeep}; }

        /* 4px teal scrollbars */
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.teal}60; border-radius: 0; }
        ::-webkit-scrollbar-thumb:hover { background: ${T.teal}; }
        * { scrollbar-width: thin; scrollbar-color: ${T.teal}60 transparent; }

        textarea::placeholder { color: ${T.textMuted}; opacity: 0.3; font-family: 'IBM Plex Mono', monospace; }
        input::placeholder { color: ${T.textMuted}; opacity: 0.3; }

        *:focus-visible { outline: 2px solid ${T.teal}; outline-offset: 2px; }
        button:focus:not(:focus-visible) { outline: none; }

        @media (max-width: 767px) {
          button { min-height: 40px; }
          textarea { font-size: 16px !important; }
        }

        @keyframes scanline {
          0%   { top: -2px; }
          100% { top: 100vh; }
        }
        @keyframes kernelFadeIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tabSlideIn {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes dividerPulse {
          0%, 100% { border-color: ${T.border}; }
          50%      { border-color: ${T.teal}; box-shadow: 0 0 12px ${T.teal}40; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

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
