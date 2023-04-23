import { UUID } from "crypto";
import { pgTimestamp } from "../types/pgTimestamp";

export interface Administrator {
    admin_id?: UUID;
    username: string;
    password: string;
    created?: pgTimestamp;
}