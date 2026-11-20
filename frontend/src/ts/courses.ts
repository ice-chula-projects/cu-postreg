export interface Course {
  id: string,
  name: string,
  credits: number,
  keywords: string[] //used for search
}

export const courses: Course[] = [
  { id: '2190222', name: 'FUND DS ALG', credits: 4, keywords: ["Fundamental", "Datastructures", "Algorithms", "DSA"] },
  { id: '2190523', name: 'GAME DESIGN', credits: 3, keywords: [] },
  { id: '2190472', name: 'NETCENT ARCH', credits: 3, keywords: ["Netcentric", "Architecture"] },
  { id: '2190443', name: 'USER INT DSGN', credits: 3, keywords: ["User", "Interface", "Design", "UI"] },
  { id: '2184301', name: 'ENG ECON APP', credits: 3, keywords: ["Engineering", "Economy", "Applications"] },
  { id: "2140111", name: "EXPL ENG WORLD", credits: 3, keywords: []},
  { id: "2190101", name: "COMP PROG", credits: 3, keywords: []},
  { id: "2223021", name: "COM JAP S/T I", credits: 3, keywords: []},
  { id: "2301107", name: "CALCULUS I", credits: 3, keywords: []},
  { id: "2304153", name: "PHYSICS ENGS", credits: 3, keywords: []},
  { id: "2304193", name: "PHYSICS LAB ENGS", credits: 1, keywords: []},
  { id: "5501112", name: "COMM ENG I", credits: 3, keywords: []},
  { id: "2143101", name: "INTRO ICE", credits: 3, keywords: []},
  { id: "2182205", name: "PROB STAT DATA", credits: 3, keywords: []},
  { id: "2190103", name: "ADV COMP PROG", credits: 3, keywords: []},
  { id: "2301108", name: "CALCULUS II", credits: 3, keywords: []},
  { id: "2304154", name: "PHYS ELEC ENGS", credits: 3, keywords: []},
  { id: "2304194", name: "PHYS ELEC LAB ENGS", credits: 1, keywords: []},
  { id: "5501123", name: "COMM ENG II", credits: 3, keywords: []},
  { id: "2143101", name: "INTRO ICE", credits: 3, keywords: []},
  { id: "2182205", name: "PROB STAT DATA", credits: 3, keywords: []},
  { id: "2190103", name: "ADV COMP PROG", credits: 3, keywords: []},
  { id: "2301108", name: "CALCULUS II", credits: 3, keywords: []},
  { id: "2304154", name: "PHYS ELEC ENGS", credits: 3, keywords: []},
  { id: "2304194", name: "PHYS ELEC LAB ENGS", credits: 1, keywords: []},
  { id: "5501123", name: "COMM ENG II", credits: 3, keywords: []},
  { id: "2182204", name: "SIG LIN SYS", credits: 3, keywords: []},
  { id: "2190512", name: "APP DEV", credits: 3, keywords: []},
  { id: "2190514", name: "AI", credits: 3, keywords: []},
  { id: "2223022", name: "COM JAP S/T II", credits: 3, keywords: []},
  { id: "2541169", name: "HIST ANIMATION", credits: 3, keywords: []},
  { id: "5501214", name: "COMM PRES SKIL", credits: 3, keywords: []}
]
const courseDict: Record<string, Course> = {}

for (const course of courses) {
  courseDict[course.id] = course;
}

export function getCourseFromId(courseId: string): Course | null {
  return courseDict[courseId.trim()] ?? null;
}