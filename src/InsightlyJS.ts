import { ActivitySet, FileAttachment, Comment } from './types';
import runtimeIsCompatible from './utils/runtimeIsCompatible';
import * as ActivitySets from './ActivitySets';
import * as Comments from './Comments';

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
     * @param brief Only return the top level properties of the ActivitySet
     * @param skip Number of ActivitySets to skip
     * @param top Maximum number of ActivitySets to return
     * @param countTotal Return the total number of ActivitySets
     * @see https://api.insightly.com/v3.1/Help#!/ActivitySets/GetActivitySets
     */
    public async getActivitySetList(brief?: boolean, skip?: number, top?: number, countTotal?: boolean): Promise<ActivitySet[]> {
        return await ActivitySets.getActivitySetList(this.apiKey, this.apiUrl, brief, skip, top, countTotal);
    }

    /**
     * @param id The ID of the ActivitySet
     * @see https://api.insightly.com/v3.1/Help#!/ActivitySets/GetActivitySet
     */
    public async getActivitySet(id: number): Promise<ActivitySet> {
        return await ActivitySets.getActivitySet(this.apiKey, this.apiUrl, id);
    }

    /**************************************************************************
     **************************************************************************
     * Comments
     **************************************************************************
     *************************************************************************/

    /**
     * @param id The ID of the Comment
     * @param updatedAfterUtc Earliest date when the file attachment was last updated
     * @param skip Number of file attachments to skip
     * @param top Maximum number of file attachments to return
     * @param countTotal Return the total number of records
     * @see https://api.insightly.com/v3.1/Help#!/Comments/GetFileAttachments
     */
    public async getCommentFileAttachments(
        id: number,
        updatedAfterUtc?: string,
        skip?: number,
        top?: number,
        countTotal?: boolean,
    ): Promise<FileAttachment[]> {
        return await Comments.getFileAttachments(this.apiKey, this.apiUrl, id, updatedAfterUtc, skip, top, countTotal);
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
}

export default InsightlyJS;
