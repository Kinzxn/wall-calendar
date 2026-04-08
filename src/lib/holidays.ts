export interface Holiday {
  name: string;
  emoji: string;
}

// Key format: "MM-DD"
export const HOLIDAYS: Record<string, Holiday> = {
  "01-01": { name: "New Year's Day", emoji: "🎆" },
  "01-15": { name: "MLK Day", emoji: "✊" },
  "02-02": { name: "Groundhog Day", emoji: "🐿️" },
  "02-14": { name: "Valentine's Day", emoji: "❤️" },
  "03-17": { name: "St. Patrick's Day", emoji: "🍀" },
  "04-01": { name: "April Fools' Day", emoji: "🃏" },
  "04-22": { name: "Earth Day", emoji: "🌍" },
  "05-01": { name: "May Day", emoji: "🌺" },
  "05-05": { name: "Cinco de Mayo", emoji: "🎉" },
  "06-19": { name: "Juneteenth", emoji: "✊" },
  "06-21": { name: "Summer Solstice", emoji: "☀️" },
  "07-04": { name: "Independence Day", emoji: "🇺🇸" },
  "08-26": { name: "Women's Equality Day", emoji: "♀️" },
  "09-22": { name: "Autumn Equinox", emoji: "🍂" },
  "10-31": { name: "Halloween", emoji: "🎃" },
  "11-11": { name: "Veterans Day", emoji: "🎖️" },
  "11-28": { name: "Thanksgiving (est.)", emoji: "🦃" },
  "12-24": { name: "Christmas Eve", emoji: "🎁" },
  "12-25": { name: "Christmas Day", emoji: "🎄" },
  "12-31": { name: "New Year's Eve", emoji: "🥂" },
};

export function getHoliday(month: number, day: number): Holiday | null {
  const key = `${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return HOLIDAYS[key] ?? null;
}
