import Activity from './Activity';

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

export default ActivitySet;
