export type NavLink = {
  label: string
  to: string
}

export type Stat = {
  value: string
  label: string
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
