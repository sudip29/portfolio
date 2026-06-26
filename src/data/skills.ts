export interface SkillCategory {
  title: string
  items: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Databases',
    items: ['MSSQL', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'ETL & Integration',
    items: ['ETL Pipelines', 'SSIS', 'SSRS', 'JDBC', 'REST APIs'],
  },
  {
    title: 'Cloud Platforms',
    items: ['Snowflake', 'Azure (Basics)'],
  },
  {
    title: 'Programming',
    items: ['Python', 'JavaScript', 'Java', 'SQL', 'Bash'],
  },
  {
    title: 'Frontend',
    items: ['ReactJS', 'Spring Boot', 'HTML/CSS'],
  },
  {
    title: 'Core Expertise',
    items: ['DB Administration', 'Query Optimisation', 'Data Mining', 'Data Processing', 'Performance Tuning', 'Advanced MS Excel'],
  },
]

export interface MarqueeTech {
  name: string
  symbol: string
}

export const marqueeTechs: MarqueeTech[] = [
  { name: 'MSSQL',        symbol: '𝗦' },
  { name: 'MySQL',         symbol: '🐬' },
  { name: 'PostgreSQL',    symbol: '🐘' },
  { name: 'Snowflake',     symbol: '❄' },
  { name: 'Python',        symbol: '🐍' },
  { name: 'JavaScript',    symbol: 'JS' },
  { name: 'Java',          symbol: '☕' },
  { name: 'ReactJS',       symbol: '⚛' },
  { name: 'Spring Boot',   symbol: '🍃' },
  { name: 'SSIS',          symbol: '⚙' },
  { name: 'SSRS',          symbol: '📊' },
  { name: 'ETL',           symbol: '⇄' },
  { name: 'JDBC',          symbol: '⬡' },
  { name: 'REST APIs',     symbol: '🔗' },
  { name: 'Git',           symbol: '⎇' },
  { name: 'Linux',         symbol: '🐧' },
  { name: 'Tableau',       symbol: '📈' },
  { name: 'MS Excel',      symbol: '⊞' },
  { name: 'SQL',           symbol: '◈' },
  { name: 'Data Mining',   symbol: '⛏' },
]
