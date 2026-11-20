export interface Course {
  id: string,
  name: string,
  credits: number,
  keywords: string[] //used for search
}

export const courses: Course[] = [
  // Year 1, First Semester
  { id: "2140111", name: "EXPL ENG WORLD", credits: 3, keywords: ["Exploring", "Explore", "Engineering", "World", "EEW"]},
  { id: "2190101", name: "COMP PROG", credits: 3, keywords: ["Computer", "Programming", "Comprog", "Python"]},
  { id: "2301107", name: "CALCULUS I", credits: 3, keywords: []},
  { id: "2304153", name: "PHYSICS ENGS", credits: 3, keywords: ["General", "Engineers", "Mechanics"]},
  { id: "2304193", name: "PHYSICS LAB ENGS", credits: 1, keywords: ["General", "Laboratory", "Engineers", "Mechanics"]},
  { id: "5501112", name: "COMM ENG I", credits: 3, keywords: ["Communicative", "English"] },
  // Year 1, Second Semester
  { id: "2143101", name: "INTRO ICE", credits: 3, keywords: ["Introduction"]},
  { id: "2182205", name: "PROB STAT DATA", credits: 3, keywords: ["Probability", "Statistics", "Data", "Analysis", "Charnchai"]},
  { id: "2190103", name: "ADV COMP PROG", credits: 3, keywords: ["Advanced", "Computer", "Programming", "Java"]},
  { id: "2301108", name: "CALCULUS II", credits: 3, keywords: ["Multivariable"]},
  { id: "2304154", name: "PHYS ELEC ENGS", credits: 3, keywords: ["General", "Physics", "Electronics", "Engineers"]},
  { id: "2304194", name: "PHYS ELEC LAB ENGS", credits: 1, keywords: ["General", "Physics", "Electronics", "Laboratory", "Engineers"]},
  { id: "5501123", name: "COMM ENG II", credits: 3, keywords: ["Communicative", "English"] },
  // Year 2, First Semester
  { id: "2182202", name: "ADV MATH METH", credits: 3, keywords: ["Advanced", "Mathematics", "Methods", "Calculus", "Complex", "Charnchai"] },
  { id: "2182212", name: "CIR DIG ELEC LAB", credits: 1, keywords: ["Electrical", "Circuit", "Digital", "Electronics", "Laboratory"] },
  { id: "2182214", name: "ELEC CIR ICE", credits: 3, keywords: ["Electrical", "Circuit"] },
  { id: "2190200", name: "DISCRETE STRUC", credits: 3, keywords: ["Structures", "Math", "Mathematics"] },
  { id: '2190222', name: 'FUND DS ALG', credits: 4, keywords: ["Fundamental", "Datastructures", "Algorithms", "DSA", "Java"] },
  { id: '2190513', name: 'DATA SCI', credits: 3, keywords: ["Data", "Science", "Python"] },
  // Year 2, Second Semester
  { id: "2182204", name: "SIG LIN SYS", credits: 3, keywords: ["Signals", "Processing", "Linear", "Systems", "Charnchai"] },
  { id: "2190512", name: "APP DEV", credits: 3, keywords: ["Application", "Development", "TypeScript"] },
  { id: "2190514", name: "AI", credits: 3, keywords: ["Artificial", "Intelligence", "Symbolic", "Prolog"] },
  { id: "5501214", name: "COMM PRES SKIL", credits: 3, keywords: ["Communication", "Presentation", "Skills", "English"] },
  // Year 3, First Semester
  { id: '2190472', name: 'NETCENT ARCH', credits: 3, keywords: ["Netcentric", "Architecture"] },
  { id: '2190443', name: 'USER INT DSGN', credits: 3, keywords: ["User", "Interface", "Design", "UI"] },
  { id: '2184301', name: 'ENG ECON APP', credits: 3, keywords: ["Engineering", "Economy", "Applications"] },
  { id: '2182372', name: 'PRIN TELECOMM', credits: 3, keywords: ["Principles", "Telecommunications", "Tele", "Communications"] },
  { id: '2190250', name: 'COMP ARCH ORG', credits: 3, keywords: ["Computer", "Architecture", "Organization"] },
  // GenEd courses
  { id: "2541169", name: "HIST ANIMATION", credits: 3, keywords: ["History", "Animation"] },
  { id: "2541154", name: "COLOR AESTHETICS", credits: 3, keywords: [] },
  { id: "0294470", name: "COMM SUST", credits: 3, keywords: ["Communication", "Sustainability"] },
  { id: "3914101", name: "REC QUAL LIFE DEV", credits: 3, keywords: ["Recreation", "Quality", "Development"] },
  { id: "5600188", name: "QUAN COMP EMG TECH", credits: 3, keywords: ["Quantum", "Computing", "Emerging", "Technologies"] },
  // Electives
  { id: '2190523', name: 'GAME DESIGN', credits: 3, keywords: [] },
  { id: '2190519', name: 'NLP', credits: 3, keywords: ["Natural", "Language", "Processing", "AI"] },
  // Free electives
  { id: "2223021", name: "COM JAP S/T I", credits: 3, keywords: ["Communicative", "Japanese"] },
  { id: "2223022", name: "COM JAP S/T II", credits: 3, keywords: ["Communicative", "Japanese"] },
]
const courseDict: Record<string, Course> = {}

for (const course of courses) {
  courseDict[course.id] = course;
}

export function getCourseFromId(courseId: string): Course | null {
  return courseDict[courseId.trim()] ?? null;
}