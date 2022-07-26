import InsightlyHTTPRequest from './utils/http';
import buildUrlParams from './utils/buildUrlParams';
import { Contact, Email, FileAttachment, InsightlyDate, InsightlyEvent, Link, Note } from './types';

async function getContacts(apiKey: string, apiUrl: string, brief?: boolean, skip?: number, top?: number, countTotal?: boolean): Promise<Contact[]> {
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    const params = buildUrlParams({ brief: !!brief }, { skip }, { top }, { count_total: !!countTotal });
    return await request.get(`/Contacts${params}`);
}

// TODO: options

async function getContact(apiKey: string, apiUrl: string, contactId: number): Promise<Contact> {
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.get(`/Contacts/${contactId}`);
}

async function getContactDates(apiKey: string, apiUrl: string, contactId: number): Promise<InsightlyDate[]> {
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
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    const params = buildUrlParams({ updated_after_utc: updatedAfterUtc }, { skip }, { top }, { count_total: !!countTotal }, { brief: !!brief });
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
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    const params = buildUrlParams({ updated_after_utc: updatedAfterUtc }, { skip }, { top }, { count_total: !!countTotal }, { brief: !!brief });
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
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    const params = buildUrlParams({ updated_after_utc: updatedAfterUtc }, { skip }, { top }, { count_total: !!countTotal });
    return await request.get(`/Contacts/${contactId}/FileAttachments${params}`);
}

async function getContactFollowState(apiKey: string, apiUrl: string, contactId: number): Promise<{ FOLLOWING: boolean }> {
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.get(`/Contacts/${contactId}/Follow`);
}

// TODO: getContactImage - what data is returned from api?
// TODO: getContactCustomImageField - what data is returned from api?

async function getContactLinks(apiKey: string, apiUrl: string, contactId: number): Promise<Link[]> {
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.get(`/Contacts/${contactId}/Links`);
}

// getListOfContactNotes - what data is returned from api?
// list of notes of a contact

async function getContactNotes(apiKey: string, apiUrl: string, contactId: number): Promise<Note[]> {
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.get(`/Contacts/${contactId}/Notes`);
}
