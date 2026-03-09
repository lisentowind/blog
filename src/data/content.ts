export type NavLink = {
  label: string
  to: string
}

export type Stat = {
  value: string
  label: string
}

export type PostSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
  code?: string
}

export type Post = {
  slug: string
  title: string
  date: string
  tag: string
  summary: string
  read: string
  headline: string
  sections: PostSection[]
}

export type Project = {
  name: string
  role: string
  stack: string[]
  status: string
  desc: string
}

export type LabLink = {
  label: string
  href?: string
  to?: string
}

export type LabEntry = {
  name: string
  stage: string
  headline: string
  details: string
  stack: string[]
  focus: string
  links?: LabLink[]
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

export type SkillTag = {
  name: string
  icon: string
  color: string
}

export type GitHubOrg = {
  login: string
  avatarUrl: string
  profileUrl: string
  description: string
}

export type ContributionDay = {
  date: string
  count: number
  level: number
}

export type ContributionYearHeatmap = {
  year: string
  total: number
  days: ContributionDay[]
}

export const githubLogin = 'lisentowind'

export const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'Lab', to: '/lab' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
]

export const fixedRepoNames = [
  'x-markdown',
  'Element-Plus-X',
  'vue-shiki-monaco',
  'Element-Plus-X-Go',
  'vue3-ts-antd-unocss-demo',
  'front-backend-demo',
]

export const profileLinks: ProfileLink[] = [
  {
    label: 'GitHub Profile',
    href: `https://github.com/${githubLogin}`,
    note: '主页与动态',
  },
  {
    label: 'Profile README',
    href: `https://github.com/${githubLogin}/${githubLogin}`,
    note: '个人简介仓库',
  },
  {
    label: 'Element-Plus-X Site',
    href: 'https://element-plus-x.com',
    note: '组件库官网',
  },
  {
    label: 'vue-shiki-monaco Demo',
    href: `https://${githubLogin}.github.io/vue-shiki-monaco/`,
    note: '在线演示',
  },
]

export const aboutBullets: string[] = [
  '平时主要在公司 GitLab 和 Gitee 上开发。',
  '喜欢在 GitHub 上逛有趣的开源项目并做技术探索。',
  '偏好前端动效、组件封装和工程化实践。',
]

export const skillTags: SkillTag[] = [
  { name: 'Vue.js', icon: 'tabler:brand-vue', color: '#42b883' },
  { name: 'React', icon: 'tabler:brand-react', color: '#61dafb' },
  { name: 'Vite', icon: 'tabler:brand-vite', color: '#646cff' },
  { name: 'TypeScript', icon: 'tabler:brand-typescript', color: '#3178c6' },
  { name: 'JavaScript', icon: 'tabler:brand-javascript', color: '#f7df1e' },
  { name: 'Go', icon: 'tabler:brand-golang', color: '#00add8' },
  { name: 'HTML5', icon: 'tabler:brand-html5', color: '#e34f26' },
  { name: 'CSS3', icon: 'tabler:brand-css3', color: '#1572b6' },
  { name: 'SCSS', icon: 'tabler:brand-sass', color: '#cc6699' },
  { name: 'Less', icon: 'tabler:file-type-css', color: '#1d365d' },
  { name: 'Electron', icon: 'tabler:atom-2', color: '#47848f' },
  { name: 'Wails', icon: 'tabler:sailboat-2', color: '#f05f55' },
  { name: 'Node.js', icon: 'tabler:brand-nodejs', color: '#339933' },
  { name: 'Express', icon: 'tabler:route-2', color: '#8892a0' },
  { name: 'Tauri', icon: 'tabler:flame', color: '#24c8db' },
]

export const blogPosts: Post[] = [
  {
    slug: 'build-a-github-driven-portfolio',
    title: '把 GitHub 数据接进个人主页的一次完整整理',
    date: '2026-03-09',
    tag: '工程化',
    summary: '把项目列表、组织信息、贡献热力图统一收敛，做成一个更像作品集而不是静态名片的网站。',
    read: '6 min read',
    headline: '从静态介绍页升级为可持续更新的个人技术主页。',
    sections: [
      {
        title: '为什么要改',
        paragraphs: [
          '以前的主页更像一张单页名片，信息有，但缺少持续更新的能力。',
          '这次改造的目标不是堆更多模块，而是把 GitHub 上本来就存在的数据重新组织成更适合阅读的结构。',
        ],
      },
      {
        title: '这次收敛了什么',
        paragraphs: [
          '首页只保留概览和入口，把细节放到 Blog、Lab、Projects、About 各自的分类页。',
        ],
        bullets: ['Projects 页负责展示固定仓库', 'About 页负责个人资料、组织与热力图', 'Blog 页负责技术文章', 'Lab 页负责实验与想法'],
      },
      {
        title: '一个很实用的小原则',
        paragraphs: ['如果某个模块不能长期维护，就不要让它占据首页黄金位置。'],
        code: "const keepHomepageFocused = (items: string[]) => items.filter((item) => ['overview', 'navigation'].includes(item))",
      },
    ],
  },
  {
    slug: 'component-driven-visual-language',
    title: '给个人博客建立一套统一的视觉组件语言',
    date: '2026-03-06',
    tag: 'UI',
    summary: '不是单纯做炫酷效果，而是把玻璃面板、按钮、标题、导航统一成可以复用的视觉语法。',
    read: '5 min read',
    headline: '一致的视觉语言，能让博客更像一个完整产品。',
    sections: [
      {
        title: '组件比页面更重要',
        paragraphs: [
          '页面会不断变化，但卡片、标题、按钮、信息面板这些基础单元会反复出现。',
          '先把通用样式稳定下来，后续扩展 Blog 和 Lab 时会轻松很多。',
        ],
      },
      {
        title: '我保留了什么风格',
        paragraphs: ['整体继续使用 cyber / glass 的方向，但尽量避免过度装饰，让内容仍然是主角。'],
        bullets: ['导航悬浮感', '面板统一边框和阴影', '按钮只保留两种主要变体', '深浅色主题保持一致语义'],
      },
    ],
  },
  {
    slug: 'from-demo-to-writing-space',
    title: '从作品展示到内容沉淀：为什么我要补一个 Blog 和 Lab',
    date: '2026-03-03',
    tag: '写作',
    summary: '只展示仓库会让访问者知道你做过什么，但博客和实验室能让人看到你是怎么思考的。',
    read: '4 min read',
    headline: '仓库证明产出，文章和实验才更能体现思考过程。',
    sections: [
      {
        title: 'Blog 解决什么问题',
        paragraphs: ['Blog 适合放相对完整的技术文章、方案总结和复盘。'],
      },
      {
        title: 'Lab 解决什么问题',
        paragraphs: ['Lab 更适合放半成品、实验性想法、交互演示和未来计划。'],
      },
      {
        title: '它们一起带来的变化',
        paragraphs: ['这样网站不再只是“我有什么项目”，还会变成“我最近在研究什么、我怎么做判断”。'],
      },
    ],
  },
]

export const labEntries: LabEntry[] = [
  {
    name: 'Motion Presets',
    stage: 'Exploring',
    headline: '给博客卡片和页面切换抽一层统一的动效预设。',
    details: '把 reveal、hover、page transition 这几类交互整理成可复用方案，减少页面级重复样式。',
    stack: ['Vue 3', 'TypeScript', 'CSS'],
    focus: '提升交互一致性，让新增页面时不用重复调动效。',
    links: [{ label: '返回首页', to: '/' }],
  },
  {
    name: 'Markdown Pipeline',
    stage: 'Planned',
    headline: '下一步给 Blog 接 Markdown 内容源。',
    details: '当前先用 TypeScript 静态数据完成结构验证，后续可以平滑切换到 Markdown 或 headless CMS。',
    stack: ['Vite', 'Markdown', 'Content Collections'],
    focus: '先把信息架构跑通，再升级内容生产方式。',
    links: [{ label: '查看 Blog', to: '/blog' }],
  },
  {
    name: 'Project Storytelling',
    stage: 'Building',
    headline: '给每个仓库补一层“项目故事”视角。',
    details: '不仅展示 star、fork、语言，还补充背景、问题、解决方案和最终效果，让访客更快理解项目价值。',
    stack: ['Vue Router', 'Card UI', 'Case Study'],
    focus: '把仓库列表升级为更完整的作品集叙事。',
    links: [{ label: '查看 Projects', to: '/projects' }],
  },
]

export const fallbackProfile: GitHubProfile = {
  name: githubLogin,
  login: githubLogin,
  location: 'Unknown',
  followers: 0,
  following: 0,
  publicRepos: 0,
  avatarUrl: `https://github.com/${githubLogin}.png`,
  profileUrl: `https://github.com/${githubLogin}`,
  profileRepoUrl: `https://github.com/${githubLogin}/${githubLogin}`,
  snapshotDate: new Date().toISOString().slice(0, 10),
}
