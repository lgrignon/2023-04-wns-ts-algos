/**
 * In this challenge, you should compute a week planning split in 1 hour slots
 * and including existing events. To keep it simple, don't work with Dates!
 * Be carefull with leading 0!
 * 
 * Example:
 * Input: [{ day: "Monday", startTime: "09:00", endTime: "11:00", name: "First work day!" }]
 * Output: [
 *     { day: "Monday", startTime: "00:00", "endTime": "01:00"},
 *     { day: "Monday", startTime: "01:00", "endTime": "02:00"},
 *     ...,
 *     { day: "Monday", startTime: "09:00", "endTime": "10:00", event: [Object] },
 *     { day: "Monday", startTime: "10:00", "endTime": "11:00", event: [Object] },
 *     { day: "Monday", startTime: "11:00", "endTime": "12:00" },
 *     ...,
 *     { day: "Sunday", startTime: "23:00", "endTime": "00:00" },
 * ] 
 * 
 * @param events List of event to add on the planning
 * @returns List of planning slots, from Monday 00:00 to Sunday 00:00, 1 hour each slot
 */


function isInHourSlot(event: Event, slotStart: number) {
    const slotStartFormatted = slotStart.toString().padStart(2, "0") + ":00"
    const slotEndFormatted = (slotStart + 1).toString().padStart(2, "0") + ":00"

    const eventEndFormatted = event.endTime.startsWith("00") ? "24:00" : event.endTime;
    return event.startTime <= slotStartFormatted && eventEndFormatted >= slotEndFormatted;
}

// ↓ uncomment bellow lines and add your response!
export default function ({ events }: { events: Event[] }): PlanningSlot[] {

    const eventsByDay = events.reduce((map: { [day: string]: Event[] }, current: Event) => {
        if (!map[current.day]) {
            map[current.day] = [];
        }
        map[current.day].push(current);
        return map;
    }, {})

    const slots: PlanningSlot[] = [];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for (const day of days) {
        for (let i = 0; i <= 23; i++) {
            const slotStartFormatted = i.toString().padStart(2, "0") + ":00"
            const nextHour = i == 23 ? 0 : i + 1;
            const slotEndFormatted = (nextHour).toString().padStart(2, "0") + ":00"

            let event: Event | undefined;
            for (const e of (eventsByDay[day] ?? [])) {
                if (isInHourSlot(e, i)) {
                    event = e;
                }
            }

            slots.push({
                day, startTime: slotStartFormatted, endTime: slotEndFormatted, event
            })
        }
    }

    return slots;
}


// used interfaces, do not touch
export interface Event {
    day: string;
    startTime: string;
    endTime: string;
    name: string;
}

export interface PlanningSlot {
    day: string;
    startTime: string;
    endTime: string;
    event?: Event;
}