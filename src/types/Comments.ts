interface FileAttachment {
    FILE_ID: number;
    FILE_NAME: string;
    CONTENT_TYPE: string;
    FILE_SIZE: number;
    OWNER_USER_ID: number;
    DATE_CREATED_UTC: string;
    DATE_UPDATED_UTC: string;
    URL: string;
}

interface Comment {
    COMMENT_ID: number;
    BODY: string;
    OWNER_USER_ID: number;
    DATE_CREATED_UTC: string;
    DATE_UPDATED_UTC: string;
    NOTE_ID: number;
    TASK_ID: number;
    EMAIL_ID: number;
}

export { FileAttachment, Comment };