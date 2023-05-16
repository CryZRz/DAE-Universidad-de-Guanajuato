export interface ScheduleIn {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    courseId: number
}

export interface ScheduleRowIn {
    id: string | number;
    startTime: string;
    endTime: string;
    courseId: number;
}

export interface ScheduleTableIn {
    name: string;
    rows: ScheduleRowIn[];
}