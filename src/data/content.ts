export type NavLink = {
  label: string
  to: string
}

export type Post = {
  title: string
  date: string
  tag: string
  summary: string
  read: string
}

export type Project = {
  name: string
  role: string
  stack: string[]
  status: string
  desc: string
}

export type LabEntry = {
  name: string
  stage: string
  headline: string
  details: string
}

export type Stat = {
  value: string
  label: string
}

export const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'Projects', to: '/projects' },
  { label: 'Lab', to: '/lab' },
  { label: 'About', to: '/about' },
]

export const heroStats: Stat[] = [
  { value: '52', label: '深度文章' },
  { value: '17', label: '开源实验' },
  { value: '8.9K', label: '月度访问' },
]

export const posts: Post[] = [
  {
    title: '把本地 AI Agent 接入知识库检索的三种架构',
    date: '2026-02-26',
    tag: 'AI Engineering',
    summary: '对比 RAG 网关、轻量 embedding cache 和本地向量索引，给出延迟与维护成本实测。',
    read: '8 min',
  },
  {
    title: '我如何做一个 60FPS 的可视化控制台',
    date: '2026-02-11',
    tag: 'Frontend Motion',
    summary: '从图层隔离、GPU 友好属性到时间轴编排，拆解高密度动画页面的性能策略。',
    read: '6 min',
  },
  {
    title: 'TypeScript 严格模式下的领域建模习惯',
    date: '2026-01-30',
    tag: 'Type Systems',
    summary: '用 discriminated union 与不可变状态控制复杂业务分支，减少回归。',
    read: '10 min',
  },
  {
    title: '微前端落地后的性能回归怎么排查',
    date: '2026-01-12',
    tag: 'Architecture',
    summary: '从路由切换抖动到资源重复加载，整理一套可复用的排查清单。',
    read: '9 min',
  },
  {
    title: '用视觉节奏做信息层级：一个博客首页的改造实录',
    date: '2025-12-28',
    tag: 'Design Systems',
    summary: '如何让动效服务阅读路径，而不是干扰内容本身。',
    read: '7 min',
  },
]

export const projects: Project[] = [
  {
    name: 'Neon Chronicle',
    role: '个人内容引擎',
    stack: ['Vue 3', 'Vite', 'Edge Functions'],
    status: 'RUNNING',
    desc: '博客、速记、实验日志统一发布，自动生成结构化摘要和标签图谱。',
  },
  {
    name: 'Signal Deck',
    role: '实时监控面板',
    stack: ['TypeScript', 'WebSocket', 'D3'],
    status: 'OPTIMIZING',
    desc: '将服务端事件流压缩成可读时间轨迹，用于快速定位线上波动。',
  },
  {
    name: 'Prompt Forge',
    role: '提示词实验室',
    stack: ['Node.js', 'SQLite', 'CLI'],
    status: 'BUILDING',
    desc: '版本化记录提示策略，追踪每次改动对准确率和成本的影响。',
  },
  {
    name: 'Pulse Studio',
    role: '交互组件库',
    stack: ['Vue', 'Storybook', 'Vitest'],
    status: 'ACTIVE',
    desc: '维护科技风视觉组件，输出可复用主题和动效模式。',
  },
]

export const labEntries: LabEntry[] = [
  {
    name: 'WebGPU Shader Playground',
    stage: 'Prototype',
    headline: '在博客页中生成可交互噪声背景',
    details: '当前在测试移动端降级策略和 GPU 占用阈值。',
  },
  {
    name: 'Agent Action Recorder',
    stage: 'Alpha',
    headline: '记录 AI 代理任务轨迹并做可视化回放',
    details: '用于评估提示词改动对任务完成率的影响。',
  },
  {
    name: 'Streaming Markdown Reader',
    stage: 'Beta',
    headline: '提升长文阅读体验，支持流式高亮与目录同步',
    details: '下一步加入语义折叠和引用预览。',
  },
]

export const aboutBullets: string[] = [
  '前端工程师，关注工程效率、性能体验与交互设计。',
  '长期写作 TypeScript、Vue、AI workflow 相关内容。',
  '喜欢把复杂技术讲清楚，也喜欢把页面打磨到有记忆点。',
]

export const skillTags: string[] = [
  'Vue 3',
  'TypeScript',
  'Vite',
  'Node.js',
  'Motion Design',
  'Web Performance',
  'DX Automation',
  'AI Tooling',
]
