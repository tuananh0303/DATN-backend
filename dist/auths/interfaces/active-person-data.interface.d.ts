import { UUID } from 'crypto';
export interface ActivePersonData {
    sub: UUID;
    role: string;
}
