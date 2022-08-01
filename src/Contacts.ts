import InsightlyHTTPRequest from './utils/http';
import buildUrlParams from './utils/buildUrlParams';
import { Contact, Email, FileAttachment, InsightlyDate, InsightlyEvent, Link, Note, Tag, Task } from './types';

async function getContacts(apiKey: string, apiUrl: string, brief?: boolean, skip?: number, top?: number, countTotal?: boolean): Promise<Contact[]> {
    countTotal = !!countTotal;
    const request = new InsightlyHTTPRequest(apiKey, apiUrl, countTotal);
    const params = buildUrlParams({ brief: !!brief }, { skip }, { top }, { count_total: countTotal });
    return await request.get(`/Contacts${params}`);
}

// TODO: options

async function getContact(apiKey: string, apiUrl: string, contactId: number): Promise<Contact> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.get(`/Contacts/${contactId}`);
}

async function getContactDates(apiKey: string, apiUrl: string, contactId: number): Promise<InsightlyDate[]> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.get(`/Contacts/${contactId}/Dates`);
}

async function getContactEmails(
    apiKey: string,
    apiUrl: string,
    contactId: number,
    updatedAfterUtc?: string,
    top?: number,
    skip?: number,
    brief?: boolean,
    countTotal?: boolean,
): Promise<Email[]> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    countTotal = !!countTotal;
    const request = new InsightlyHTTPRequest(apiKey, apiUrl, countTotal);
    const params = buildUrlParams({ updated_after_utc: updatedAfterUtc }, { skip }, { top }, { count_total: countTotal }, { brief: !!brief });
    return await request.get(`/Contacts/${contactId}/Emails${params}`);
}

async function getContactEvents(
    apiKey: string,
    apiUrl: string,
    contactId: number,
    updatedAfterUtc?: string,
    top?: number,
    skip?: number,
    brief?: boolean,
    countTotal?: boolean,
): Promise<InsightlyEvent[]> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    countTotal = !!countTotal;
    const request = new InsightlyHTTPRequest(apiKey, apiUrl, countTotal);
    const params = buildUrlParams({ updated_after_utc: updatedAfterUtc }, { skip }, { top }, { count_total: countTotal }, { brief: !!brief });
    return await request.get(`/Contacts/${contactId}/Events${params}`);
}

async function getContactFileAttachments(
    apiKey: string,
    apiUrl: string,
    contactId: number,
    updatedAfterUtc?: string,
    skip?: number,
    top?: number,
    countTotal?: boolean,
): Promise<FileAttachment[]> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    countTotal = !!countTotal;
    const request = new InsightlyHTTPRequest(apiKey, apiUrl, countTotal);
    const params = buildUrlParams({ updated_after_utc: updatedAfterUtc }, { skip }, { top }, { count_total: countTotal });
    return await request.get(`/Contacts/${contactId}/FileAttachments${params}`);
}

async function getContactFollowState(apiKey: string, apiUrl: string, contactId: number): Promise<{ FOLLOWING: boolean }> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.get(`/Contacts/${contactId}/Follow`);
}

// TODO: getContactImage - what data is returned from api?
// TODO: getContactCustomImageField - what data is returned from api?

async function getContactLinks(apiKey: string, apiUrl: string, contactId: number): Promise<Link[]> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.get(`/Contacts/${contactId}/Links`);
}

// getListOfContactNotes - what data is returned from api?
// list of notes of a contact

async function getContactNotes(
    apiKey: string,
    apiUrl: string,
    contactId: number,
    updatedAfterUtc?: string,
    top?: number,
    skip?: number,
    brief?: boolean,
    countTotal?: boolean,
): Promise<Note[]> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    countTotal = !!countTotal;
    const request = new InsightlyHTTPRequest(apiKey, apiUrl, countTotal);
    const params = buildUrlParams({ updated_after_utc: updatedAfterUtc }, { skip }, { top }, { count_total: countTotal }, { brief: !!brief });
    return await request.get(`/Contacts/${contactId}/Notes${params}`);
}

async function getContactTags(apiKey: string, apiUrl: string, contactId: number): Promise<Tag[]> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.get(`/Contacts/${contactId}/Tags`);
}

async function getContactTasks(
    apiKey: string,
    apiUrl: string,
    contactId: number,
    updatedAfterUtc?: string,
    top?: number,
    skip?: number,
    brief?: boolean,
    countTotal?: boolean,
): Promise<Task[]> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    countTotal = !!countTotal;
    const request = new InsightlyHTTPRequest(apiKey, apiUrl, countTotal);
    const params = buildUrlParams({ updated_after_utc: updatedAfterUtc }, { skip }, { top }, { count_total: countTotal }, { brief: !!brief });
    return await request.get(`/Contacts/${contactId}/Tasks${params}`);
}

async function searchContacts(
    apiKey: string,
    apiUrl: string,
    query: { [index: string]: string }, // field_name: field_value
    top?: number,
    skip?: number,
    countTotal?: boolean,
): Promise<Contact[]> {
    if (!query) {
        throw new Error('InsightlyJS: Query is required');
    }
    countTotal = !!countTotal;
    const request = new InsightlyHTTPRequest(apiKey, apiUrl, countTotal);
    const params = buildUrlParams(query, { skip }, { top }, { count_total: countTotal });

    return await request.get(`/Contacts/Search${params}`);
}

async function searchContactsByTag(
    apiKey: string,
    apiUrl: string,
    tagName: string,
    brief?: boolean,
    top?: number,
    skip?: number,
    countTotal?: boolean,
): Promise<Contact[]> {
    if (!tagName) {
        throw new Error('InsightlyJS: Tag name is required');
    }
    countTotal = !!countTotal;
    const request = new InsightlyHTTPRequest(apiKey, apiUrl, countTotal);
    const params = buildUrlParams({ tag_name: tagName }, { brief }, { skip }, { top }, { count_total: countTotal });
    return await request.get(`/Contacts/SearchByTag${params}`);
}

// TODO: add, update, delete operations

export {
    getContacts,
    getContact,
    getContactDates,
    getContactEmails,
    getContactEvents,
    getContactFileAttachments,
    getContactFollowState,
    getContactLinks,
    getContactNotes,
    getContactTags,
    getContactTasks,
    searchContacts,
    searchContactsByTag,
};
