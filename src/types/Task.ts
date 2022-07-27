import CustomField from './CustomField';

interface Task {
    TASK_ID: number;
    TITLE: string;
    CATEGORY_ID: number;
    DUE_DATE: string;
    COMPLETED: boolean;
    DETAILS: string;
    PRIORITY: number;
    PERCENT_COMPLETE: number;
    START_DATE: string; // utc
    MILESTONE_ID: number;
    RESPONSIBLE_USER_ID: number;
    OWNER_USER_ID: number;
    EMAIL_ID: number;
    PROJECT_ID: number;
    REMINDER_DATE_UTC: string;
    OWNER_VISIBLE: boolean;
    PARENT_TASK_ID: number;
    RECURRENCE: string;
    OPPORTUNITY_ID: number;
    ASSIGNED_TEAM_ID: number;
    CUSTOMFIELDS: CustomField[];
}

export default Task;