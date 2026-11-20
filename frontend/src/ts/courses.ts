export interface Course {
  id: string,
  name: string,
  credits: number,
  keywords: string[] //used for search
}

export const courses: Course[] = [
  { id: '2190222', name: 'FUND DS ALG', credits: 4 , keywords: ["Fundamental", "Datastructures", "Algorithms", "DSA"]},
  { id: '2190523', name: 'GAME DESIGN', credits: 3 , keywords: []},
  { id: '2190472', name: 'NETCENT ARCH', credits: 3, keywords: ["Netcentric", "Architecture"] },
  { id: '2190443', name: 'USER INT DSGN', credits: 3, keywords: ["User", "Interface", "Design", "UI"] },
  { id: '2184301', name: 'ENG ECON APP', credits: 3, keywords: ["Engineering", "Economy", "Applications"] },
]

const courseDict: Record<string, Course> = {}

for (const course of courses){
  courseDict[course.id] = course;
}

export function getCourseFromId(courseId: string): Course | null {
  return courseDict[courseId.trim()] ?? null;
}