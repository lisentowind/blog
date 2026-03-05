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

export type GitHubProfile = {
  name: string
  login: string
  location: string
  followers: number
  following: number
  publicRepos: number
  avatarUrl: string
  profileUrl: string
  profileRepoUrl: string
  snapshotDate: string
}

export type PinnedRepo = {
  name: string
  htmlUrl: string
  description: string
  language: string
  stars: number
  forks: number
  updatedAt: string
  homepage?: string
  fork: boolean
  parent?: string
}

export type ProfileLink = {
  label: string
  href: string
  note: string
}

export const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'Projects', to: '/projects' },
  { label: 'Lab', to: '/lab' },
  { label: 'About', to: '/about' },
]

export const githubProfile: GitHubProfile = {
  name: 'love nico',
  login: 'lisentowind',
  location: 'Chengdu',
  followers: 368,
  following: 600,
  publicRepos: 97,
  avatarUrl: 'https://avatars.githubusercontent.com/u/88653280?v=4',
  profileUrl: 'https://github.com/lisentowind',
  profileRepoUrl: 'https://github.com/lisentowind/lisentowind',
  snapshotDate: '2026-03-05',
}

export const heroStats: Stat[] = [
  { value: String(githubProfile.publicRepos), label: 'Public Repos' },
  { value: String(githubProfile.followers), label: 'Followers' },
  { value: String(githubProfile.following), label: 'Following' },
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

export const pinnedRepos: PinnedRepo[] = [
  {
    name: 'x-markdown',
    htmlUrl: 'https://github.com/lisentowind/x-markdown',
    description: 'markdown渲染器',
    language: 'Vue',
    stars: 1,
    forks: 0,
    updatedAt: '2026-01-28',
    fork: true,
    parent: 'element-plus-x/x-markdown',
  },
  {
    name: 'Element-Plus-X',
    htmlUrl: 'https://github.com/lisentowind/Element-Plus-X',
    description: 'Vue3 + Element-Plus 开箱即用的企业级 AI 组件库前端解决方案。',
    language: 'Vue',
    stars: 0,
    forks: 0,
    updatedAt: '2025-09-03',
    homepage: 'https://element-plus-x.com',
    fork: true,
    parent: 'element-plus-x/Element-Plus-X',
  },
  {
    name: 'vue-shiki-monaco',
    htmlUrl: 'https://github.com/lisentowind/vue-shiki-monaco',
    description: '使用 Monaco Editor 和 Shiki 高亮的 Vue3 组件。',
    language: 'TypeScript',
    stars: 5,
    forks: 2,
    updatedAt: '2026-01-21',
    homepage: 'https://lisentowind.github.io/vue-shiki-monaco/',
    fork: false,
  },
  {
    name: 'Element-Plus-X-Go',
    htmlUrl: 'https://github.com/lisentowind/Element-Plus-X-Go',
    description: '基于 Element-Plus-X 开发的桌面端项目模板。',
    language: 'Vue',
    stars: 2,
    forks: 0,
    updatedAt: '2025-11-10',
    fork: false,
  },
  {
    name: 'vue3-ts-antd-unocss-demo',
    htmlUrl: 'https://github.com/lisentowind/vue3-ts-antd-unocss-demo',
    description: 'Vue3 + TS + Antd + UnoCSS 快速启动项目。',
    language: 'Vue',
    stars: 1,
    forks: 1,
    updatedAt: '2026-03-02',
    fork: false,
  },
  {
    name: 'front-backend-demo',
    htmlUrl: 'https://github.com/lisentowind/front-backend-demo',
    description: 'Go + Vue3 的前后端联调示例项目。',
    language: 'Vue',
    stars: 0,
    forks: 0,
    updatedAt: '2026-01-21',
    fork: false,
  },
]

export const profileLinks: ProfileLink[] = [
  {
    label: 'GitHub Profile',
    href: 'https://github.com/lisentowind',
    note: '主页与动态',
  },
  {
    label: 'Profile README',
    href: 'https://github.com/lisentowind/lisentowind',
    note: '个人简介仓库',
  },
  {
    label: 'Element-Plus-X Site',
    href: 'https://element-plus-x.com',
    note: '组件库官网',
  },
  {
    label: 'vue-shiki-monaco Demo',
    href: 'https://lisentowind.github.io/vue-shiki-monaco/',
    note: '在线演示',
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
  '平时主要在公司 GitLab 和 Gitee 上开发。',
  '喜欢在 GitHub 上逛有趣的开源项目并做技术探索。',
  '偏好前端动效、组件封装和工程化实践。',
]

export const skillTags: string[] = [
  'Vue.js',
  'React',
  'Vite',
  'TypeScript',
  'JavaScript',
  'Go',
  'HTML5',
  'CSS3',
  'SCSS',
  'Less',
  'Electron',
  'Wails',
  'Node.js',
  'Express',
  'Tauri',
]

export const languageSummary: Stat[] = [
  { value: '13', label: 'TypeScript Repos' },
  { value: '8', label: 'Vue Repos' },
  { value: '1', label: 'Go Repos' },
]
