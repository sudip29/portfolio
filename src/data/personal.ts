/* ============================================================
   PERSONAL DATA — the only file you need to edit.
   Skills, Experience, and Projects all live here.
   ============================================================ */

export const personal = {

  /* ── Identity ── */
  name:      'Sudip Kumar Shaw',
  firstName: 'Sudip Kumar',
  lastName:  'Shaw',
  title:     'Senior Data Engineer',

  /* ── Typewriter roles (cycles in hero) ── */
  roles: [
    'Senior Data Engineer',
    'SQL Architect',
    'ETL Pipeline Builder',
    'Database Performance Expert',
  ],

  /* ── Hero stats ── */
  stats: [
    { value: '5+',   label: 'Years Exp.'   },
    { value: '3',    label: 'DB Platforms' },
    { value: '100+', label: 'Procedures'   },
  ],

  /* ── Contact ── */
  email:    'sudipshaw29@gmail.com',
  location: 'Mumbai, India',

  /* ── Social links ── */
  socials: {
    github:   'https://github.com/sudip-007',
    linkedin: 'https://www.linkedin.com/in/sudip-shaw',
    twitter:  'https://twitter.com',
  },

  /* ── Resume ── */
  resumeUrl: '/resume.pdf',

  /* ── Contact section ── */
  contact: {
    heading:     "Let's Build Something Together",
    description: "I'm currently open to new opportunities and collaborations. Whether it's a data engineering challenge, a fintech product, or an interesting project — I'd love to hear from you.",
  },

  /* ── Footer ── */
  footer: {
    credit:           'Designed & built by Sudip Kumar Shaw · 2026',
    availableForHire: true,
  },

  /* ==========================================================
     SKILLS
     Add/remove items freely inside any category.
     To add a new category: copy a block and change the title.
     ========================================================== */
  skills: [
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
      items: [
        'DB Administration',
        'Query Optimisation',
        'Data Mining',
        'Data Processing',
        'Performance Tuning',
        'Advanced MS Excel',
      ],
    },
  ],

  /* ── Marquee tech strip (scrolling banner under heading) ── */
  marquee: [
    { name: 'MSSQL',       symbol: '𝗦'  },
    { name: 'MySQL',       symbol: '🐬' },
    { name: 'PostgreSQL',  symbol: '🐘' },
    { name: 'Snowflake',   symbol: '❄'  },
    { name: 'Python',      symbol: '🐍' },
    { name: 'JavaScript',  symbol: 'JS' },
    { name: 'Java',        symbol: '☕' },
    { name: 'ReactJS',     symbol: '⚛'  },
    { name: 'Spring Boot', symbol: '🍃' },
    { name: 'SSIS',        symbol: '⚙'  },
    { name: 'SSRS',        symbol: '📊' },
    { name: 'ETL',         symbol: '⇄'  },
    { name: 'JDBC',        symbol: '⬡'  },
    { name: 'REST APIs',   symbol: '🔗' },
    { name: 'Git',         symbol: '⎇'  },
    { name: 'Linux',       symbol: '🐧' },
    { name: 'Tableau',     symbol: '📈' },
    { name: 'MS Excel',    symbol: '⊞'  },
    { name: 'SQL',         symbol: '◈'  },
    { name: 'Data Mining', symbol: '⛏'  },
  ],

  /* ==========================================================
     EXPERIENCE
     Add newest job at the TOP (id: 'exp-0', shift others down).
     current: true  →  shows the green "Now" badge.
     ========================================================== */
  experience: [
    {
      id:       'exp-0',
      company:  'DataSeers Private Limited',
      role:     'Senior Data Engineer',
      period:   '04/2026 — Present',
      location: 'Mumbai, India',
      current:  true,
      bullets: [
        'Designing and developing scalable data pipelines and ETL workflows to support business intelligence initiatives.',
        'Collaborating with cross-functional teams to architect data solutions and ensure data quality across systems.',
        'Optimising database performance and implementing best practices for data storage and retrieval.',
      ],
      stack: ['MSSQL', 'ETL', 'Data Pipelines', 'SQL', 'BI'],
    },
    {
      id:       'exp-1',
      company:  'Anand Rathi Wealth Management',
      role:     'Senior Data Engineer',
      period:   '10/2024 — 04/2026',
      location: 'Mumbai, India',
      current:  false,
      bullets: [
        'Handle RTA-sourced financial datasets with millions of transactional records across client portfolios.',
        'Develop high-performance stored procedures, functions, and SQL scripts improving processing speed by 40%.',
        'Optimise schemas, indexing, and execution plans to support high-volume queries with reduced latency.',
        'Implement validation and reconciliation logic ensuring accurate and reliable financial data flow.',
        'Partner with data and product teams to refine SQL logic for advisory, reporting, and compliance systems.',
      ],
      stack: ['MSSQL', 'Stored Procedures', 'Indexing', 'ETL', 'Performance Tuning', 'Snowflake'],
    },
    {
      id:       'exp-2',
      company:  'WeVerse Digital Pvt. Ltd.',
      role:     'Data Specialist',
      period:   '10/2023 — 09/2024',
      location: 'Mumbai, India',
      current:  false,
      bullets: [
        'Launched Codeless.ai, an advanced NoCode platform leveraging JavaScript, Java, and MySQL.',
        'Improved workflows and upgraded efficiency by 40%, reducing project completion time by 50%.',
        'Built digital solutions using MSSQL expertise, resulting in a 15% decrease in processing time for data analysis tasks.',
        'Optimised queries and enhanced UX, reducing onboarding time by 40% and raising user retention by 25% in six months.',
        'Collaborated with product teams to deliver data-driven automation and analytics solutions.',
      ],
      stack: ['MSSQL', 'MySQL', 'JavaScript', 'Java', 'ETL', 'Data Analysis'],
    },
    {
      id:       'exp-3',
      company:  'TORUS Digital Pvt. Ltd.',
      role:     'SQL Developer',
      period:   '02/2022 — 10/2023',
      location: 'Mumbai, India',
      current:  false,
      bullets: [
        'Crafted stored procedures that streamlined data exchange between MSSQL databases and APIs.',
        'Optimised stored procedures in MSSQL to retrieve data in 0.01 ms, leading to a 10% faster account opening process.',
        'Implemented an automated trigger for opening accounts, reducing manual operations by 90%.',
        "Core member in designing the ETL structure of TORUS — the world's first true SuperApp.",
      ],
      stack: ['MSSQL', 'Stored Procedures', 'Triggers', 'ETL', 'API Integration'],
    },
    {
      id:       'exp-4',
      company:  'Mobiloitte Technologies',
      role:     'Software Engineer Trainee',
      period:   '05/2021 — 01/2022',
      location: 'Delhi, India',
      current:  false,
      bullets: [
        'Crafted intuitive UI screens for Blockchain Technologies using ReactJS, improving UX.',
        'Increased user retention by 30% and application usage by 15%.',
        'Maintained blockchain networks, implemented consensus protocols, and ensured 99.9% uptime.',
      ],
      stack: ['ReactJS', 'JavaScript', 'Blockchain', 'REST APIs'],
    },
  ],

  /* ==========================================================
     PROJECTS
     featured: true  →  shows as the large hero card.
     size: 'large' | 'medium' | 'small'  controls card layout.
     Set liveUrl / githubUrl to '#' if not published yet.
     ========================================================== */
  projects: [
    {
      id:          'proj-1',
      title:       'CRM System',
      description: 'Full-stack CRM with relational database for leads, workflows, and customer activities — backed by optimised MySQL with JDBC transactional operations.',
      longDescription: 'Developed a relational database schema for leads, workflows, and customer activities with streamlined indexing. Expanded JDBC-based backend with secure transactional operations and validation logic. Integrated audit logging and real-time updates to improve operational scalability.',
      stack:    ['JavaScript', 'JDBC', 'Servlets', 'MySQL'],
      liveUrl:  '#',
      githubUrl: 'https://github.com/sudip-007',
      featured: true,
      size:     'large' as const,
      gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)',
    },
    {
      id:          'proj-2',
      title:       'Employee Leave Management',
      description: 'Normalised leave-flow schema with stored procedures, approval hierarchy, and HR analytics — powered by Spring Boot and SQL.',
      stack:    ['Spring Boot', 'SQL', 'Stored Procedures', 'Java'],
      liveUrl:  '#',
      githubUrl: 'https://github.com/sudip-007',
      featured: false,
      size:     'medium' as const,
      gradient: 'linear-gradient(135deg, #052e16 0%, #14532d 100%)',
    },
    {
      id:          'proj-3',
      title:       'MyPortfolio',
      description: 'Personal portfolio with MySQL backend — stores project metadata, content, and visitor tracking with REST endpoints powering React components.',
      stack:    ['ReactJS', 'MySQL', 'REST APIs', 'JavaScript'],
      liveUrl:  '#',
      githubUrl: 'https://github.com/sudip-007',
      featured: false,
      size:     'medium' as const,
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    },
    {
      id:          'proj-4',
      title:       'Crypto Hunter',
      description: 'Real-time crypto tracker with SQL-backed historical data, watchlists, and visualisations — integrating live REST API streams into a React UI.',
      stack:    ['ReactJS', 'REST APIs', 'SQL', 'JavaScript'],
      liveUrl:  '#',
      githubUrl: 'https://github.com/sudip-007',
      featured: false,
      size:     'small' as const,
      gradient: 'linear-gradient(135deg, #1a0533 0%, #3b0764 100%)',
    },
  ],
}
