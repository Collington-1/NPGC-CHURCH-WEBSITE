// Weekly YouTube livestream schedule, all times in Africa/Lagos (WAT,
// UTC+1 year-round — no DST to worry about).
export type LiveWindow = {
  days: number[]; // 0 = Sunday ... 6 = Saturday
  startMinutes: number; // minutes since midnight
  endMinutes: number;
  label: string;
};

function hm(hours: number, minutes: number) {
  return hours * 60 + minutes;
}

export const liveWindows: LiveWindow[] = [
  {
    days: [1, 2, 3, 4, 5], // Monday - Friday
    startMinutes: hm(6, 0),
    endMinutes: hm(6, 55),
    label: "Prophetic Prayer Rain",
  },
  {
    days: [0], // Sunday
    startMinutes: hm(9, 0),
    endMinutes: hm(12, 0),
    label: "Sunday Service",
  },
  {
    days: [2], // Tuesday
    startMinutes: hm(17, 30),
    endMinutes: hm(20, 0),
    label: "Bible Study",
  },
];

const weekdayIndex: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function getLagosParts(date: Date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Lagos",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value])
  );
  const day = weekdayIndex[parts.weekday] ?? 0;
  let hour = parseInt(parts.hour, 10);
  if (hour === 24) hour = 0;
  const minute = parseInt(parts.minute, 10);
  return { day, minutes: hour * 60 + minute };
}

export function getActiveScheduledWindow(date: Date = new Date()): LiveWindow | null {
  const { day, minutes } = getLagosParts(date);
  return (
    liveWindows.find(
      (w) => w.days.includes(day) && minutes >= w.startMinutes && minutes < w.endMinutes
    ) ?? null
  );
}
