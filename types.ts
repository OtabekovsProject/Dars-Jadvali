export interface ClassSession {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  teacher?: string;
  room?: string;
  color: string;
}

export interface DaySchedule {
  dayId: string; // e.g., 'monday', 'tuesday'
  dayName: string; // e.g., 'Dushanba'
  classes: ClassSession[];
}

export type WeekSchedule = DaySchedule[];

export enum Days {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday'
}