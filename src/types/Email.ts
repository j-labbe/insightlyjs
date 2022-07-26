import Tag from './Tag';
import Link from './Link';

interface Email {
    EMAIL_ID: number;
    EMAIL_FROM: string;
    EMAIL_TO: string;
    EMAIL_DATE_UTC: string;
    FORMAT: string;
    SIZE: number;
    OWNER_USER_ID: number;
    DATE_CREATED_UTC: string;
    QUEUED_SEND_DATE_UTC: string;
    CREATED_USER_ID: number;
    TAGS: Tag[];
    LINKS: Link[];
}

export default Email;
