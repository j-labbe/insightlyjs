import { Activity, ActivityAssignment } from './Activity';

interface ActivitySet {
    ACTIVITYSET_ID: number;
    NAME: string;
    FOR_CONTACTS: boolean;
    FOR_ORGANISATIONS: boolean;
    FOR_OPPORTUNITIES: boolean;
    FOR_LEADS: boolean;
    OWNER_USER_ID: number;
    ACTIVITIES: Activity[] | null;
}

interface ActivitySetAssignment {
    ACTIVITYSET_ID: number;
    START_DATE: string;
    END_DATE: string;
    ACTIVITY_ASSIGNMENTS: ActivityAssignment[];
}

export { ActivitySet, ActivitySetAssignment };
