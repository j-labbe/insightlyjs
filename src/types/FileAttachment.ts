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

export default FileAttachment;