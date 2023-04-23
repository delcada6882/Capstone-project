import { UUID } from 'crypto';
import { pgTimestamp } from '../types/pgTimestamp';

export interface Assignment {
    assignment_id?: UUID;
    student_id: UUID;
    class_id: UUID;
    created?: pgTimestamp;
}
