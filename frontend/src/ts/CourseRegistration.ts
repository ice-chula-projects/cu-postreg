export type Row = {
  id: string;
  isSaved: boolean;
  courseId: string;
  courseName: string | null;
  section: number | null;
  sectionModifier: string;
  sectionSecondary: number | null;
  credits: number | null;
  cancelled: boolean;
}