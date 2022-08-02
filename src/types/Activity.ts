interface Activity {
    ACTIVITY_ID: number;
    ACTIVITYSET_ID: number;
    ACTIVITY_NAME: string;
    ACTIVITY_DETAILS: string;
    ACTIVITY_TYPE: string;
    CATEGORY_ID: number;
    REMINDER: boolean;
    REMINDER_DAYS_BEFORE_DUE: number;
    REMINDER_TIME: string;
    PUBLICLY_VISIBLE: boolean;
    OWNER_VISIBLE: boolean;
    OWNER_USER_ID: number;
    RESPONSIBLE_USER_ID: number;
    ASSIGNED_TEAM_ID: number;
    SKIP_SUN: boolean;
    SKIP_MON: boolean;
    SKIP_TUE: boolean;
    SKIP_WED: boolean;
    SKIP_THU: boolean;
    SKIP_FRI: boolean;
    SKIP_SAT: boolean;
    DUE_DAYS_AFTER_START: number;
    DUE_DAYS_BEFORE_END: number;
    EVENT_DAYS_AFTER_START: number;
    EVENT_DAYS_BEFORE_END: number;
    EVENT_TIME: string;
    ALL_DAY: boolean;
    DURATION: number;
}

interface ActivityAssignment {
    ACTIVITY_ID: number;
    RESPONSIBLE_USER_ID: number;
    ASSIGNED_TEAM_ID: number;
}

export { Activity, ActivityAssignment };