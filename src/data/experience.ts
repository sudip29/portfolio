export interface Experience {
  id: string
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
  stack: string[]
  current?: boolean
}

export const experiences: Experience[] = [
  {
    id: 'exp-0',
    company: 'DataSeers Private Limited',
    role: 'Senior Data Engineer',
    period: '04/2026 — Present',
    location: 'Mumbai, India',
    current: true,
    bullets: [
      'Designing and developing scalable data pipelines and ETL workflows to support business intelligence initiatives.',
      'Collaborating with cross-functional teams to architect data solutions and ensure data quality across systems.',
      'Optimising database performance and implementing best practices for data storage and retrieval.',
    ],
    stack: ['MSSQL', 'ETL', 'Data Pipelines', 'SQL', 'BI'],
  },
  {
    id: 'exp-1',
    company: 'Anand Rathi Wealth Management',
    role: 'Senior Data Engineer',
    period: '10/2024 — 04/2026',
    location: 'Mumbai, India',
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
    id: 'exp-2',
    company: 'WeVerse Digital Pvt. Ltd.',
    role: 'Data Specialist',
    period: '10/2023 — 09/2024',
    location: 'Mumbai, India',
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
    id: 'exp-3',
    company: 'TORUS Digital Pvt. Ltd.',
    role: 'SQL Developer',
    period: '02/2022 — 10/2023',
    location: 'Mumbai, India',
    bullets: [
      'Crafted stored procedures that streamlined data exchange between MSSQL databases and APIs.',
      'Optimised stored procedures in MSSQL to retrieve data in 0.01 ms, leading to a 10% faster account opening process.',
      'Implemented an automated trigger for opening accounts, reducing manual operations by 90%.',
      "Core member in designing the ETL structure of TORUS — the world's first true SuperApp.",
    ],
    stack: ['MSSQL', 'Stored Procedures', 'Triggers', 'ETL', 'API Integration'],
  },
  {
    id: 'exp-4',
    company: 'Mobiloitte Technologies',
    role: 'Software Engineer Trainee',
    period: '05/2021 — 01/2022',
    location: 'Delhi, India',
    bullets: [
      'Crafted intuitive UI screens for Blockchain Technologies using ReactJS, improving UX.',
      'Increased user retention by 30% and application usage by 15%.',
      'Maintained blockchain networks, implemented consensus protocols, and ensured 99.9% uptime.',
    ],
    stack: ['ReactJS', 'JavaScript', 'Blockchain', 'REST APIs'],
  },
]
