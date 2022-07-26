import CustomField from './CustomField';

interface InsightlyEvent {
    EVENT_ID: number;
    TITLE: string;
    LOCATION: string;
    START_DATE_UTC: string;
    END_DATE_UTC: string;
    ALL_DAY: boolean;
    DETAILS: string;
    DATE_CREATED_UTC: string;
    DATE_UPDATED_UTC: string;
    REMINDER_DATE_UTC: string;
    REMINDER_SENT: boolean;
    OWNER_USER_ID: number;
    CUSTOMFIELDS: CustomField[];
}

export default InsightlyEvent;
