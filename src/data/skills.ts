/* All data lives in personal.ts — edit that file, not this one. */
import { personal } from './personal'

export interface SkillCategory {
  title: string
  items: string[]
}

export interface MarqueeTech {
  name: string
  symbol: string
}

export const skillCategories: SkillCategory[] = personal.skills
export const marqueeTechs:    MarqueeTech[]    = personal.marquee
