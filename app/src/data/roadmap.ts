export interface RoadmapPhase {
  id: string;
  name: string;
  monthStart: number;
  monthEnd: number;
  color: string;
  goals: string[];
  dsaTarget: string;
  exitSalary: string;
}

export interface RoadmapMonth {
  month: number;
  monthName: string;
  dsaFocus: string;
  techFocus: string;
  milestones: string[];
}

export const phases: RoadmapPhase[] = [
  {
    id: 'phase-1',
    name: 'Phase 1: Foundations',
    monthStart: 1,
    monthEnd: 6,
    color: '#3b82f6',
    goals: [
      'Master Java 8+ (Streams, Lambdas)',
      'Spring Boot + JPA + Security',
      'MySQL deep dive',
      'Build Project 1 (Task Management API)',
      'DSA: 190 problems (Arrays to Graphs)',
    ],
    dsaTarget: '190 Problems',
    exitSalary: '9-10 LPA',
  },
  {
    id: 'phase-2',
    name: 'Phase 2: Scale Up',
    monthStart: 7,
    monthEnd: 12,
    color: '#8b5cf6',
    goals: [
      'AWS SAA Certification',
      'Docker + Kubernetes basics',
      'Microservices architecture',
      'Build Project 2 (E-Commerce)',
      'DSA: 150 more problems (DP + Advanced)',
    ],
    dsaTarget: '340 Total',
    exitSalary: '12-14 LPA',
  },
  {
    id: 'phase-3',
    name: 'Phase 3: Interview Ready',
    monthStart: 13,
    monthEnd: 18,
    color: '#f59e0b',
    goals: [
      'System Design mastery (LLD + HLD)',
      'Intensive DSA revision',
      'Mock interviews (10+)',
      'Apply to 50+ product companies',
      'Land 14 LPA+ offer',
    ],
    dsaTarget: 'Revision + Mocks',
    exitSalary: '14-18 LPA',
  },
];

export const months: RoadmapMonth[] = [
  { month: 1, monthName: 'Month 1', dsaFocus: 'Arrays, Strings, HashMaps (35 probs)', techFocus: 'Java 8+ Features, MySQL Basics', milestones: ['Set up dev environment', 'First DSA problems', 'Java Streams mastery'] },
  { month: 2, monthName: 'Month 2', dsaFocus: 'Two Pointers, Stacks, Sliding Window (35)', techFocus: 'MySQL Advanced, Design Patterns', milestones: ['30 SQL problems solved', 'CLI app with patterns'] },
  { month: 3, monthName: 'Month 3', dsaFocus: 'Binary Search, Linked List (30)', techFocus: 'Spring Boot + JPA/Hibernate', milestones: ['Start Project 1: Task API', 'DB schema design'] },
  { month: 4, monthName: 'Month 4', dsaFocus: 'Trees - BST (35)', techFocus: 'Spring Security JWT, Testing', milestones: ['JWT auth working', '80% test coverage'] },
  { month: 5, monthName: 'Month 5', dsaFocus: 'Heap, Backtracking, Tries (30)', techFocus: 'Advanced Java (Concurrency)', milestones: ['Async processing in API', 'CompletableFuture'] },
  { month: 6, monthName: 'Month 6', dsaFocus: 'Graphs - BFS/DFS (25)', techFocus: 'Project Polish, GitHub, Resume', milestones: ['Project 1 complete', 'LinkedIn optimized'] },
  { month: 7, monthName: 'Month 7', dsaFocus: 'DP Basics (25)', techFocus: 'AWS Fundamentals (EC2, S3, RDS)', milestones: ['API deployed on AWS', 'Start cert prep'] },
  { month: 8, monthName: 'Month 8', dsaFocus: 'DP Advanced + Greedy (25)', techFocus: 'Docker, AWS SAA Exam', milestones: ['Dockerize app', 'AWS SAA Certified'] },
  { month: 9, monthName: 'Month 9', dsaFocus: 'Advanced Graphs + Shortest Path (25)', techFocus: 'Microservices, CI/CD', milestones: ['Project 2 started', 'GitHub Actions pipeline'] },
  { month: 10, monthName: 'Month 10', dsaFocus: 'Advanced Trees + Design (20)', techFocus: 'Kafka, Redis, Caching', milestones: ['Async messaging', 'Redis caching layer'] },
  { month: 11, monthName: 'Month 11', dsaFocus: 'Company-wise Problems (30)', techFocus: 'Kubernetes, Terraform', milestones: ['K8s deployment', 'Infra as Code'] },
  { month: 12, monthName: 'Month 12', dsaFocus: 'Full Revision + Contests (25)', techFocus: 'Monitoring, Project Polish', milestones: ['Project 2 deployed', 'Prometheus + Grafana'] },
  { month: 13, monthName: 'Month 13', dsaFocus: 'Intensive Revision: Arrays-Trees', techFocus: 'LLD: Patterns, SOLID, Clean Arch', milestones: ['Parking Lot design', 'Chess game design'] },
  { month: 14, monthName: 'Month 14', dsaFocus: 'Intensive Revision: Graphs, DP', techFocus: 'HLD: Scalability, Uber, Twitter', milestones: ['10 HLD designs', 'System design docs'] },
  { month: 15, monthName: 'Month 15', dsaFocus: 'Mock Interviews + Contests', techFocus: 'JVM Internals, Golang basics', milestones: ['2 mocks/week', 'First Go API'] },
  { month: 16, monthName: 'Month 16', dsaFocus: 'Final Polish + Weak Areas', techFocus: 'Behavioral Prep, Negotiation', milestones: ['STAR stories ready', 'Salary research'] },
  { month: 17, monthName: 'Month 17', dsaFocus: 'Maintenance + Timed Practice', techFocus: 'Apply Aggressively', milestones: ['50+ applications', '5-10 interview calls'] },
  { month: 18, monthName: 'Month 18', dsaFocus: 'Confidence Building', techFocus: 'Interview + Negotiate', milestones: ['Crack interviews', 'LAND 14 LPA+ OFFER!'] },
];

export const weeklySchedule = [
  { day: 'Monday', office: '9 hrs', dsaTime: '75 min', techTime: '75 min', totalTime: '2.5 hrs' },
  { day: 'Tuesday', office: '9 hrs', dsaTime: '75 min', techTime: '75 min', totalTime: '2.5 hrs' },
  { day: 'Wednesday', office: '9 hrs', dsaTime: '75 min', techTime: '75 min', totalTime: '2.5 hrs' },
  { day: 'Thursday', office: '9 hrs', dsaTime: '75 min', techTime: '75 min', totalTime: '2.5 hrs' },
  { day: 'Friday', office: 'WFH/Light', dsaTime: '90 min', techTime: '90 min', totalTime: '3 hrs' },
  { day: 'Saturday', office: 'WFH/Mtg', dsaTime: '90 min', techTime: '90 min', totalTime: '3 hrs' },
  { day: 'Sunday', office: 'Off', dsaTime: '90 min', techTime: '90 min', totalTime: '4 hrs' },
];
