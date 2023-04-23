import { UUID } from 'crypto';
import { pgTimestamp } from '../types/pgTimestamp';

export interface Student {
    student_id?: UUID;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    verified?: boolean | null;
    contact?: UUID | null;
    created?: pgTimestamp;
}
