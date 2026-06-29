/* All data lives in personal.ts — edit that file, not this one. */
import { personal } from './personal'

export interface Project {
  id:               string
  title:            string
  description:      string
  longDescription?: string
  stack:            string[]
  liveUrl:          string
  githubUrl:        string
  featured?:        boolean
  size?:            'large' | 'medium' | 'small'
  gradient:         string
}

export const projects: Project[] = personal.projects
