import InsightlyHTTPRequest from './utils/http';
import { FileAttachment, Comment } from './types';
import buildUrlParams from './utils/buildUrlParams';

/**
 * These need to be tested. As of now I (j-labbe) only have time to test GET requests.
 *
 * I am using this package in a project that only needs read access, so either myself or
 * someone else can come back here and test / fix non-GET requests.
 */

async function getFileAttachments(
    apiKey: string,
    apiUrl: string,
    id: number,
    updatedAfterUtc?: string,
    skip?: number,
    top?: number,
    countTotal?: boolean,
): Promise<FileAttachment[]> {
    countTotal = !!countTotal;
    const request = new InsightlyHTTPRequest(apiKey, apiUrl, countTotal);

    const urlParams = buildUrlParams({ updated_after_utc: updatedAfterUtc }, { skip }, { top }, { count_total: countTotal });

    // prettier-ignore
    return await request.get(`/Comments/${id}/FileAttachments?${urlParams}`);
}

async function addFileAttachment(apiKey: string, apiUrl: string, id: number, fileAttachment: FileAttachment): Promise<FileAttachment> {
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);

    return await request.post(`/Comments/${id}/FileAttachments`, fileAttachment);
}

async function updateComment(apiKey: string, apiUrl: string, id: number, comment: Comment): Promise<Comment> {
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);

    return await request.put(`/Comments/${id}`, comment);
}

async function deleteComment(apiKey: string, apiUrl: string, id: number): Promise<boolean> {
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);

    return await request.delete(`/Comments/${id}`);
}

export { getFileAttachments, addFileAttachment, updateComment, deleteComment };
