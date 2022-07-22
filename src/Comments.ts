import InsightlyHTTPRequest from "./utils/http";
import { FileAttachment, Comment } from "./types/Comments";

async function getFileAttachment(apiKey: string, id: number, updatedAfterUtc: string): Promise<FileAttachment[]> {
    const request = new InsightlyHTTPRequest(apiKey);

    return await request.get(`/FileAttachments/${id}`);
}