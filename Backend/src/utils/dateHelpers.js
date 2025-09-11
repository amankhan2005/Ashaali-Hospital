// utils/dateHelpers.js
import { addDays, format, parseISO } from "date-fns";

/**
 * availableDays: ["Monday","Wednesday"...]
 * returns array of ISO date strings for next `days` days where weekday matches availableDays
 */
export function nextAvailableDates(availableDays = [], days = 30) {
  const result = [];
  const weekDaysMap = {
    Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6
  };

  const today = new Date();
  for (let i = 0; i < days; i++) {
    const d = addDays(today, i);
    const name = d.toLocaleDateString("en-US", { weekday: "long" }); // "Monday"
    if (availableDays.includes(name)) {
      // return as yyyy-MM-dd
      result.push(format(d, "yyyy-MM-dd"));
    }
  }
  return result;
}
