export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  stack: string[]
  liveUrl: string
  githubUrl: string
  featured?: boolean
  size?: 'large' | 'medium' | 'small'
  gradient: string
}

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'CRM System',
    description:
      'Full-stack CRM with relational database for leads, workflows, and customer activities — backed by optimised MySQL with JDBC transactional operations.',
    longDescription:
      'Developed a relational database schema for leads, workflows, and customer activities with streamlined indexing. Expanded JDBC-based backend with secure transactional operations and validation logic. Integrated audit logging and real-time updates to improve operational scalability.',
    stack: ['JavaScript', 'JDBC', 'Servlets', 'MySQL'],
    liveUrl: '#',
    githubUrl: 'https://github.com/sudip-007',
    featured: true,
    size: 'large',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)',
  },
  {
    id: 'proj-2',
    title: 'Employee Leave Management',
    description:
      'Normalised leave-flow schema with stored procedures, approval hierarchy, and HR analytics — powered by Spring Boot and SQL.',
    stack: ['Spring Boot', 'SQL', 'Stored Procedures', 'Java'],
    liveUrl: '#',
    githubUrl: 'https://github.com/sudip-007',
    size: 'medium',
    gradient: 'linear-gradient(135deg, #052e16 0%, #14532d 100%)',
  },
  {
    id: 'proj-3',
    title: 'MyPortfolio',
    description:
      'Personal portfolio with MySQL backend — stores project metadata, content, and visitor tracking with REST endpoints powering React components.',
    stack: ['ReactJS', 'MySQL', 'REST APIs', 'JavaScript'],
    liveUrl: '#',
    githubUrl: 'https://github.com/sudip-007',
    size: 'medium',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  },
  {
    id: 'proj-4',
    title: 'Crypto Hunter',
    description:
      'Real-time crypto tracker with SQL-backed historical data, watchlists, and visualisations — integrating live REST API streams into a React UI.',
    stack: ['ReactJS', 'REST APIs', 'SQL', 'JavaScript'],
    liveUrl: '#',
    githubUrl: 'https://github.com/sudip-007',
    size: 'small',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #3b0764 100%)',
  },
]
