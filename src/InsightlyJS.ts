import { ActivitySet } from './types/ActivitySet';
import { FileAttachment, Comment } from './types/Comments';
import runtimeIsCompatible from './utils/runtimeIsCompatible';
import * as ActivitySets from './ActivitySets';
import * as Comments from './Comments';

// TODO: add ISO 8601 date format validation

class InsightlyJS {
    private readonly apiKey: string;
    private readonly apiUrl: string;

    constructor(options: { apiKey: string; apiHost: string }) {
        this.apiKey = options.apiKey;
        this.apiUrl = options.apiHost;

        if (!runtimeIsCompatible()) {
            throw new Error('InsightlyJS is not compatible with this runtime. Please ugrade your browser or Node version (18+).');
        }
    }

    /**************************************************************************
     **************************************************************************
     * Activity Sets
     **************************************************************************
     *************************************************************************/

    /**
     * @abstract Activity Set API
     * @public
     */
    public activitySets = {
        getActivitySetList: this.getActivitySetList,
        getActivitySet: this.getActivitySet,
    };

    /**
     * @param brief Only return the top level properties of the ActivitySet
     * @param skip Number of ActivitySets to skip
     * @param top Maximum number of ActivitySets to return
     * @param countTotal Return the total number of ActivitySets
     * @see https://api.insightly.com/v3.1/Help#!/ActivitySets/GetActivitySets
     */
    private async getActivitySetList(brief?: boolean, skip?: number, top?: number, countTotal?: boolean): Promise<ActivitySet[]> {
        return await ActivitySets.getActivitySetList(this.apiKey, this.apiUrl, brief, skip, top, countTotal);
    }

    /**
     * @param id The ID of the ActivitySet
     * @see https://api.insightly.com/v3.1/Help#!/ActivitySets/GetActivitySet
     */
    private async getActivitySet(id: number): Promise<ActivitySet> {
        return await ActivitySets.getActivitySet(this.apiKey, this.apiUrl, id);
    }

    /**************************************************************************
     **************************************************************************
     * Comments
     **************************************************************************
     *************************************************************************/

    public comments = {
        getFileAttachments: this.getFileAttachments,
        addFileAttachment: this.addFileAttachment,
        updateComment: this.updateComment,
        deleteComment: this.deleteComment,
    };

    /**
     * @param id The ID of the Comment
     * @param updatedAfterUtc Earliest date when the file attachment was last updated
     * @param skip Number of file attachments to skip
     * @param top Maximum number of file attachments to return
     * @param countTotal Return the total number of records
     * @see https://api.insightly.com/v3.1/Help#!/Comments/GetFileAttachments
     */
    private async getFileAttachments(
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
    private async addFileAttachment(id: number, fileAttachment: FileAttachment): Promise<FileAttachment> {
        return await Comments.addFileAttachment(this.apiKey, this.apiUrl, id, fileAttachment);
    }

    /**
     * @deprecated Not actually deprecated, but testing has not been completed. Use at your own risk.
     * @param id The ID of the Comment
     * @param comment The comment to update
     */
    private async updateComment(id: number, comment: Comment): Promise<Comment> {
        return await Comments.updateComment(this.apiKey, this.apiUrl, id, comment);
    }

    /**
     * @deprecated Not actually deprecated, but testing has not been completed. Use at your own risk.
     * @param id The ID of the Comment
     * @returns {boolean} True if the comment was successfully deleted, false otherwise
     */
    private async deleteComment(id: number): Promise<boolean> {
        return await Comments.deleteComment(this.apiKey, this.apiUrl, id);
    }
}

export default InsightlyJS;
