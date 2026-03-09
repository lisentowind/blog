# Personal Blog Tech Redesign

## Role Status

- Active designer role: `pencil-designer`
- Installed role files: `.agents/teams/pencil-designer/system.md`, `.agents/teams/pencil-designer/SKILL.md`, `.agents/teams/pencil-designer/references/role.yaml`
- Current repo visual baseline: cyber glass panels, cyan + neon green accents, Orbitron / Space Grotesk / JetBrains Mono typography, layered grid and circuit backgrounds

## Design Direction

This redesign keeps the project's existing cyber-glass DNA, but upgrades the blog page from a simple list into a "signal archive" experience.

Core concept: the blog should feel like a personal command center for ideas, not a plain article index.

Keywords:

- signal archive
- orbital dashboard
- holographic panels
- engineered typography
- content-first technology aesthetic

## Design Goals

1. Make the blog page feel like a flagship content destination instead of a secondary listing page.
2. Keep the current project's tech atmosphere, but add stronger hierarchy, asymmetry, and editorial rhythm.
3. Help readers scan quickly: featured story, topics, reading paths, and article cards should all have different visual weights.
4. Give the frontend developer clear UI structure, tokens, and behavior rules for implementation.

## Visual System

### Tone

- Primary mood: deep-space control room
- Emotional read: calm, precise, advanced, personal
- Avoid: overly noisy sci-fi decoration, game HUD overload, purple-heavy neon cliches

### Color Tokens

```css
:root {
  --blog-shell: #030914;
  --blog-shell-2: #07111f;
  --blog-panel: rgba(7, 18, 34, 0.78);
  --blog-panel-strong: rgba(10, 24, 44, 0.92);
  --blog-line: rgba(120, 232, 255, 0.18);
  --blog-line-strong: rgba(120, 232, 255, 0.42);
  --blog-text: #e8f7ff;
  --blog-muted: #87a6bb;
  --blog-accent: #78f4ff;
  --blog-accent-2: #4dffb8;
  --blog-accent-3: #ffd166;
  --blog-danger: #ff6b88;
  --blog-glow: 0 0 24px rgba(120, 244, 255, 0.28);
  --blog-shadow: 0 24px 60px rgba(2, 8, 20, 0.42);
}
```

### Typography

- Hero and major numeric data: `Orbitron`
- Body and card copy: `Space Grotesk`
- Labels, tags, meta, controls: `JetBrains Mono`
- Headline style should feel engineered, not decorative

### Surface Language

- Use layered transparent panels instead of flat cards
- Add subtle clipped corners or corner brackets on large modules
- Keep borders thin and luminous; glow should appear at edges, not flood the whole card
- Use 1-2 meaningful ambient light zones behind hero and reading grid

## Page Architecture

The page should be redesigned as 6 stacked zones.

### 1. Hero: Signal Deck

Purpose: immediately communicate that this is an active technical writing hub.

Structure:

- Left 7 columns: title, description, CTA pair
- Right 5 columns: live status panel with content metrics

Content:

- Eyebrow: `Blog Signal / Technical Archive`
- Main title: `构建中的思想，发布中的系统。`
- Supporting copy: emphasize engineering notes, UI experiments, and architecture thinking
- CTA 1: `进入最新文章`
- CTA 2: `浏览专题路径`

Right-side status module blocks:

- `Archive Count` - total post count
- `Primary Topics` - top 3 tags
- `Reading Tempo` - average reading time
- `Last Sync` - latest publish date

Visual notes:

- Add a radial glow behind the title block
- Add a thin horizontal scanning beam crossing the hero panel every 8-10 seconds
- Status module should feel like a telemetry stack, with small separators and mono labels

### 2. Featured Story: Main Transmission

Purpose: turn the featured article into a premium editorial centerpiece.

Structure:

- Full-width horizontal panel
- Left: tag, title, headline, summary
- Right: metadata, reading time, CTA, and a compact progress ring or numeric badge

Visual notes:

- Add a top-right holographic badge: `PRIORITY 01`
- Use a brighter edge highlight than normal cards
- Add a faint grid map or waveform texture inside the background

Behavior:

- Hover should slightly elevate the panel and intensify the border beam
- CTA stays obvious but does not overpower the title

### 3. Topic Filter Bar: Frequency Router

Purpose: make filtering feel like switching channels.

Structure:

- Left: pill filters for tags
- Center/right: large search field
- Optional small count text: `Showing 03 transmissions`

Visual notes:

- Active chip uses filled accent background plus subtle glow
- Inactive chips keep transparent background with thin luminous outline
- Search field should look like a command input, with mono placeholder and left icon slot

### 4. Reading Paths: Curated Navigation Grid

Purpose: add more personality than a simple list by giving readers multiple ways to enter content.

This section sits above the article grid and uses 3 cards.

- `Latest Signals` - newest writing
- `UI / System Thinking` - posts tagged around UI and component design
- `Build Logs` - engineering and process notes

Each path card contains:

- small mono label
- 1-line summary
- article count
- direct CTA

Visual notes:

- Cards are unequal heights for a more editorial layout
- Each card gets a different accent strip: cyan, green, amber

### 5. Article Matrix: Archive Grid

Purpose: present all posts with stronger visual hierarchy and scan speed.

Desktop layout:

- 2-column grid
- Every card min height around 280px
- Every second card can use a slightly shifted top border treatment to avoid repetition

Card anatomy:

- top row: tag + date
- title
- headline
- summary
- bottom row: read time + arrow CTA

Visual details:

- Add a low-opacity index number in the background, like `01`, `02`, `03`
- Add a thin gradient accent bar on top edge
- Summary text stays subdued so title remains the anchor

Empty state:

- Full-width status card
- Copy direction: `当前频段没有匹配内容，请切换标签或重置检索。`
- Include one clear reset action

### 6. Final CTA: Open Channel

Purpose: end the page with a human, personal invitation.

Content:

- title: `想继续追踪我的实验与写作信号？`
- short copy: guide users to Lab / About or GitHub
- dual CTA: `前往 Lab` and `返回 About`

Visual notes:

- This module should feel warmer and more personal than the rest of the page
- Add a faint green-to-cyan ambient blur behind it to soften the ending

## Layout Grid

### Desktop

- Container max width: `1120px` to `1200px`
- Use a 12-column layout language
- Vertical spacing rhythm: `18 / 24 / 32 / 48px`
- Section order:

1. Signal Deck
2. Main Transmission
3. Frequency Router
4. Reading Paths
5. Archive Grid
6. Open Channel

### Tablet

- Hero becomes stacked
- Featured story keeps two areas but compresses metadata below copy if needed
- Reading path cards become 2 columns, then 1 column when width tightens

### Mobile

- All sections become single column
- Hero status module becomes 2x2 stat grid
- Search field spans full width
- Article cards keep strong padding and readable line length
- Motion should reduce to opacity + small translate only

## Component Notes For Frontend Handoff

### Hero Panel

- Large padding: `28-36px`
- Title max width: around `10-12` words per line on desktop
- CTA buttons should not exceed 2 items in first row

### Status Tiles

- 2x2 mini-grid inside hero
- Each tile has label, value, and optional tiny trend marker
- Value line uses `Orbitron`

### Featured Card

- Border radius: `22px`
- Use one premium state distinct from normal cards
- Add internal dividing line between content and meta on desktop

### Filter Chips

- Height: `36px`
- Horizontal padding: `12-14px`
- Mono uppercase text
- Include active, hover, and focus-visible states

### Search Input

- Height: `46-50px`
- Rounded rectangle, not pill
- Border stronger than surrounding chips
- Focus ring should be visible in both dark and light themes

### Post Cards

- Padding: `22-24px`
- Card hover: lift `4-6px`, border brightens, accent strip intensifies
- CTA arrow can animate a small `translateX`

## Motion Strategy

- Page load: staggered reveal from top to bottom, `60-90ms` intervals
- Hero scan line: very subtle, long-duration animation
- Card hover: transform + border glow only
- Avoid busy repeated looping animations on every card
- Respect reduced-motion preference

## Accessibility Rules

- Ensure text contrast stays WCAG AA against panel backgrounds
- Do not encode meaning by color alone; keep labels and counts visible
- Search and filter controls require strong keyboard focus states
- Maintain minimum target size around `40px`
- Decorative scan lines and glows must not block readability

## Copy Tone

- Technical but not cold
- Personal but not overly casual
- Feels like a builder documenting systems, experiments, and decisions

## Recommended Section Copy Draft

### Hero

- Eyebrow: `Blog Signal / Technical Archive`
- Title: `构建中的思想，发布中的系统。`
- Description: `这里收录我对工程化、UI 组件、交互实验与产品细节的长期记录，让博客像持续运行的技术工作台，而不是一次性展示页。`

### Reading Paths

- `Latest Signals`: 最近更新的文章与阶段性复盘
- `UI / System Thinking`: 组件语言、界面结构与设计工程笔记
- `Build Logs`: 工程实践、内容架构与项目迭代日志

### Final CTA

- Title: `想继续追踪我的实验与写作信号？`
- Description: `如果你想看半成品实验、项目故事或更完整的个人资料，可以继续进入 Lab 与 About。`

## Implementation Priority

If the frontend developer wants a phased build, use this order:

1. Hero + featured post
2. Filter bar + search
3. Reading paths
4. Archive grid card polish
5. Final CTA and motion refinement

## Deliverable Note

This file is the handoff-ready UI direction for the redesigned blog page in the current project's visual language. It is intentionally specific enough for implementation, while leaving room for frontend execution details.
