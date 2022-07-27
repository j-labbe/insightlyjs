import { ActivitySet, FileAttachment, Comment } from './types';
import runtimeIsCompatible from './utils/runtimeIsCompatible';
import * as ActivitySets from './ActivitySets';
import * as Comments from './Comments';
import * as Contacts from './Contacts';

// TODO: add ISO 8601 date format validation

class InsightlyJS {
    private readonly apiKey: string;
    private readonly apiUrl: string;

    /**
     * Creates a new InsightlyJS instance.
     * @param options.apiKey The API key for the Insightly account
     * @param options.apiUrl The API URL for the Insightly account
     * @throws Error if the runtime is not compatible
     * @info Fetch API polyfills will be used if needed
     */
    constructor(options: { apiKey: string; apiUrl: string }) {
        this.apiKey = options.apiKey;
        this.apiUrl = options.apiUrl;

        runtimeIsCompatible().then((isCompatible) => {
            if (!isCompatible) {
                throw new Error('InsightlyJS is not compatible with this runtime. Please upgrade your browser or Node version (18+).');
            }
        });

        if (!options.apiKey || !options.apiUrl) {
            throw new Error('InsightlyJS: apiKey and apiUrl are required.');
        }

        this.getActivitySetList = this.getActivitySetList.bind(this);
        this.getActivitySet = this.getActivitySet.bind(this);
        this.getCommentFileAttachments = this.getCommentFileAttachments.bind(this);
        this.addCommentFileAttachment = this.addCommentFileAttachment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    /**************************************************************************
     **************************************************************************
     * Activity Sets
     **************************************************************************
     *************************************************************************/

    /**
     * @param options.brief Only return the top level properties of the ActivitySet
     * @param options.skip Number of ActivitySets to skip
     * @param options.top Maximum number of ActivitySets to return
     * @param options.countTotal Return the total number of ActivitySets
     * @see https://api.insightly.com/v3.1/Help#!/ActivitySets/GetActivitySets
     */
    public async getActivitySetList(options?: { brief?: boolean; skip?: number; top?: number; countTotal?: boolean }): Promise<ActivitySet[]> {
        return await ActivitySets.getActivitySetList(this.apiKey, this.apiUrl, options?.brief, options?.skip, options?.top, options?.countTotal);
    }

    /**
     * @param id The ID of the ActivitySet
     * @see https://api.insightly.com/v3.1/Help#!/ActivitySets/GetActivitySet
     */
    public async getActivitySet(id: number): Promise<ActivitySet> {
        return await ActivitySets.getActivitySet(this.apiKey, this.apiUrl, id);
    }

    /**
     * ************************************************************************
     * *************************************************************************
     * Comments
     * *************************************************************************
     * ***********************************************************************
     * @param options.id The ID of the Comment
     * @param options.updatedAfterUtc Earliest date when the file attachment was last updated
     * @param options.skip Number of file attachments to skip
     * @param options.top Maximum number of file attachments to return
     * @param options.countTotal Return the total number of records
     * @see {https} ://api.insightly.com/v3.1/Help#!/Comments/GetFileAttachments
     */
    public async getCommentFileAttachments(options: {
        id: number;
        updatedAfterUtc?: string;
        skip?: number;
        top?: number;
        countTotal?: boolean;
    }): Promise<FileAttachment[]> {
        return await Comments.getFileAttachments(
            this.apiKey,
            this.apiUrl,
            options.id,
            options.updatedAfterUtc,
            options.skip,
            options.top,
            options.countTotal,
        );
    }

    /**
     * @deprecated Not actually deprecated, but testing has not been completed. Use at your own risk.
     * @param id The ID of the Comment
     * @param fileAttachment The file attachment to add
     * @see https://api.insightly.com/v3.1/Help#!/Comments/AddFileAttachment
     */
    public async addCommentFileAttachment(id: number, fileAttachment: FileAttachment): Promise<FileAttachment> {
        return await Comments.addFileAttachment(this.apiKey, this.apiUrl, id, fileAttachment);
    }

    /**
     * @deprecated Not actually deprecated, but testing has not been completed. Use at your own risk.
     * @param id The ID of the Comment
     * @param comment The comment to update
     */
    public async updateComment(id: number, comment: Comment): Promise<Comment> {
        return await Comments.updateComment(this.apiKey, this.apiUrl, id, comment);
    }

    /**
     * @deprecated Not actually deprecated, but testing has not been completed. Use at your own risk.
     * @param id The ID of the Comment
     * @returns {boolean} True if the comment was successfully deleted, false otherwise
     */
    public async deleteComment(id: number): Promise<boolean> {
        return await Comments.deleteComment(this.apiKey, this.apiUrl, id);
    }

    /**************************************************************************
     **************************************************************************
     * Contacts
     **************************************************************************
     *************************************************************************/

    /**
     * @param options.brief (optional) Only return the top level properties of the Contact
     * @param options.skip (optional) Number of Contacts to skip
     * @param options.top (optional) Maximum number of Contacts to return
     * @param options.countTotal (optional) Return the total number of Contacts
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetEntities
     */
     public async getContacts(options?: { brief?: boolean; skip?: number; top?: number; countTotal?: boolean }) {
        return await Contacts.getContacts(this.apiKey, this.apiUrl, options?.brief, options?.skip, options?.top, options?.countTotal);
    }

    /**
     * @param contactId The ID of the Contact
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetEntity
     */
    public async getContact(contactId: number) {
        return await Contacts.getContact(this.apiKey, this.apiUrl, contactId);
    }

    /**
     * 
     * @param contactId The ID of the Contact
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetDates
     */
    public async getContactDates(contactId: number) {
        return await Contacts.getContactDates(this.apiKey, this.apiUrl, contactId);
    }

    /**
     * @param options.contactId The ID of the Contact
     * @param options.updatedAfterUtc (optional) Earliest date when the email was last updated
     * @param options.top (optional) Maximum number of emails to return
     * @param options.skip (optional) Number of emails to skip
     * @param options.countTotal (optional) Return the total number of emails
     * @param options.brief (optional) Only return the top level properties of the Email
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetEmails
     */
    public async getContactEmails(options: {
        contactId: number;
        updatedAfterUtc?: string;
        top?: number;
        skip?: number;
        countTotal?: boolean;
        brief?: boolean;
    }) {
        return await Contacts.getContactEmails(
            this.apiKey,
            this.apiUrl,
            options.contactId,
            options.updatedAfterUtc,
            options.top,
            options.skip,
            options.countTotal,
            options.brief,
        );
    }

    /**
     * @param options.contactId The ID of the Contact
     * @param options.updatedAfterUtc (optional) Earliest date when the event was last updated
     * @param options.top (optional) Maximum number of events to return
     * @param options.skip (optional) Number of events to skip
     * @param options.countTotal (optional) Return the total number of events
     * @param options.brief (optional) Only return the top level properties of the Event
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetEvents
     */
    public async getContactEvents(options: {
        contactId: number;
        updatedAfterUtc?: string;
        top?: number;
        skip?: number;
        countTotal?: boolean;
        brief?: boolean;
    }) {
        return await Contacts.getContactEvents(
            this.apiKey,
            this.apiUrl,
            options.contactId,
            options.updatedAfterUtc,
            options.top,
            options.skip,
            options.countTotal,
            options.brief,
        );
    }

    /**
     * @param options.contactId The ID of the Contact
     * @param options.updatedAfterUtc (optional) Earliest date when the file attachment was last updated
     * @param options.skip (optional) Number of file attachments to skip
     * @param options.top (optional) Maximum number of file attachments to return
     * @param options.countTotal (optional) Return the total number of records
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetFileAttachments
     */
    public async getContactFileAttachments(options: {
        contactId: number;
        updatedAfterUtc?: string;
        top?: number;
        skip?: number;
        countTotal?: boolean;
    }) {
        return await Contacts.getContactFileAttachments(
            this.apiKey,
            this.apiUrl,
            options.contactId,
            options.updatedAfterUtc,
            options.top,
            options.skip,
            options.countTotal,
        );
    }

    /**
     * @param contactId The ID of the Contact
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetFollow
     */
    public async getContactFollowState(contactId: number): Promise<{ FOLLOWING: boolean }> {
        return await Contacts.getContactFollowState(this.apiKey, this.apiUrl, contactId);
    }

    /**
     * @param contactId The ID of the Contact
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetLinks
     */
    public async getContactLinks(contactId: number) {
        return await Contacts.getContactLinks(this.apiKey, this.apiUrl, contactId);
    }

    /**
     * @param options.contactId The ID of the Contact
     * @param options.updatedAfterUtc (optional) Earliest date when the note was last updated
     * @param options.top (optional) Maximum number of notes to return
     * @param options.skip (optional) Number of notes to skip
     * @param options.countTotal (optional) Return the total number of notes
     * @param options.brief (optional) Only return the top level properties of the Note
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetNotes
     */
    public async getContactNotes(options: {
        contactId: number;
        updatedAfterUtc?: string;
        top?: number;
        skip?: number;
        countTotal?: boolean;
        brief?: boolean;
    }) {
        return await Contacts.getContactNotes(
            this.apiKey,
            this.apiUrl,
            options.contactId,
            options.updatedAfterUtc,
            options.top,
            options.skip,
            options?.countTotal,
            options?.brief,
        );
    }

    /**
     * @param contactId The ID of the Contact
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetTags
     */
    public async getContactTags(contactId: number) {
        return await Contacts.getContactTags(this.apiKey, this.apiUrl, contactId);
    }

    /**
     * @param options.contactId The ID of the Contact
     * @param options.updatedAfterUtc (optional) Earliest date when the task was last updated
     * @param options.top (optional) Maximum number of tasks to return
     * @param options.skip (optional) Number of tasks to skip
     * @param options.countTotal (optional) Return the total number of tasks
     * @param options.brief (optional) Only return the top level properties of the Task
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetTasks
     */
    public async getContactTasks(options: {
        contactId: number;
        updatedAfterUtc?: string;
        top?: number;
        skip?: number;
        countTotal?: boolean;
        brief?: boolean;
    }) {
        return await Contacts.getContactTasks(
            this.apiKey,
            this.apiUrl,
            options.contactId,
            options.updatedAfterUtc,
            options.top,
            options.skip,
            options.countTotal,
            options.brief,
        );
    }

    /**
     * @param options.query key-pair value to search for. Only one key-pair value is supported.
     * @param options.top (optional) Maximum number of contacts to return
     * @param options.skip (optional) Number of contacts to skip
     * @param options.countTotal (optional) Return the total number of contacts
     * @param options.brief (optional) Only return the top level properties of the Contact
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetEntitiesBySearch
     * @example
     * ```ts
     * const contacts = await insightly.searchContacts({
     *     query: { first_name: 'John' },
     *     top: 10,
     *     brief: true
     * });
     * ```
     */
    public async searchContacts(options: { query: { [index: string]: string }; top?: number; skip?: number; countTotal?: boolean; brief?: boolean }) {
        return await Contacts.searchContacts(this.apiKey, this.apiUrl, options.query, options.top, options.skip, options.countTotal);
    }

    /**
     * @param options.tagName The name of the tag to filter on
     * @param options.top (optional) Maximum number of contacts to return
     * @param options.skip (optional) Number of contacts to skip
     * @param options.countTotal (optional) Return the total number of contacts
     * @param options.brief (optional) Only return the top level properties of the Contact
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetEntitiesByTag
     */
    public async searchContactsByTag(options: { tagName: string; top?: number; skip?: number; countTotal?: boolean; brief?: boolean }) {
        return await Contacts.searchContactsByTag(
            this.apiKey,
            this.apiUrl,
            options.tagName,
            options.brief,
            options.top,
            options.skip,
            options.countTotal,
        );
    }
}

export default InsightlyJS;
