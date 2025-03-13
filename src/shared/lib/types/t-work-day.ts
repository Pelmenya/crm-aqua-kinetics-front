import { TNullable } from "./t-nullable";

export type TWorkDay = {
    id?: string;
    date: TNullable<string>;
    dayOfWeek?: number;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    isDeleted?: boolean;
}
