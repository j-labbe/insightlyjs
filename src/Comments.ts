import InsightlyHTTPRequest from "./utils/http";
import { FileAttachment, Comment } from "./types/Comments";

async function getFileAttachment(apiKey: string, apiUrl: string, id: number, updatedAfterUtc: string): Promise<FileAttachment[]> {
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);

    return await request.get(`/FileAttachments/${id}`);
}