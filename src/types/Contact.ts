import CustomField from './CustomField';
import Tag from './Tag';
import InsightlyDate from './InsightlyDate';
import Link from './Link';

interface Contact {
    CONTACT_ID?: number;
    SALUTATION?: string;
    FIRST_NAME?: string;
    LAST_NAME?: string;
    IMAGE_URL?: string;
    BACKGROUND?: string;
    OWNER_USER_ID?: number;
    DATE_CREATED_UTC?: string;
    DATE_UPDATED_UTC?: string;
    SOCIAL_LINKEDIN?: string;
    SOCIAL_FACEBOOK?: string;
    SOCIAL_TWITTER?: string;
    DATE_OF_BIRTH?: string;
    PHONE?: string;
    PHONE_HOME?: string;
    PHONE_MOBILE?: string;
    PHONE_OTHER?: string;
    PHONE_ASSISTANT?: string;
    PHONE_FAX?: string;
    EMAIL_ADDRESS?: string;
    ASSISTANT_NAME?: string;
    ADDRESS_MAIL_STREET?: string;
    ADDRESS_MAIL_CITY?: string;
    ADDRESS_MAIL_STATE?: string;
    ADDRESS_MAIL_POSTCODE?: string;
    ADDRESS_MAIL_COUNTRY?: string;
    ADDRESS_OTHER_STREET?: string;
    ADDRESS_OTHER_CITY?: string;
    ADDRESS_OTHER_STATE?: string;
    ADDRESS_OTHER_POSTCODE?: string;
    ADDRESS_OTHER_COUNTRY?: string;
    LAST_ACTIVITY_DATE_UTC?: string;
    NEXT_ACTIVITY_DATE_UTC?: string;
    CREATED_USER_ID?: number;
    ORGANISATION_ID?: number;
    TITLE?: string;
    EMAIL_OPTED_OUT?: boolean;
    CUSTOMFIELDS?: CustomField[];
    TAGS?: Tag[];
    DATES?: InsightlyDate[];
    LINKS?: Link[];
}

interface ValidContact extends Contact {
    CONTACT_ID: number;
    FIRST_NAME: string;
}

interface ValidContactWithTags extends ValidContact {
    TAGS: Tag[];
}

export { Contact, ValidContact, ValidContactWithTags };
