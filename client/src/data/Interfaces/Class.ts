import { UUID } from 'crypto';
import { pgTimestamp } from '../types/pgTimestamp';
import { pgTime } from '../types/pgTime';

export interface Class {
    class_id?: UUID;
    name: string;
    subject?: string | null;
    teacher?: string | null;
    description?: string | null;
    credits?: number | null;
    semester?: number | null;
    term?: number | null;
    start_time?: pgTime | null;
    end_time?: pgTime | null;
    students?: number;
    max_student?: number;
    created?: pgTimestamp;
}
