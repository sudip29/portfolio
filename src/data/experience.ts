/* All data lives in personal.ts — edit that file, not this one. */
import { personal } from './personal'

export interface Experience {
  id:       string
  company:  string
  role:     string
  period:   string
  location: string
  bullets:  string[]
  stack:    string[]
  current?: boolean
}

export const experiences: Experience[] = personal.experience
