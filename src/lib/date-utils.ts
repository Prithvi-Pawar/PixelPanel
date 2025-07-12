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