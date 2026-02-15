import { WeekSchedule, Days } from './types';

export const INITIAL_SCHEDULE: WeekSchedule = [
  {
    dayId: Days.MONDAY,
    dayName: 'Dushanba',
    classes: [
      { id: '1', subject: 'Matematika', startTime: '08:00', endTime: '08:45', teacher: 'Azizova N.', room: '101', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
      { id: '2', subject: 'Ona tili', startTime: '08:55', endTime: '09:40', teacher: 'Karimov B.', room: '203', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    ]
  },
  {
    dayId: Days.TUESDAY,
    dayName: 'Seshanba',
    classes: [
      { id: '3', subject: 'Ingliz tili', startTime: '08:00', endTime: '08:45', teacher: 'Smith J.', room: '305', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
    ]
  },
  {
    dayId: Days.WEDNESDAY,
    dayName: 'Chorshanba',
    classes: []
  },
  {
    dayId: Days.THURSDAY,
    dayName: 'Payshanba',
    classes: []
  },
  {
    dayId: Days.FRIDAY,
    dayName: 'Juma',
    classes: []
  },
  {
    dayId: Days.SATURDAY,
    dayName: 'Shanba',
    classes: []
  }
];

export const CLASS_COLORS = [
  { label: 'Moviy', value: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { label: 'Yashil', value: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' },
  { label: 'Qizil', value: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  { label: 'Sariq', value: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' },
  { label: 'Binafsha', value: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200' },
  { label: 'Pushti', value: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' },
  { label: 'Kulrang', value: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200' },
  { label: 'To\'q sariq', value: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
];