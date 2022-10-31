import './fetch-polyfill';
import {
    ActivitySet,
    FileAttachment,
    Comment,
    Contact,
    Link,
    Task,
    ValidContact,
    ValidContactWithTags,
    Tag,
    Note,
    InsightlyEvent,
    Email,
    InsightlyDate,
} from './types';
import * as ActivitySets from './ActivitySets';
import * as Comments from './Comments';
import * as Contacts from './Contacts';
import * as fs from 'fs';
import * as path from 'path';
import { getLatestVersion } from './utils/http';

// TODO: add ISO 8601 date format validation

class InsightlyJS {
    private readonly version = JSON?.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'))?.version;
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

        if (!options.apiKey || !options.apiUrl) {
            throw new Error('InsightlyJS: apiKey and apiUrl are required.');
        }

        if (!process.env.JEST_WORKER_ID) {
            // check the installed version against the latest version
            getLatestVersion().then((latestVersion) => {
                if (this.version !== latestVersion) {
                    //prettier-ignore
                    console.warn(`InsightlyJS: You are using version ${this.version}, but version ${latestVersion} is available. Please upgrade by running 'npm install insightlyjs@latest'.`,);
                }
            });
        }

        // bindings for advanced usages

        this.activitySetGet = this.activitySetGet.bind(this);
        this.activitySetGetList = this.activitySetGetList.bind(this);

        this.commentsGetFileAttachments = this.commentsGetFileAttachments.bind(this);
        this.commentsAddFileAttachment = this.commentsAddFileAttachment.bind(this);
        this.commentUpdate = this.commentUpdate.bind(this);
        this.commentDelete = this.commentDelete.bind(this);

        this.contactsAdd = this.contactsAdd.bind(this);
        this.contactsAddLink = this.contactsAddLink.bind(this);
        this.contactsAddTag = this.contactsAddTag.bind(this);
        this.contactsAddNote = this.contactsAddNote.bind(this);
        this.contactsDelete = this.contactsDelete.bind(this);
        this.contactsFollow = this.contactsFollow.bind(this);
        this.contactsGet = this.contactsGet.bind(this);
        this.contactsGetAll = this.contactsGetAll.bind(this);
        this.contactsGetDates = this.contactsGetDates.bind(this);
        this.contactsGetEmails = this.contactsGetEmails.bind(this);
        this.contactsGetEvents = this.contactsGetEvents.bind(this);
        this.contactsGetFileAttachments = this.contactsGetFileAttachments.bind(this);
        this.contactsGetFollowState = this.contactsGetFollowState.bind(this);
        this.contactsGetLinks = this.contactsGetLinks.bind(this);
        this.contactsGetNotes = this.contactsGetNotes.bind(this);
        this.contactsGetTags = this.contactsGetTags.bind(this);
        this.contactsGetTasks = this.contactsGetTasks.bind(this);
        this.contactsSearch = this.contactsSearch.bind(this);
        this.contactsSearchByTag = this.contactsSearchByTag.bind(this);
        this.contactsUpdate = this.contactsUpdate.bind(this);
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
    public async activitySetGetList(options?: { brief?: boolean; skip?: number; top?: number; countTotal?: boolean }): Promise<ActivitySet[]> {
        return await ActivitySets.getActivitySetList(this.apiKey, this.apiUrl, options?.brief, options?.skip, options?.top, options?.countTotal);
    }

    /**
     * @param id The ID of the ActivitySet
     * @see https://api.insightly.com/v3.1/Help#!/ActivitySets/GetActivitySet
     */
    public async activitySetGet(id: number): Promise<ActivitySet> {
        return await ActivitySets.getActivitySet(this.apiKey, this.apiUrl, id);
    }

    /**
     * ************************************************************************
     * *************************************************************************
     * Comments
     * *************************************************************************
     * ************************************************************************/

    /**
     * @param options.id The ID of the Comment
     * @param options.updatedAfterUtc Earliest date when the file attachment was last updated
     * @param options.skip Number of file attachments to skip
     * @param options.top Maximum number of file attachments to return
     * @param options.countTotal Return the total number of records
     * @see {https} ://api.insightly.com/v3.1/Help#!/Comments/GetFileAttachments
     */
    public async commentsGetFileAttachments(options: {
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
    public async commentsAddFileAttachment(id: number, fileAttachment: FileAttachment): Promise<FileAttachment> {
        return await Comments.addFileAttachment(this.apiKey, this.apiUrl, id, fileAttachment);
    }

    /**
     * @deprecated Not actually deprecated, but testing has not been completed. Use at your own risk.
     * @param id The ID of the Comment
     * @param comment The comment to update
     */
    public async commentUpdate(id: number, comment: Comment): Promise<Comment> {
        return await Comments.updateComment(this.apiKey, this.apiUrl, id, comment);
    }

    /**
     * @deprecated Not actually deprecated, but testing has not been completed. Use at your own risk.
     * @param id The ID of the Comment
     * @returns {boolean} True if the comment was successfully deleted, false otherwise
     */
    public async commentDelete(id: number): Promise<boolean> {
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
    public async contactsGetAll(options?: { brief?: boolean; skip?: number; top?: number; countTotal?: boolean }): Promise<ValidContact[]> {
        return await Contacts.getContacts(this.apiKey, this.apiUrl, options?.brief, options?.skip, options?.top, options?.countTotal);
    }

    /**
     * @param contactId The ID of the Contact
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetEntity
     */
    public async contactsGet(contactId: number): Promise<ValidContact> {
        return await Contacts.getContact(this.apiKey, this.apiUrl, contactId);
    }

    /**
     *
     * @param contactId The ID of the Contact
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetDates
     */
    public async contactsGetDates(contactId: number): Promise<InsightlyDate[]> {
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
    public async contactsGetEmails(options: {
        contactId: number;
        updatedAfterUtc?: string;
        top?: number;
        skip?: number;
        countTotal?: boolean;
        brief?: boolean;
    }): Promise<Email[]> {
        return await Contacts.getContactEmails(
            this.apiKey,
            this.apiUrl,
            options.contactId,
            options.updatedAfterUtc,
            options.top,
            options.skip,
            options.brief,
            options.countTotal,
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
    public async contactsGetEvents(options: {
        contactId: number;
        updatedAfterUtc?: string;
        top?: number;
        skip?: number;
        countTotal?: boolean;
        brief?: boolean;
    }): Promise<InsightlyEvent[]> {
        return await Contacts.getContactEvents(
            this.apiKey,
            this.apiUrl,
            options.contactId,
            options.updatedAfterUtc,
            options.top,
            options.skip,
            options.brief,
            options.countTotal,
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
    public async contactsGetFileAttachments(options: {
        contactId: number;
        updatedAfterUtc?: string;
        top?: number;
        skip?: number;
        countTotal?: boolean;
    }): Promise<FileAttachment[]> {
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
    public async contactsGetFollowState(contactId: number): Promise<{ FOLLOWING: boolean }> {
        return await Contacts.getContactFollowState(this.apiKey, this.apiUrl, contactId);
    }

    /**
     * @param contactId The ID of the Contact
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetLinks
     */
    public async contactsGetLinks(contactId: number): Promise<Link[]> {
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
    public async contactsGetNotes(options: {
        contactId: number;
        updatedAfterUtc?: string;
        top?: number;
        skip?: number;
        countTotal?: boolean;
        brief?: boolean;
    }): Promise<Note[]> {
        return await Contacts.getContactNotes(
            this.apiKey,
            this.apiUrl,
            options.contactId,
            options.updatedAfterUtc,
            options.top,
            options.skip,
            options?.brief,
            options?.countTotal,
        );
    }

    /**
     * @param contactId The ID of the Contact
     * @see https://api.insightly.com/v3.1/Help#!/Contacts/GetTags
     */
    public async contactsGetTags(contactId: number): Promise<Tag[]> {
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
    public async contactsGetTasks(options: {
        contactId: number;
        updatedAfterUtc?: string;
        top?: number;
        skip?: number;
        countTotal?: boolean;
        brief?: boolean;
    }): Promise<Task[]> {
        return await Contacts.getContactTasks(
            this.apiKey,
            this.apiUrl,
            options.contactId,
            options.updatedAfterUtc,
            options.top,
            options.skip,
            options.brief,
            options.countTotal,
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
    public async contactsSearch(options: {
        query: { [index: string]: string };
        top?: number;
        skip?: number;
        countTotal?: boolean;
        brief?: boolean;
    }): Promise<ValidContact[]> {
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
    public async contactsSearchByTag(options: {
        tagName: string;
        top?: number;
        skip?: number;
        countTotal?: boolean;
        brief?: boolean;
    }): Promise<ValidContactWithTags[]> {
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

    /**
     * @param contact The Contact to create
     * @returns The created Contact
     */
    public async contactsAdd(contact: Contact): Promise<ValidContact> {
        return await Contacts.addContact(this.apiKey, this.apiUrl, contact);
    }

    /**
     * @param contactId The ID of the Contact to update
     * @param contact New Contact's complete data
     * @returns The newly updated Contact's data
     */
    public async contactsUpdate(contactId: number, contact: Contact): Promise<ValidContact> {
        return await Contacts.updateContact(this.apiKey, this.apiUrl, contactId, contact);
    }

    /**
     * @param contactId The ID of the Contact to delete
     * @returns Whether or not the Contact was deleted
     */
    public async contactsDelete(contactId: number): Promise<boolean> {
        return await Contacts.deleteContact(this.apiKey, this.apiUrl, contactId);
    }

    /**
     * @param contactId The ID of the Contact that the API user will follow
     * @returns
     */
    public async contactsFollow(contactId: number): Promise<boolean> {
        return await Contacts.apiUserFollowContact(this.apiKey, this.apiUrl, contactId);
    }

    /**
     * @param contactId The ID of the Contact to add a link to
     * @param link The new Link to add
     * @returns The newly created Link
     */
    public async contactsAddLink(contactId: number, link: Link): Promise<Link> {
        return await Contacts.addLink(this.apiKey, this.apiUrl, contactId, link);
    }

    /**
     * @param contactId The ID of the Contact to add a note to
     * @param note The new Note to add
     * @returns The newly created Note
     */
    public async contactsAddNote(contactId: number, note: Note): Promise<Note> {
        return await Contacts.addNote(this.apiKey, this.apiUrl, contactId, note);
    }

    /**
     *
     * @param contactId The ID of the Contact to add a tag to
     * @param tag The new Tag to add
     * @returns
     */
    public async contactsAddTag(contactId: number, tag: string): Promise<Tag> {
        return await Contacts.addTag(this.apiKey, this.apiUrl, contactId, tag);
    }

    /**
     * @deprecated - This has not been tested yet
     * @param contactId The ID of the Contact to add a task to
     * @param fileName Name of the file to attach to the contact
     * @param image File
     */
    public async contactsUpdateImage(contactId: number, fileName: string, image: File): Promise<boolean> {
        return await Contacts.updateImage(this.apiKey, this.apiUrl, contactId, fileName, image);
    }

    // Idea:
    // public async contactsUpdateImageFromUrl(contactId: number, imageUrl: string)

    //     public async contactsUpdateLink(contactId: number, linkId: number, link: Link): Promise<Link> {
    //         return await Contacts.updateLink(this.apiKey, this.apiUrl, contactId, linkId, link);
    //     }

    /**************************************************************************
     **************************************************************************
     * Countries
     **************************************************************************
     *************************************************************************/

    //  public async countriesGetList(): Promise<Country[]> {
        
    // }
}

export default InsightlyJS;
