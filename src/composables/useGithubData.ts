import { computed, ref } from 'vue'
import {
  fallbackProfile,
  fixedRepoNames,
  githubLogin,
  type ContributionYearHeatmap,
  type GitHubOrg,
  type GitHubProfile,
  type PinnedRepo,
  type Stat,
} from '../data/content'

type GithubUserResponse = {
  name: string | null
  login: string
  location: string | null
  followers: number
  following: number
  public_repos: number
  avatar_url: string
  html_url: string
}

type RepoOwner = {
  login: string
  avatar_url: string
  html_url: string
  type: string
}

type GithubRepoResponse = {
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  homepage: string | null
  fork: boolean
  parent?: {
    full_name: string
    description: string | null
    owner?: RepoOwner
  }
}

type GithubOrgResponse = {
  login: string
  avatar_url: string
  description: string | null
  html_url: string
}

type ContributionsApiResponse = {
  total: Record<string, number>
  contributions: Array<{
    date: string
    count: number
    level: number
  }>
}

const profile = ref<GitHubProfile>(fallbackProfile)
const pinnedRepos = ref<PinnedRepo[]>([])
const languageSummary = ref<Stat[]>([])
const organizations = ref<GitHubOrg[]>([])
const contributionHeatmaps = ref<ContributionYearHeatmap[]>([])

const loading = ref(false)
const loaded = ref(false)
const error = ref('')

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`API error ${response.status} @ ${url}`)
  }
  return (await response.json()) as T
}

const normalizeDate = (value: string) => value.slice(0, 10)

const toPinnedRepo = (repo: GithubRepoResponse): PinnedRepo => ({
  name: repo.name,
  htmlUrl: repo.html_url,
  description: repo.description ?? 'No description',
  language: repo.language ?? 'Unknown',
  stars: repo.stargazers_count,
  forks: repo.forks_count,
  updatedAt: normalizeDate(repo.updated_at),
  homepage: repo.homepage || undefined,
  fork: repo.fork,
  parent: repo.parent?.full_name,
})

const buildLanguageSummary = (repos: GithubRepoResponse[]): Stat[] => {
  const counter = new Map<string, number>()

  repos.forEach((repo) => {
    if (!repo.language) return
    counter.set(repo.language, (counter.get(repo.language) ?? 0) + 1)
  })

  return Array.from(counter.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([language, count]) => ({
      value: String(count),
      label: `${language} Repos`,
    }))
}

const buildContributionHeatmaps = (payload: ContributionsApiResponse): ContributionYearHeatmap[] => {
  const dayMap = new Map<string, Array<{ date: string; count: number; level: number }>>()

  payload.contributions.forEach((day) => {
    const year = day.date.slice(0, 4)
    const current = dayMap.get(year) ?? []
    current.push(day)
    dayMap.set(year, current)
  })

  return Object.entries(payload.total)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, total]) => ({
      year,
      total,
      days: (dayMap.get(year) ?? []).sort((a, b) => a.date.localeCompare(b.date)),
    }))
}

const mergeOrganizations = (fromApi: GitHubOrg[], fromParents: GitHubOrg[]): GitHubOrg[] => {
  const map = new Map<string, GitHubOrg>()

  fromApi.forEach((org) => map.set(org.login, org))
  fromParents.forEach((org) => {
    if (!map.has(org.login)) map.set(org.login, org)
  })

  return Array.from(map.values())
}

const organizationsFromForkParents = (repos: GithubRepoResponse[]): GitHubOrg[] => {
  const orgs: GitHubOrg[] = []

  repos.forEach((repo) => {
    const owner = repo.parent?.owner
    if (!owner || owner.type !== 'Organization') return

    orgs.push({
      login: owner.login,
      avatarUrl: owner.avatar_url,
      profileUrl: owner.html_url,
      description: repo.parent?.description || `Organization behind ${repo.parent?.full_name ?? owner.login}`,
    })
  })

  return orgs
}

const loadGithubData = async (force = false) => {
  if (loading.value) return
  if (loaded.value && !force) return

  loading.value = true
  error.value = ''

  try {
    const [user, repos] = await Promise.all([
      fetchJson<GithubUserResponse>(`https://api.github.com/users/${githubLogin}`),
      fetchJson<GithubRepoResponse[]>(
        `https://api.github.com/users/${githubLogin}/repos?per_page=100&type=owner&sort=updated`,
      ),
    ])

    const fixedRepoSet = new Set(fixedRepoNames)
    const repoMap = new Map(repos.map((repo) => [repo.name, repo]))

    const orderedRepoEntries = fixedRepoNames
      .filter((repoName) => fixedRepoSet.has(repoName) && repoMap.has(repoName))
      .map((repoName) => repoMap.get(repoName)!)

    const orderedRepos = orderedRepoEntries.map((repo) => toPinnedRepo(repo))

    profile.value = {
      name: user.name?.trim() || user.login,
      login: user.login,
      location: user.location || 'Unknown',
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      profileRepoUrl: `https://github.com/${user.login}/${user.login}`,
      snapshotDate: new Date().toISOString().slice(0, 10),
    }

    pinnedRepos.value = orderedRepos
    languageSummary.value = buildLanguageSummary(repos)

    const [orgsResult, contributionResult] = await Promise.allSettled([
      fetchJson<GithubOrgResponse[]>(`https://api.github.com/users/${githubLogin}/orgs`),
      fetchJson<ContributionsApiResponse>(`https://github-contributions-api.jogruber.de/v4/${githubLogin}`),
    ])

    const notices: string[] = []

    const fallbackOrgs = organizationsFromForkParents(orderedRepoEntries)

    if (orgsResult.status === 'fulfilled') {
      const apiOrgs = orgsResult.value.map((org) => ({
        login: org.login,
        avatarUrl: org.avatar_url,
        profileUrl: org.html_url,
        description: org.description || 'No public description',
      }))

      organizations.value = mergeOrganizations(apiOrgs, fallbackOrgs)
    } else {
      organizations.value = fallbackOrgs
      notices.push('组织信息接口不可用，已使用仓库关联组织兜底')
    }

    if (contributionResult.status === 'fulfilled') {
      contributionHeatmaps.value = buildContributionHeatmaps(contributionResult.value)
    } else {
      contributionHeatmaps.value = []
      notices.push('提交热力图暂时不可用')
    }

    if (notices.length > 0) {
      error.value = notices.join('；')
    }

    loaded.value = true
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    error.value = message
  } finally {
    loading.value = false
  }
}

export const useGithubData = () => {
  const displayName = computed(() => profile.value.name || profile.value.login || githubLogin)

  return {
    profile,
    pinnedRepos,
    languageSummary,
    organizations,
    contributionHeatmaps,
    loading,
    loaded,
    error,
    displayName,
    loadGithubData,
  }
}
