import { UUID } from "crypto";
import { pgTimestamp } from "../types/pgTimestamp";

export interface Contact {
    contact_id?: UUID;
    address?: string | null;
    district?: string | null;
    city?: string | null;
    postal_code?: number | null;
    phone?: string | null;
    emergency_contact?: string | null;
    created?: pgTimestamp;
}