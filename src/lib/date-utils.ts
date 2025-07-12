export function getYear() {
  return new Date().getFullYear();
}

export function getSeason() {
  const month = new Date().getMonth();
  if (month < 3) return 'WINTER';
  if (month < 6) return 'SPRING';
  if (month < 9) return 'SUMMER';
  return 'FALL';
}

function toFuzzyDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return parseInt(`${year}${month}${day}`);
}


export function getNextWeek() {
    const today = new Date();
    const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    return {
        start: toFuzzyDate(today),
        end: toFuzzyDate(nextWeek),
    };
}


export function getNextMonth() {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
     return {
        start: toFuzzyDate(today),
        end: toFuzzyDate(nextMonth),
    };
}

export function getWeekDays(): Date[] {
  const base = new Date();
  const week = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(base);
    day.setDate(base.getDate() + i);
    week.push(day);
  }
  return week;
}

export function getDayOfWeek(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

export function formatAiringTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}
