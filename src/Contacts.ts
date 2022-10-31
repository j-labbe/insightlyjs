// Left off at Update a Link

import InsightlyHTTPRequest from './utils/http';
import buildUrlParams from './utils/buildUrlParams';
import {
    Contact,
    ValidContact,
    ValidContactWithTags,
    Email,
    FileAttachment,
    InsightlyDate,
    InsightlyEvent,
    Link,
    Note,
    Tag,
    Task,
    ActivitySetAssignment,
} from './types';
import { isIso } from './utils/validators';
import capitalize from './utils/capitalizeKeys';

async function getContacts(
    apiKey: string,
    apiUrl: string,
    brief?: boolean,
    skip?: number,
    top?: number,
    countTotal?: boolean,
): Promise<ValidContact[]> {
    countTotal = !!countTotal;
    const request = new InsightlyHTTPRequest(apiKey, apiUrl, countTotal);
    const params = buildUrlParams({ brief: !!brief }, { skip }, { top }, { count_total: countTotal });
    return await request.get(`/Contacts${params}`);
}

// TODO: options

async function getContact(apiKey: string, apiUrl: string, contactId: number): Promise<ValidContact> {
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
    if (updatedAfterUtc && !isIso(updatedAfterUtc)) {
        throw new Error('InsightlyJS: updatedAfterUtc must be a valid ISO 8601 date string');
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
    if (updatedAfterUtc && !isIso(updatedAfterUtc)) {
        throw new Error('InsightlyJS: updatedAfterUtc must be a valid ISO 8601 date string');
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
    if (updatedAfterUtc && !isIso(updatedAfterUtc)) {
        throw new Error('InsightlyJS: updatedAfterUtc must be a valid ISO 8601 date string');
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
    if (updatedAfterUtc && !isIso(updatedAfterUtc)) {
        throw new Error('InsightlyJS: updatedAfterUtc must be a valid ISO 8601 date string');
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
    if (updatedAfterUtc && !isIso(updatedAfterUtc)) {
        throw new Error('InsightlyJS: updatedAfterUtc must be a valid ISO 8601 date string');
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
): Promise<ValidContact[]> {
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
): Promise<ValidContactWithTags[]> {
    if (!tagName) {
        throw new Error('InsightlyJS: Tag name is required');
    }
    countTotal = !!countTotal;
    const request = new InsightlyHTTPRequest(apiKey, apiUrl, countTotal);
    const params = buildUrlParams({ tag_name: tagName }, { brief }, { skip }, { top }, { count_total: countTotal });
    return await request.get(`/Contacts/SearchByTag${params}`);
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE operations
//////////////////////////////////////////////////////////////////////////////////////////////////

async function addContact(apiKey: string, apiUrl: string, contact: Contact): Promise<ValidContact> {
    if (!contact) {
        throw new Error('InsightlyJS: Contact is required');
    }

    contact = capitalize(contact);

    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.post('/Contacts', JSON.stringify(contact));
}

/**
 * @see https://github.com/j-labbe/insightlyjs/issues/6
 */
async function addActivitySet(
    apiKey: string,
    apiUrl: string,
    contactId: number,
    activitySetAssignment: ActivitySetAssignment,
): Promise<ActivitySetAssignment> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    if (!activitySetAssignment) {
        throw new Error('InsightlyJS: Activity Set ID is required');
    }

    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.post(`/Contacts/${contactId}/ActivitySetAssignment`, JSON.stringify(activitySetAssignment));
}

/**
 * @todo TODO: check this implementation - it might be wrong
 * @ignore (temporary)
 * @deprecated - do not use until I can confirm this implementation is correct
 */
async function addFileAttachment(apiKey: string, apiUrl: string, contactId: number, fileAttachment: File): Promise<FileAttachment> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    if (!fileAttachment) {
        throw new Error('InsightlyJS: File Attachment is required');
    }
    const formData = new FormData();
    formData.append('file', fileAttachment);

    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.post(`/Contacts/${contactId}/FileAttachments`, formData);
}

/**
 * Make the API user follow a contact
 */
async function apiUserFollowContact(apiKey: string, apiUrl: string, contactId: number): Promise<boolean> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    const response = await request.post(`/Contacts/${contactId}/Follow`, null);
    return JSON.parse(response)?.FOLLOWING || response?.FOLLOWING;
}

async function addLink(apiKey: string, apiUrl: string, contactId: number, link: Link): Promise<Link> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    if (!link) {
        throw new Error('InsightlyJS: Link is required');
    }
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.post(`/Contacts/${contactId}/Links`, JSON.stringify(link));
}

/**
 * @todo TODO: check this implementation - it might be wrong
 * @ignore (temporary)
 * @deprecated - do not use until I can confirm this implementation is correct
 * @see - https://api.na1.insightly.com/v3.1/#!/Contacts/AddNotes
 */
async function addNote(apiKey: string, apiUrl: string, contactId: number, note: Note): Promise<Note> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    if (!note) {
        throw new Error('InsightlyJS: Note is required');
    }
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.post(`/Contacts/${contactId}/Notes`, JSON.stringify(note));
}

async function addTag(apiKey: string, apiUrl: string, contactId: number, tagName: string): Promise<Tag> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    if (!tagName) {
        throw new Error('InsightlyJS: Tag name is required');
    }
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.post(`/Contacts/${contactId}/Tags`, JSON.stringify({ TAG_NAME: tagName }));
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE operations
//////////////////////////////////////////////////////////////////////////////////////////////////

async function updateContact(apiKey: string, apiUrl: string, contactId: number, contact: Contact): Promise<ValidContact> {
    if (!contact) {
        throw new Error('InsightlyJS: Contact is required');
    }

    contact = capitalize(contact);

    if (contact.CONTACT_ID) {
        delete contact.CONTACT_ID;
    }

    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.put(`/Contacts/${contactId}`, JSON.stringify(contact));
}

async function updateDate(apiKey: string, apiUrl: string, contactId: number, date: InsightlyDate): Promise<InsightlyDate> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    if (!date) {
        throw new Error('InsightlyJS: Date object is required');
    }
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.put(`/Contacts/${contactId}/Dates`, JSON.stringify(date));
}

/**
 * @deprecated - do not use until I can confirm this implementation is correct
 * @see - https://api.na1.insightly.com/v3.1/#!/Contacts/UpdateImage
 */
async function updateImage(apiKey: string, apiUrl: string, contactId: number, fileName: string, image: File): Promise<boolean> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }
    if (!fileName) {
        throw new Error('InsightlyJS: File name is required');
    }
    if (!image) {
        throw new Error('InsightlyJS: Image is required');
    }
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.put(`/Contacts/${contactId}/Image/${fileName}`, image);
}


// Documentation for this is unclear

// async function updateLink(apiKey: string, apiUrl: string, contactId: number, linkId: number, link: Link): Promise<Link> {
//     if (!contactId) {
//         throw new Error('InsightlyJS: Contact ID is required');
//     }
//     if (!linkId) {
//         throw new Error('InsightlyJS: Link ID is required');
//     }
//     if (!link) {
//         throw new Error('InsightlyJS: Link is required');
//     }
//     const request = new InsightlyHTTPRequest(apiKey, apiUrl);
//     return await request.put(`/Contacts/${contactId}/Links/${linkId}`, JSON.stringify(link));
// }

//////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE operations
//////////////////////////////////////////////////////////////////////////////////////////////////

async function deleteContact(apiKey: string, apiUrl: string, contactId: number): Promise<boolean> {
    if (!contactId) {
        throw new Error('InsightlyJS: Contact ID is required');
    }

    const request = new InsightlyHTTPRequest(apiKey, apiUrl);
    return await request.delete(`/Contacts/${contactId}`);
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
    addContact,
    updateContact,
    deleteContact,
    apiUserFollowContact,
    addLink,
    addNote,
    addTag,
    updateDate,
    updateImage,
    // TODO: there are other functions defined above not exported here
};
