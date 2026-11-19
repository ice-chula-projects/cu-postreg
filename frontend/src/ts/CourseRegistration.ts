export type Row = {
  id: string;
  isSaved: boolean;
  courseId: string;
  section: number | null;
  sectionModifier: string;
  sectionSecondary: number | null;
  cancelled: boolean;
}

export type SavedRow = Omit<Row, 'id' | 'cancelled'>